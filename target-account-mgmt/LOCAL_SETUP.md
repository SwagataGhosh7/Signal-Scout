# LOCAL DEVELOPMENT SETUP GUIDE

## System Requirements ✅
- Node.js v24.16.0 ✅ (Already Installed)
- npm 11.13.0 ✅ (Already Installed)  
- PostgreSQL 15+ ❌ (Needs Installation)

---

## 🔧 Step 1: Install & Start PostgreSQL

### Windows Installation:
1. Download: https://www.postgresql.org/download/windows/
2. Run installer
3. Set password for 'postgres' user (remember it!)
4. Keep default port 5432
5. Complete installation

### Verify Installation:
```powershell
psql --version
# Should show: psql (PostgreSQL) 15.x or higher
```

### Start PostgreSQL Service:
```powershell
# Windows - Services should auto-start, or:
net start postgresql-x64-15
# (Replace 15 with your PostgreSQL version)
```

---

## 📝 Step 2: Create Database & User

Open PostgreSQL command prompt:
```powershell
psql -U postgres
```

Then execute (in psql):
```sql
-- Create database
CREATE DATABASE target_accounts;

-- Create user
CREATE USER targetsadmin WITH PASSWORD 'securepassword123';

-- Grant privileges
ALTER ROLE targetsadmin SET client_encoding TO 'utf8';
ALTER ROLE targetsadmin SET default_transaction_isolation TO 'read committed';
ALTER ROLE targetsadmin SET default_transaction_deferrable TO on;
ALTER ROLE targetsadmin SET default_transaction_read_only TO off;
GRANT ALL PRIVILEGES ON DATABASE target_accounts TO targetsadmin;

-- Exit psql
\q
```

---

## 📦 Step 3: Install Backend Dependencies

```powershell
cd backend
npm install
```

This will install:
- express
- pg (PostgreSQL driver)
- typescript
- tsx (TypeScript runner)
- uuid
- dotenv

---

## 🎨 Step 4: Install Frontend Dependencies

```powershell
cd ../frontend
npm install
```

This will install:
- react
- vite
- tailwindcss
- typescript
- axios
- postcss
- autoprefixer

---

## 🗄️ Step 5: Run Database Migrations

```powershell
cd backend
npm run migrate
```

This creates the `targets` table with all columns and indexes.

---

## 🚀 Step 6: Start Backend Server

```powershell
cd backend
npm run dev
```

Expected output:
```
✅ Database connection established: [timestamp]
🚀 Target Account Management API running on http://localhost:3001
```

---

## 🎨 Step 7: Start Frontend (New Terminal)

```powershell
cd frontend
npm run dev
```

Expected output:
```
  VITE v5.0.8 ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

---

## ✅ Verification

### Check Backend
```powershell
curl http://localhost:3001/health
# Response: {"status":"ok","timestamp":"..."}
```

### Check Frontend
Open browser: http://localhost:5173

### Check Database
```powershell
psql -U targetsadmin -d target_accounts
# Then: SELECT * FROM targets;
# Should return: (0 rows)
```

---

## 🎯 You're Ready!

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3001
- **Database:** localhost:5432
- **DB User:** targetsadmin
- **DB Password:** securepassword123
- **DB Name:** target_accounts

---

## 📊 Project Structure for Local Setup

```
target-account-mgmt/
├── backend/
│   ├── package.json          # Install with: npm install
│   ├── src/
│   │   ├── server.ts         # Start with: npm run dev
│   │   ├── routes/targets.ts
│   │   ├── models/Target.ts
│   │   └── ...
│   └── migrations/           # Run with: npm run migrate
│
├── frontend/
│   ├── package.json          # Install with: npm install
│   ├── src/
│   │   ├── App.tsx
│   │   ├── components/
│   │   └── ...
│   └── index.html
│
└── .env                       # Already configured
```

---

## 🔄 Development Workflow

### Terminal 1 - Backend:
```powershell
cd backend
npm run dev
```

### Terminal 2 - Frontend:
```powershell
cd frontend
npm run dev
```

### Terminal 3 - Database (if needed):
```powershell
psql -U targetsadmin -d target_accounts
SELECT * FROM targets;
```

---

## 📝 Environment Configuration

Backend (.env already set):
```
NODE_ENV=development
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_USER=targetsadmin
DB_PASSWORD=securepassword123
DB_NAME=target_accounts
DB_POOL_MIN=2
DB_POOL_MAX=10
```

Frontend (.env already set):
```
VITE_API_URL=http://localhost:3001
```

---

## ✨ Features Available

✅ Add target accounts
✅ View all targets
✅ Update targets
✅ Delete targets
✅ Harvest signals
✅ Real-time metrics
✅ Dark theme UI
✅ REST API
✅ PostgreSQL storage

---

## 🆘 Troubleshooting

### PostgreSQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Fix:** 
- Ensure PostgreSQL service is running
- Check credentials in .env match your setup
- Verify port 5432 is correct

### Port 3001/5173 Already in Use
```powershell
# Find process using port 3001
netstat -ano | findstr :3001

# Kill process
taskkill /PID <PID> /F
```

### Database Table Not Found
```powershell
# Run migrations manually
cd backend
npx tsx src/migrations/run.ts
```

### Dependencies Installation Failed
```powershell
# Clear npm cache and retry
npm cache clean --force
npm install
```

---

## 📞 Quick Commands

```powershell
# Backend startup
cd backend && npm install && npm run migrate && npm run dev

# Frontend startup (new terminal)
cd frontend && npm install && npm run dev

# Database query
psql -U targetsadmin -d target_accounts -c "SELECT * FROM targets;"

# Backend test
curl http://localhost:3001/api/targets

# Check running services
netstat -ano | findstr :3001
netstat -ano | findstr :5173
psql --version
```

---

**Ready to start?** Follow the steps above and you'll have the system running locally! 🚀
