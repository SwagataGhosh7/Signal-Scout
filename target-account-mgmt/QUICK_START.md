# Quick Start Guide - Target Account Management

## 🚀 Get Running in 2 Minutes

### One-Command Setup
```bash
docker-compose up --build
```

### Access Points
- **UI:** http://localhost:8081
- **API:** http://localhost:3001
- **Database:** localhost:5432 (postgres)

---

## ✨ What You Get

### Dark Theme Dashboard
- Background: `#0B0F17`
- Accent: `#22C55E` (neon green)
- Full responsive design

### Features
- ✅ Add target accounts via form
- ✅ View all targets in a grid
- ✅ See metrics (AI Intent, Risk)
- ✅ Harvest signals per target
- ✅ Delete targets
- ✅ Persistent data in PostgreSQL

### Form Fields (Add Target Account)
1. **Company Name** *(required)* - e.g., "Acme Corp"
2. **Domain** *(required)* - e.g., "acme.com"
3. **Industry** *(required)* - e.g., "Technology"
4. **Priority** - High / Medium / Low
5. **Owner** - Self / Team
6. **Status** - Active Scanning / Paused
7. **ICP Context** *(required)* - Notes for AI agents

### Target Card Shows
- Company name & domain
- Industry badge
- Priority & status badges
- Owner assignment
- **AI Intent Level** (0-100%)
- **Calculated Risk** (0-100%)
- Last harvested timestamp
- Actions queue count
- **Harvest Signals** button
- Delete button

---

## 🔧 Common Commands

### Start
```bash
docker-compose up
```

### Stop
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f postgres
```

### Database Access
```bash
docker-compose exec postgres psql -U targetsadmin -d target_accounts
```

### Query All Targets
```sql
SELECT company_name, domain, priority, status FROM targets;
```

---

## 🎯 Test Flow

1. **Open:** http://localhost:8081
2. **Click:** "Add Target Account"
3. **Fill Form:**
   - Company: "TechCorp Inc"
   - Domain: "techcorp.io"
   - Industry: "SaaS"
   - ICP: "Enterprise software company"
   - Priority: "High"
   - Owner: "Self"
   - Status: "Active Scanning"
4. **Click:** "Add to Pipeline"
5. **See:** Card appears in grid with random metrics
6. **Click:** "Harvest Signals" → Updates timestamp
7. **Click:** Trash icon → Deletes target

---

## 📦 Services in Docker

| Service | Port | URL |
|---------|------|-----|
| Frontend | 8081→5173 | http://localhost:8081 |
| Backend | 3001 | http://localhost:3001 |
| Database | 5432 | localhost:5432 |

---

## 💾 Data Persistence

Data is automatically saved in PostgreSQL and persists across:
- Container restarts
- Service stops/starts
- System reboots

Data is lost only if you run:
```bash
docker-compose down -v  # ⚠️ Removes volumes
```

---

## 🛠️ Troubleshooting

**Can't connect?**
```bash
# Check all services running
docker-compose ps

# View service logs
docker-compose logs
```

**Port in use?**
```bash
# Use different port in docker-compose.yml
# Change "8081:5173" to "8082:5173"
```

**Database not connecting?**
```bash
# Check database logs
docker-compose logs postgres

# Reset database
docker-compose down -v
docker-compose up --build
```

---

## 📚 Learn More

- **Architecture:** See `ARCHITECTURE.md`
- **Full Docs:** See `README.md`
- **API Docs:** See `README.md` → API Documentation

---

## 🎨 Customization

### Change Colors
Edit `frontend/tailwind.config.ts`:
```typescript
colors: {
  dark: '#0B0F17',      // Background
  neon: '#22C55E',      // Accent
  accent: '#10B981',    // Secondary
}
```

### Change Ports
Edit `docker-compose.yml`:
```yaml
frontend:
  ports:
    - '8082:5173'  # New port
```

### Database Credentials
Edit `.env`:
```
DB_USER=newuser
DB_PASSWORD=newpass
DB_NAME=newdb
```

---

## ✅ You're Ready!

Your Target Account Management system is now running with full Docker containerization and permanent data persistence. Enjoy! 🚀
