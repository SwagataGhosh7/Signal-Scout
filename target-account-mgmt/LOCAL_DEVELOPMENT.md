# 🚀 Local Development Setup - Complete Guide

## ✅ Prerequisites Checklist

Before starting, you should have:

| Requirement | Status | Check |
|------------|--------|-------|
| Node.js v14+ | ✅ Installed (v24.16.0) | `node --version` |
| npm v6+ | ✅ Installed (11.13.0) | `npm --version` |
| PostgreSQL 15+ | ❌ **NEEDS INSTALLATION** | See step 1 |
| Git | ✅ Assumed | `git --version` |

---

## 📥 STEP 1: Install PostgreSQL (Windows)

### Quick Download Link
👉 https://www.postgresql.org/download/windows/

### Installation Checklist
- [ ] Download EDB interactive installer
- [ ] Run installer
- [ ] Set superuser password (remember it!)
- [ ] Keep port as 5432
- [ ] Complete installation
- [ ] Verify: `psql --version` in PowerShell

**For detailed instructions:** See [POSTGRES_SETUP.md](POSTGRES_SETUP.md)

---

## 🗄️ STEP 2: Create Database & User

After PostgreSQL is installed and running:

### Option A: Using SQL File (Automatic)

```powershell
cd backend\migrations
psql -U postgres -f setup-postgres.sql
# Enter postgres password when prompted
```

### Option B: Manual Setup

```powershell
psql -U postgres
```

Then paste this SQL:

```sql
CREATE DATABASE target_accounts;
CREATE USER targetsadmin WITH PASSWORD 'securepassword123';
ALTER ROLE targetsadmin SET client_encoding TO 'utf8';
ALTER ROLE targetsadmin SET default_transaction_isolation TO 'read committed';
ALTER ROLE targetsadmin SET default_transaction_deferrable TO on;
ALTER ROLE targetsadmin SET default_transaction_read_only TO off;
GRANT ALL PRIVILEGES ON DATABASE target_accounts TO targetsadmin;
\q
```

### Verify Setup

```powershell
psql -U targetsadmin -d target_accounts -h localhost
# Should connect successfully

# Inside psql:
\dt    # List tables (should be empty)
\q    # Exit
```

---

## 💻 STEP 3: One-Command Setup

From the `target-account-mgmt` directory, run:

### Windows (Batch)
```powershell
.\setup.bat
```

### Windows (PowerShell)
```powershell
.\setup.ps1
```

### Linux/Mac
```bash
bash setup.sh  # (create if needed)
```

**What this does:**
1. ✅ Checks Node.js and PostgreSQL
2. ✅ Installs backend dependencies
3. ✅ Installs frontend dependencies
4. ✅ Runs database migrations
5. ✅ Creates tables

---

## 🚀 STEP 4: Start the System

### Terminal 1 - Backend Server

```powershell
cd backend

# Option A: Use startup script
.\start-backend.bat
# or
.\start-frontend.ps1

# Option B: Manual start
npm run dev
```

**Expected output:**
```
✅ Database connection established
🚀 Target Account Management API running on http://localhost:3001
```

### Terminal 2 - Frontend Server

```powershell
cd frontend

# Option A: Use startup script
.\start-frontend.bat
# or
.\start-frontend.ps1

# Option B: Manual start
npm run dev
```

**Expected output:**
```
  VITE v5.0.8 ready in XXX ms
  ➜  Local:   http://localhost:5173/
```

---

## 🌐 STEP 5: Access the Application

| Service | URL |
|---------|-----|
| **Frontend UI** | http://localhost:5173 |
| **Backend API** | http://localhost:3001 |
| **API Health** | http://localhost:3001/health |
| **Database** | localhost:5432 |

---

## ✨ STEP 6: Test the System

### 1. Open Frontend
```
http://localhost:5173
```

### 2. Add a Target Account
- Click "Add Target Account"
- Fill form:
  - Company Name: "Test Corp"
  - Domain: "test.com"
  - Industry: "Technology"
  - Priority: "High"
  - Owner: "Self"
  - Status: "Active Scanning"
  - ICP Context: "Test company"
- Click "Add to Pipeline"

### 3. Verify in Database
```powershell
psql -U targetsadmin -d target_accounts -h localhost

# Inside psql:
SELECT company_name, domain, priority FROM targets;

# Should see: Test Corp | test.com | High
```

### 4. Test API
```powershell
curl http://localhost:3001/api/targets
# Should return JSON array with your target
```

---

## 📂 Project Structure for Local Development

```
target-account-mgmt/
├── backend/                    # Express API server
│   ├── start-backend.bat      # Quick start script
│   ├── start-backend.ps1      # PowerShell version
│   ├── package.json           # npm install here
│   ├── src/
│   │   └── server.ts          # npm run dev
│   └── migrations/
│       ├── setup-postgres.sql # Database setup
│       └── 001_create_targets_table.sql
│
├── frontend/                   # React UI
│   ├── start-frontend.bat     # Quick start script
│   ├── start-frontend.ps1     # PowerShell version
│   ├── package.json           # npm install here
│   └── src/
│       └── App.tsx            # npm run dev
│
├── setup.bat                   # One-command setup
├── setup.ps1                   # PowerShell setup
├── .env                        # Already configured
└── LOCAL_SETUP.md             # This guide
```

---

## 🔄 Development Workflow

### Daily Startup (3 terminals)

**Terminal 1:**
```powershell
cd target-account-mgmt/backend
npm run dev
```

**Terminal 2:**
```powershell
cd target-account-mgmt/frontend
npm run dev
```

**Terminal 3 (Optional - for database queries):**
```powershell
psql -U targetsadmin -d target_accounts
```

### Making Changes

- **Backend changes:** Auto-reload (tsx watch)
- **Frontend changes:** Auto-reload (Vite HMR)
- **Database changes:** Edit migrations and re-run `npm run migrate`

---

## 📊 Build & Production

### Build Backend
```powershell
cd backend
npm run build
# Creates dist/ folder
npm start  # Run production build
```

### Build Frontend
```powershell
cd frontend
npm run build
# Creates dist/ folder
# Deploy dist/ to static hosting
```

---

## 🆘 Common Issues & Fixes

### Issue: PostgreSQL Connection Refused
```
Error: ECONNREFUSED 127.0.0.1:5432
```
**Fix:**
```powershell
# Start PostgreSQL service
net start postgresql-x64-15
# Verify
psql -U targetsadmin -d target_accounts
```

### Issue: npm install fails
```
npm ERR! code ERESOLVE
```
**Fix:**
```powershell
npm cache clean --force
rm -r node_modules
npm install
```

### Issue: Port 5173 or 3001 already in use
```powershell
# Find what's using port 3001
netstat -ano | findstr :3001
# Kill process
taskkill /PID <PID> /F
```

### Issue: Migrations failed
```powershell
cd backend
npm run build
npm run migrate
```

### Issue: Database tables don't exist
```powershell
cd backend/migrations
psql -U postgres -f setup-postgres.sql
```

---

## 💾 Backup & Restore Data

### Backup Database
```powershell
# Full backup
pg_dump -U targetsadmin -d target_accounts -h localhost > backup.sql

# Compressed backup
pg_dump -U targetsadmin -d target_accounts -h localhost | gzip > backup.sql.gz
```

### Restore Database
```powershell
# Restore from SQL file
psql -U targetsadmin -d target_accounts -h localhost < backup.sql

# Restore from compressed
gunzip -c backup.sql.gz | psql -U targetsadmin -d target_accounts
```

---

## 📝 Key Commands Quick Reference

```powershell
# Navigate
cd target-account-mgmt
cd backend
cd frontend

# Install dependencies
npm install

# Run development servers
npm run dev

# Run migrations
npm run migrate

# Build for production
npm run build

# Database operations
psql -U targetsadmin -d target_accounts
pg_dump -U targetsadmin -d target_accounts > backup.sql

# Check ports
netstat -ano | findstr :3001
netstat -ano | findstr :5173
netstat -ano | findstr :5432

# Start services
net start postgresql-x64-15
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend starts without errors: `npm run dev` (backend/)
- [ ] Frontend starts without errors: `npm run dev` (frontend/)
- [ ] Can access http://localhost:5173
- [ ] Can access http://localhost:3001/health
- [ ] Can add a target account
- [ ] Data persists after refresh
- [ ] Database table has data: `SELECT * FROM targets;`

---

## 🎓 Next Steps

1. **Explore the UI:**
   - Add multiple targets
   - Test harvest signals
   - Try deleting targets

2. **Test the API:**
   - See [API_TESTING.md](API_TESTING.md) for curl examples

3. **Modify the code:**
   - Add new fields to targets
   - Customize UI styling
   - Add new API endpoints

4. **Deploy:**
   - See main [README.md](README.md) for deployment options

---

## 📞 Getting Help

- **Setup Issues?** → Check [POSTGRES_SETUP.md](POSTGRES_SETUP.md)
- **API Questions?** → See [API_TESTING.md](API_TESTING.md)
- **System Architecture?** → Read [ARCHITECTURE.md](ARCHITECTURE.md)
- **Full Documentation?** → See [README.md](README.md)

---

## 🎉 You're Ready!

Your Target Account Management system is now running locally with:
- ✅ React Frontend on http://localhost:5173
- ✅ Express Backend on http://localhost:3001
- ✅ PostgreSQL Database on localhost:5432
- ✅ Hot reload for development
- ✅ Full TypeScript support
- ✅ Persistent data storage

**Happy coding!** 🚀
