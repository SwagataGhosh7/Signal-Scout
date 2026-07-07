# Target Account Management System

A comprehensive full-stack application for managing target accounts with signal harvesting capabilities, built with React, Express, PostgreSQL, and Docker.

## 🚀 Quick Start

### Prerequisites
- Docker & Docker Compose installed
- Git

### Setup in 3 Steps

1. **Clone and Navigate**
   ```bash
   cd target-account-mgmt
   ```

2. **Create Environment File**
   ```bash
   cp .env.example .env
   ```

3. **Start the System**
   ```bash
   docker-compose up --build
   ```

The system will be available at:
- **Frontend:** http://localhost:8081
- **Backend API:** http://localhost:3001
- **Database:** localhost:5432

## 📋 System Overview

### Frontend (React + Vite)
- **URL:** http://localhost:8081
- **Theme:** Dark mode with neon green accents (#0B0F17 bg, #22C55E accent)
- **Components:**
  - `TargetCompanies` - Main dashboard
  - `TargetForm` - Add/edit targets
  - `TargetCard` - Display target information

### Backend (Express + TypeScript)
- **URL:** http://localhost:3001
- **API:** RESTful endpoints for target management
- **Database:** PostgreSQL with persistent volume

### Database (PostgreSQL)
- **Port:** 5432
- **Default Credentials:**
  - User: `targetsadmin`
  - Password: `securepassword123`
  - Database: `target_accounts`
- **Data Persistence:** Docker volume ensures data survives container restarts

## 📚 API Documentation

### Base URL
```
http://localhost:3001/api/targets
```

### Endpoints

#### Get All Targets
```http
GET /api/targets
```

**Response:**
```json
[
  {
    "id": "uuid",
    "company_name": "Acme Corp",
    "domain": "acme.com",
    "industry": "Technology",
    "priority": "High",
    "owner": "Self",
    "status": "Active Scanning",
    "icp_context": "Target ICP description...",
    "ai_intent_level": 75,
    "calculated_risk": 42,
    "last_harvested": "2026-07-07T15:30:00Z",
    "actions_queue": 3,
    "created_at": "2026-07-07T10:00:00Z",
    "updated_at": "2026-07-07T15:30:00Z"
  }
]
```

#### Get Single Target
```http
GET /api/targets/:id
```

#### Create Target
```http
POST /api/targets
Content-Type: application/json

{
  "company_name": "Acme Corporation",
  "domain": "acme.com",
  "industry": "Technology",
  "priority": "High",
  "owner": "Self",
  "status": "Active Scanning",
  "icp_context": "Enterprise software company focusing on cloud solutions..."
}
```

**Success Response (201):**
```json
{
  "id": "uuid",
  "company_name": "Acme Corporation",
  "domain": "acme.com",
  ...
}
```

#### Update Target
```http
PUT /api/targets/:id
Content-Type: application/json

{
  "priority": "Medium",
  "status": "Paused",
  "ai_intent_level": 85
}
```

#### Delete Target
```http
DELETE /api/targets/:id
```

**Response:**
```json
{
  "message": "Target deleted successfully",
  "id": "uuid"
}
```

#### Harvest Signals
```http
POST /api/targets/:id/harvest
```

**Response:**
```json
{
  "message": "Harvest signals initiated",
  "target": {
    "id": "uuid",
    "last_harvested": "2026-07-07T16:45:00Z",
    "actions_queue": 4,
    ...
  }
}
```

## 🎨 UI Features

### Dashboard View
- **Header** - Title and "Add Target Account" button
- **Statistics Cards** - Total targets, high priority count, active scanning count, average AI intent level
- **Target Grid** - Responsive card layout (1-3 columns)

### Add Target Form
- **Required Fields:**
  - Company Name
  - Domain
  - Industry
  - ICP Context
- **Dropdowns:**
  - Priority: High, Medium, Low
  - Owner: Self, Team
  - Status: Active Scanning, Paused
- **Validation:** Client and server-side validation
- **Submit Button:** "Add to Pipeline"

### Target Card
- **Header** - Company logo, name, domain
- **Badges** - Industry, Priority, Scanning Status
- **Owner Info** - Owner assignment
- **ICP Context** - Preview of target description
- **Metrics:**
  - AI Intent Level (0-100%)
  - Calculated Risk (0-100%)
  - Progress bars for visualization
- **Timestamps:**
  - Last Harvested
  - Actions Queue count
- **Action Buttons:**
  - "Harvest Signals" - Primary action
  - Delete/Trash icon - Remove target

## 🗄️ Database Schema

### Targets Table

```sql
CREATE TABLE targets (
  id UUID PRIMARY KEY,
  company_name VARCHAR(255) NOT NULL,
  domain VARCHAR(255) NOT NULL UNIQUE,
  industry VARCHAR(100) NOT NULL,
  priority VARCHAR(20) CHECK (priority IN ('High', 'Medium', 'Low')),
  owner VARCHAR(20) CHECK (owner IN ('Self', 'Team')),
  status VARCHAR(50) CHECK (status IN ('Active Scanning', 'Paused')),
  icp_context TEXT NOT NULL,
  ai_intent_level SMALLINT (0-100),
  calculated_risk SMALLINT (0-100),
  last_harvested TIMESTAMP NULL,
  actions_queue INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Indexes:**
- `priority` - For filtering by priority
- `status` - For filtering by scanning status
- `created_at DESC` - For sorting by recency

## 🔧 Commands

### Development

**Start Everything:**
```bash
docker-compose up
```

**Start in Background:**
```bash
docker-compose up -d
```

**View Logs:**
```bash
docker-compose logs -f
```

**View Specific Service Logs:**
```bash
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Maintenance

**Stop Services:**
```bash
docker-compose down
```

**Stop and Remove Volumes (⚠️ Deletes data):**
```bash
docker-compose down -v
```

**Rebuild Containers:**
```bash
docker-compose up --build
```

**Access Database Shell:**
```bash
docker-compose exec postgres psql -U targetsadmin -d target_accounts
```

**View Database:**
```sql
SELECT * FROM targets;
```

## 📊 Data Persistence

- **Storage Location:** Docker volume `target-db-volume`
- **Container Path:** `/var/lib/postgresql/data`
- **Persistence:** Automatic, survives container restarts
- **Backup:** Copy volume data to external storage
- **Restore:** Mount volume from backup

## 🛡️ Error Handling

### Frontend
- Form validation with error messages
- API error handling and user feedback
- Loading states during async operations
- Graceful error recovery

### Backend
- Request validation middleware
- Detailed error messages
- CORS support for cross-origin requests
- Connection pooling with health checks

### Database
- Constraints and data validation
- Unique domain constraint
- Type safety with PostgreSQL
- Automatic timestamp management

## 🚀 Deployment

### Production Setup

1. **Update Environment Variables:**
   ```bash
   # .env
   NODE_ENV=production
   DB_PASSWORD=<strong-password>
   VITE_API_URL=https://your-domain.com/api
   ```

2. **Build for Production:**
   ```bash
   docker-compose -f docker-compose.yml build
   ```

3. **Deploy to Server:**
   ```bash
   # Push to server and run
   docker-compose up -d
   ```

4. **Setup Reverse Proxy:**
   - Frontend: Nginx or similar
   - Backend: Direct or through proxy

5. **SSL/TLS:**
   - Use Let's Encrypt certificates
   - Configure in reverse proxy

## 📁 Project Structure

```
target-account-mgmt/
├── docker-compose.yml          # Orchestration config
├── .env.example                # Environment template
├── ARCHITECTURE.md             # Architecture overview
├── README.md                   # This file
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── server.ts
│   │   ├── routes/targets.ts
│   │   ├── models/Target.ts
│   │   ├── middleware/validation.ts
│   │   └── migrations/run.ts
│   └── migrations/
│       └── 001_create_targets_table.sql
│
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── tsconfig.json
    ├── vite.config.ts
    ├── tailwind.config.ts
    ├── index.html
    └── src/
        ├── main.tsx
        ├── App.tsx
        ├── index.css
        ├── api/client.ts
        └── components/
            ├── TargetCompanies.tsx
            ├── TargetForm.tsx
            └── TargetCard.tsx
```

## 🐛 Troubleshooting

### Ports Already in Use
```bash
# Find and kill process using port 8081
lsof -i :8081
kill -9 <PID>

# Or use different ports in docker-compose.yml
```

### Database Connection Error
```bash
# Check database container
docker-compose logs postgres

# Verify environment variables in .env
cat .env

# Ensure database is healthy
docker-compose exec postgres pg_isready
```

### Frontend Can't Reach Backend
```bash
# Check backend service
docker-compose logs backend

# Verify VITE_API_URL in .env
# Should be http://localhost:3001 for development

# Check Docker network
docker-compose ps
```

### Database Migration Failed
```bash
# Check migration logs
docker-compose logs backend

# Manual migration (if needed)
docker-compose exec backend npm run migrate

# Reset database
docker-compose down -v
docker-compose up --build
```

## 📝 Development Workflow

1. **Make code changes** - Files are watched in development mode
2. **Hot reload** - Frontend and backend automatically reload
3. **Test changes** - Access http://localhost:8081
4. **View logs** - `docker-compose logs -f`
5. **Commit changes** - Git as normal

## 🔐 Security Notes

- Change default database password in .env for production
- Use environment variables for all secrets
- Never commit .env file to version control
- Implement authentication/authorization for API
- Use HTTPS in production
- Validate all user inputs
- Use SQL parameterized queries (already implemented)

## 📞 Support

For issues or questions:
1. Check logs: `docker-compose logs`
2. Review ARCHITECTURE.md for technical details
3. Check API responses for error messages
4. Ensure all containers are running: `docker-compose ps`

## 📄 License

MIT
