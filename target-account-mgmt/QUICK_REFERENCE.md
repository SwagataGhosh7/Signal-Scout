# 🚀 QUICK REFERENCE CARD

## START IN 3 STEPS
```bash
cd target-account-mgmt
docker-compose up --build
# Visit: http://localhost:8081
```

---

## 📍 ACCESS POINTS
| Service | URL | Purpose |
|---------|-----|---------|
| **Frontend** | http://localhost:8081 | React UI |
| **Backend** | http://localhost:3001 | REST API |
| **Health** | http://localhost:3001/health | Status check |
| **Database** | localhost:5432 | PostgreSQL |

---

## 🎯 MAIN FEATURES
✅ Add target accounts
✅ View target metrics (AI Intent, Risk)
✅ Harvest signals per target
✅ Delete targets
✅ Persistent PostgreSQL storage

---

## 📝 FORM FIELDS (Add Target)
```
Company Name (required)     → "Acme Corp"
Domain (required)           → "acme.com"
Industry (required)         → "Technology"
ICP Context (required)      → "Enterprise SaaS..."
Priority (dropdown)         → High / Medium / Low
Owner (dropdown)            → Self / Team
Status (dropdown)           → Active Scanning / Paused
```

---

## 📊 TARGET CARD SHOWS
- Company name & logo
- Domain
- Industry badge
- Priority badge
- Owner assignment
- **AI Intent Level** (0-100%)
- **Calculated Risk** (0-100%)
- Last harvested time
- Actions queue count
- **Harvest Signals** button
- **Delete** button

---

## 🔌 API ENDPOINTS
```
GET     /api/targets              → List all
GET     /api/targets/:id          → Single target
POST    /api/targets              → Create
PUT     /api/targets/:id          → Update
DELETE  /api/targets/:id          → Delete
POST    /api/targets/:id/harvest  → Harvest signals
```

---

## 🎨 COLORS
- **Background:** #0B0F17 (dark)
- **Accent:** #22C55E (neon green)
- **Cards:** #111827 (gray)

---

## 🐳 DOCKER COMMANDS
```bash
# Start
docker-compose up --build

# Stop
docker-compose down

# Logs
docker-compose logs -f

# Database shell
docker-compose exec postgres psql -U targetsadmin -d target_accounts

# List targets
SELECT * FROM targets;

# Rebuild
docker-compose up --build

# Fresh start (deletes data!)
docker-compose down -v && docker-compose up --build
```

---

## 📁 KEY FILES
```
backend/src/server.ts           → Express server
backend/src/routes/targets.ts   → API endpoints
frontend/src/components/        → React components
frontend/src/api/client.ts      → API client
backend/migrations/             → Database schema
docker-compose.yml              → Orchestration
```

---

## ✅ VERIFY WORKING
1. Frontend loads? → http://localhost:8081
2. Backend responds? → http://localhost:3001/health
3. Database connected? → Check backend logs

---

## 🆘 QUICK FIXES
| Problem | Fix |
|---------|-----|
| Port in use | Change in docker-compose.yml |
| Can't connect | Check .env file |
| No database | Check postgres logs |
| Form won't submit | Check browser console |

---

## 📚 DOCUMENTATION
- README.md - Full guide (600+ lines)
- QUICK_START.md - 2-minute setup
- ARCHITECTURE.md - Technical details
- DEPLOYMENT.md - Production setup

---

## 🎯 TEST WORKFLOW
1. Click "Add Target Account"
2. Fill form with test data
3. Click "Add to Pipeline"
4. See card appear
5. Click "Harvest Signals"
6. Click trash icon to delete

---

## 💾 DATA PERSISTENCE
Data automatically saved in PostgreSQL
Survives: restarts, stops, reboots
Lost only: `docker-compose down -v`

---

## 🚀 DEPLOYMENT
Development: `docker-compose up --build`
Production: See DEPLOYMENT.md

---

**Last Updated:** July 7, 2026
**Status:** ✅ Ready to use
