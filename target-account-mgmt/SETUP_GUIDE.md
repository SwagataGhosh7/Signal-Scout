# 🎯 Target Account Management System - Complete Setup Guide

A comprehensive Target Account Management system with **React frontend**, **Express backend**, and **PostgreSQL database** for managing sales target accounts, tracking signals, and AI-powered insights.

---

## 🚀 Choose Your Setup Path

### ⚡ **QUICKEST (10 minutes) - Windows Local Setup**

If you're on Windows and want to run locally without Docker:

1. **Download & Install PostgreSQL 15+**
   - 👉 [POSTGRES_SETUP.md](POSTGRES_SETUP.md) ← Full step-by-step guide

2. **Run One Setup Command**
   ```powershell
   .\setup.bat
   ```

3. **Start in Two Terminals**
   ```powershell
   # Terminal 1: Backend
   cd backend
   .\start-backend.bat
   
   # Terminal 2: Frontend
   cd frontend
   .\start-frontend.bat
   ```

4. **Open Browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:3001

📖 **Full local setup guide:** [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md)

---

### 🐳 **PRODUCTION (15 minutes) - Docker Setup**

If you have Docker installed and want containerized deployment:

```powershell
docker-compose up --build
```

- Frontend: http://localhost:8081
- Backend: http://localhost:3001
- Database: Persistent volume `target-db-volume`

📖 **Full Docker guide:** [README.md](README.md#docker-deployment)

---

### 💡 **CUSTOM - Node.js & PostgreSQL Only**

See [LOCAL_SETUP.md](LOCAL_SETUP.md) for manual step-by-step instructions

---

## 📋 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    React Frontend (5173)                │
│  ┌──────────────────────────────────────────────────┐  │
│  │  • Target Dashboard with Cards & Charts         │  │
│  │  • Add/Edit/Delete Target Accounts              │  │
│  │  • Signal Harvesting Controls                   │  │
│  │  • Real-time Updates via Axios                  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↕ HTTP
┌─────────────────────────────────────────────────────────┐
│                  Express Backend (3001)                 │
│  ┌──────────────────────────────────────────────────┐  │
│  │  • Target CRUD API (7 endpoints)                │  │
│  │  • Request Validation                           │  │
│  │  • Error Handling & Logging                     │  │
│  │  • Database Connection Pooling                  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            ↕ pg driver
┌─────────────────────────────────────────────────────────┐
│             PostgreSQL Database (5432)                  │
│  ┌──────────────────────────────────────────────────┐  │
│  │  • targets table (14 columns)                   │  │
│  │  • Indexes on priority, status, created_at      │  │
│  │  • Persistent data storage                      │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Features

### ✨ Frontend Features
- **Dashboard View** - Stats cards showing system overview
- **Target Cards** - Individual target display with metrics
- **Add Target Form** - Simple form to create new targets
- **AI Intent Tracking** - Visual 0-100% AI Intent level
- **Risk Assessment** - Risk scores per target
- **Signal Harvesting** - Trigger signal collection per target
- **Dark Theme** - Modern dark UI with neon accents
- **Responsive Design** - Works on desktop and tablet

### 🔧 Backend API Endpoints
```
GET    /health                    - Health check
GET    /api/targets               - List all targets
GET    /api/targets/:id           - Get single target
POST   /api/targets               - Create target
PUT    /api/targets/:id           - Update target
DELETE /api/targets/:id           - Delete target
POST   /api/targets/:id/harvest   - Trigger signal harvest
```

### 💾 Database Features
- **Targets Table** - 14 columns including status, priority, AI intent, risk
- **Indexes** - Optimized queries on priority, status, created_at
- **Constraints** - ENUM validation for status and priority
- **Timestamps** - Automatic created_at and updated_at
- **User Roles** - Dedicated database user with proper permissions

---

## 📦 Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend** | React | 18.x |
| **UI Library** | Tailwind CSS | 3.4.1 |
| **Build Tool** | Vite | 5.0.8 |
| **Backend** | Express.js | 4.18.2 |
| **Database** | PostgreSQL | 15+ |
| **Language** | TypeScript | 5.3.3 |
| **Dev Runtime** | Node.js | v14+ |
| **Containerization** | Docker | (optional) |

---

## 🗂️ Project Structure

```
target-account-mgmt/
│
├── 📁 frontend/                  # React Application
│   ├── src/
│   │   ├── App.tsx              # Main app component
│   │   ├── components/
│   │   │   ├── TargetCompanies.tsx
│   │   │   ├── TargetForm.tsx
│   │   │   └── TargetCard.tsx
│   │   └── api/
│   │       └── client.ts         # Axios HTTP client
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── 📁 backend/                   # Express API
│   ├── src/
│   │   ├── server.ts            # Entry point
│   │   ├── routes/
│   │   │   └── targets.ts       # API endpoints
│   │   ├── models/
│   │   │   └── Target.ts        # TypeScript interfaces
│   │   └── middleware/
│   │       └── validation.ts    # Request validation
│   ├── migrations/
│   │   └── 001_create_targets_table.sql
│   ├── package.json
│   ├── tsconfig.json
│   └── start-backend.bat/.ps1
│
├── 📁 supabase/                 # Optional Supabase config
│   └── migrations/
│
├── 📄 docker-compose.yml        # Docker orchestration
├── 📄 setup.bat / setup.ps1     # Automated setup script
├── 📄 .env                      # Environment variables
│
├── 📚 Documentation/
│   ├── LOCAL_DEVELOPMENT.md     # ← START HERE (Local setup)
│   ├── POSTGRES_SETUP.md        # PostgreSQL installation
│   ├── LOCAL_SETUP.md           # Detailed local guide
│   ├── README.md                # Full documentation
│   ├── ARCHITECTURE.md          # System design
│   ├── API_TESTING.md           # API examples
│   └── ... (8+ more guides)
│
└── 📦 package.json              # Root workspace (optional)
```

---

## ✅ Installation Checklist

### Prerequisites
- [ ] Windows/Mac/Linux
- [ ] Node.js v14+ installed
- [ ] npm v6+ installed
- [ ] PostgreSQL 15+ (or Docker)
- [ ] Internet connection

### Local Setup Steps
- [ ] Download/Install PostgreSQL (see [POSTGRES_SETUP.md](POSTGRES_SETUP.md))
- [ ] Create database and user
- [ ] Clone/Download this repository
- [ ] Run `setup.bat` or `setup.ps1`
- [ ] Start backend server
- [ ] Start frontend server
- [ ] Open http://localhost:5173

### Docker Setup Steps
- [ ] Install Docker Desktop
- [ ] Run: `docker-compose up --build`
- [ ] Wait for all services to start
- [ ] Open http://localhost:8081

---

## 🔌 Environment Configuration

The `.env` file is pre-configured:

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=targetsadmin
DB_PASSWORD=securepassword123
DB_NAME=target_accounts

# Backend
NODE_ENV=development
PORT=3001

# Frontend
VITE_API_URL=http://localhost:3001
```

**Change these values** if you customize your setup.

---

## 🚀 Quick Commands

### Local Development
```powershell
# One-time setup
.\setup.bat

# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd frontend
npm run dev

# Database CLI
psql -U targetsadmin -d target_accounts
```

### Docker
```powershell
# Start all services
docker-compose up --build

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild
docker-compose up --build --no-cache
```

### Database
```powershell
# Backup
pg_dump -U targetsadmin -d target_accounts > backup.sql

# Restore
psql -U targetsadmin -d target_accounts < backup.sql
```

---

## 📖 Documentation Map

| Document | Purpose | Read When |
|----------|---------|-----------|
| **LOCAL_DEVELOPMENT.md** | Local setup guide | 🟢 **START HERE** |
| **POSTGRES_SETUP.md** | PostgreSQL installation | Need to install DB |
| **LOCAL_SETUP.md** | Detailed manual setup | Prefer step-by-step |
| **README.md** | Complete documentation | Want all details |
| **ARCHITECTURE.md** | System design overview | Understanding system |
| **API_TESTING.md** | API endpoint examples | Testing API endpoints |
| **QUICK_START.md** | 2-minute quick start | In a hurry |
| **DEPLOYMENT.md** | Production deployment | Going to production |

---

## 🆘 Troubleshooting

### PostgreSQL Connection Error
```
Error: ECONNREFUSED 127.0.0.1:5432
```
**Solution:** Start PostgreSQL service
```powershell
net start postgresql-x64-15
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3001
```
**Solution:** Change port or kill process
```powershell
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### npm install fails
**Solution:** Clear cache
```powershell
npm cache clean --force
rm -r node_modules
npm install
```

### More issues?
- See [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md#-common-issues--fixes)
- See [README.md](README.md#troubleshooting)
- See [SETUP_VERIFICATION.md](SETUP_VERIFICATION.md)

---

## 📊 System Requirements

### Minimum
- CPU: 2 cores
- RAM: 2 GB
- Storage: 500 MB
- Internet: For npm packages

### Recommended
- CPU: 4 cores
- RAM: 8 GB
- Storage: 1 GB
- Internet: Always recommended

---

## 🎓 Getting Started

### 1️⃣ First Time? → [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md)
Complete beginner? Start with our step-by-step guide.

### 2️⃣ Quick Start? → [QUICK_START.md](QUICK_START.md)
2-minute quick start for the impatient.

### 3️⃣ Docker? → `docker-compose up --build`
Want containerization? Just one command.

### 4️⃣ Production Ready? → [DEPLOYMENT.md](DEPLOYMENT.md)
Going live? See production deployment guide.

---

## 🔐 Security Notes

- **Development**: Using demo credentials, not for production
- **Production**: Update all passwords and secrets
- **Database**: Use strong passwords and proper backups
- **API**: Add authentication/authorization for production
- **CORS**: Configure proper CORS for your domain

---

## 📝 License & Credits

Built for Signal Scout - Target Account Management System

---

## 🤝 Support

- **Local setup issues?** → [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md)
- **Docker issues?** → [README.md](README.md#docker-deployment)
- **API questions?** → [API_TESTING.md](API_TESTING.md)
- **Architecture questions?** → [ARCHITECTURE.md](ARCHITECTURE.md)

---

## 🎉 Next Steps

1. **Choose your setup:**
   - ✅ Windows Local → [POSTGRES_SETUP.md](POSTGRES_SETUP.md) then `setup.bat`
   - ✅ Docker → `docker-compose up --build`
   - ✅ Custom → [LOCAL_SETUP.md](LOCAL_SETUP.md)

2. **Follow the guide** for your chosen path

3. **Start developing!**

---

**Ready to begin?** → [LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md) 🚀
