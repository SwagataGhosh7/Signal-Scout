# Complete Deployment Guide

## Development Deployment

### Local Development (Recommended for Testing)

```bash
# 1. Navigate to project
cd target-account-mgmt

# 2. Create environment file
cp .env.example .env

# 3. Start all services
docker-compose up --build

# 4. Services will be available at:
# - Frontend: http://localhost:8081
# - Backend: http://localhost:3001
# - Database: localhost:5432
```

## Production Deployment

### Prerequisites
- Docker & Docker Compose on server
- Domain name (for SSL/TLS)
- Reverse proxy (Nginx/Apache)

### Step 1: Prepare Server

```bash
# SSH into server
ssh user@your-server.com

# Clone repository
git clone <your-repo-url>
cd target-account-mgmt
```

### Step 2: Configure Environment

```bash
# Create production .env file
cat > .env << EOF
# Database (use strong password!)
DB_USER=produser
DB_PASSWORD=$(openssl rand -base64 32)
DB_NAME=target_accounts_prod

# API Configuration
NODE_ENV=production
PORT=3001
VITE_API_URL=https://your-domain.com

# Database pool
DB_POOL_MIN=5
DB_POOL_MAX=20
EOF

# Secure the .env file
chmod 600 .env
```

### Step 3: Build Production Containers

```bash
# Build images
docker-compose build

# Verify build
docker images | grep target-
```

### Step 4: Start Services

```bash
# Start in background
docker-compose up -d

# Verify containers running
docker-compose ps

# Check logs
docker-compose logs -f
```

### Step 5: Setup Nginx Reverse Proxy

Create `/etc/nginx/sites-available/target-management`:

```nginx
upstream backend {
    server 127.0.0.1:3001;
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;
    
    # Security headers
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Frontend
    location / {
        proxy_pass http://127.0.0.1:8081;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # CORS
        add_header Access-Control-Allow-Origin "*";
        add_header Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS";
        add_header Access-Control-Allow-Headers "Content-Type, Authorization";
    }

    # Health check endpoint
    location /health {
        proxy_pass http://backend/health;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/target-management \
           /etc/nginx/sites-enabled/target-management

sudo nginx -t
sudo systemctl restart nginx
```

### Step 6: Setup SSL Certificate (Let's Encrypt)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot certonly --nginx -d your-domain.com

# Auto-renewal (already enabled)
sudo systemctl enable certbot.timer
```

### Step 7: Setup Firewall

```bash
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

### Step 8: Database Backup

```bash
# Create backup script
cat > backup-db.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/backups/target-management"
mkdir -p $BACKUP_DIR
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec -T postgres pg_dump -U targetsadmin target_accounts | \
  gzip > $BACKUP_DIR/target_accounts_$DATE.sql.gz
EOF

chmod +x backup-db.sh

# Schedule daily backups
(crontab -l 2>/dev/null; echo "0 2 * * * /path/to/backup-db.sh") | crontab -
```

### Step 9: Monitoring & Logging

```bash
# View service logs
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres

# Setup log rotation
cat > /etc/logrotate.d/docker-target-management << EOF
/var/lib/docker/containers/*/*-json.log {
    rotate 10
    daily
    compress
    delaycompress
    missingok
}
EOF
```

---

## Maintenance

### Viewing Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs -f backend

# Follow logs
docker-compose logs -f --tail=100
```

### Updating Application

```bash
# Pull latest code
git pull origin main

# Rebuild containers
docker-compose build

# Restart services
docker-compose restart
```

### Database Maintenance

```bash
# Connect to database
docker-compose exec postgres psql -U targetsadmin -d target_accounts

# Vacuum database
VACUUM ANALYZE;

# Check table size
SELECT pg_size_pretty(pg_total_relation_size('targets'));

# Export data
docker-compose exec -T postgres pg_dump -U targetsadmin target_accounts > backup.sql

# Restore data
docker-compose exec -T postgres psql -U targetsadmin target_accounts < backup.sql
```

### Scaling

```bash
# Backend scaling
docker-compose up -d --scale backend=3

# Monitor with
docker-compose ps
```

---

## Troubleshooting Production

### Services won't start
```bash
# Check logs
docker-compose logs

# Verify port availability
sudo netstat -tulpn | grep 8081
sudo netstat -tulpn | grep 3001

# Check disk space
df -h
```

### Database connection errors
```bash
# Check database status
docker-compose exec postgres pg_isready

# Check connection string in .env
cat .env | grep DB_

# Test connection
docker-compose exec backend npm run test:db
```

### High memory usage
```bash
# Check container stats
docker stats

# Reduce database pool
# Edit .env:
DB_POOL_MIN=2
DB_POOL_MAX=5

# Restart
docker-compose restart
```

### SSL certificate issues
```bash
# Check certificate expiry
sudo certbot certificates

# Renew manually
sudo certbot renew --force-renewal

# Check Nginx config
sudo nginx -t
```

---

## Rollback

If something breaks in production:

```bash
# Stop current services
docker-compose down

# Restore database backup
docker-compose up -d postgres
docker-compose exec -T postgres psql -U targetsadmin target_accounts < backup.sql

# Start previous version
git checkout <commit-hash>
docker-compose up -d

# Verify
curl https://your-domain.com/health
```

---

## Performance Optimization

### Database
```sql
-- Add indexes for common queries
CREATE INDEX idx_targets_owner ON targets(owner);
CREATE INDEX idx_targets_priority_status ON targets(priority, status);

-- Analyze for query optimization
ANALYZE targets;
```

### Backend
```bash
# Enable compression
# In server.ts, add compression middleware

# Increase node memory
# In docker-compose.yml:
environment:
  NODE_OPTIONS: --max-old-space-size=2048
```

### Frontend
```bash
# Production build
npm run build

# Optimize bundle
npm run analyze  # requires bundle analyzer
```

---

## Security Checklist

- [ ] Change all default credentials in .env
- [ ] Enable HTTPS/SSL
- [ ] Setup firewall rules
- [ ] Enable Docker security scanning
- [ ] Setup regular backups
- [ ] Monitor logs for errors
- [ ] Update packages regularly
- [ ] Use strong database passwords
- [ ] Enable API rate limiting
- [ ] Setup DDoS protection

---

## Support & Monitoring

### Health Checks
```bash
# Backend health
curl https://your-domain.com/health

# API test
curl https://your-domain.com/api/targets

# Database test
docker-compose exec postgres pg_isready
```

### Metrics
```bash
# Container resource usage
docker stats

# System resources
free -h
df -h
```

### Alerting
Setup monitoring for:
- Container crashes
- Disk space
- Memory usage
- Database connection pool
- API response times

---

**You're ready for production!** 🚀
