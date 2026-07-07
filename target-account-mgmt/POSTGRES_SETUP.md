# PostgreSQL Installation Guide for Windows

## 📥 Step 1: Download PostgreSQL

1. Visit: https://www.postgresql.org/download/windows/
2. Click on "Interactive installer by EDB"
3. Download the latest version (15.x or higher recommended)

---

## 💾 Step 2: Run the Installer

1. **Double-click** the PostgreSQL installer
2. Click "Next" to proceed

### Installation Directory
- Default: `C:\Program Files\PostgreSQL\15` (or latest version)
- Click "Next"

### Select Components
- ✅ PostgreSQL Server
- ✅ pgAdmin 4
- ✅ Stack Builder
- ✅ Command Line Tools
- Click "Next"

### Data Directory
- Default: `C:\Program Files\PostgreSQL\15\data`
- Click "Next"

### Superuser Password
- **Enter:** `postgres` (or your choice, remember it!)
- Click "Next"

### Port
- Default: `5432`
- Keep this
- Click "Next"

### Locale
- Default: English, United States
- Click "Next"

### Summary
- Review and click "Next"

### Installation
- Wait for installation to complete
- Click "Finish"

---

## ✅ Step 3: Verify Installation

Open PowerShell and check:

```powershell
psql --version
# Should output: psql (PostgreSQL) 15.x (or your installed version)
```

If this doesn't work, PostgreSQL wasn't added to PATH:
- Open Environment Variables: `Win + R` → `sysdm.cpl` → "Environment Variables"
- Find `Path` in User/System variables
- Add: `C:\Program Files\PostgreSQL\15\bin`
- Click OK and restart PowerShell

---

## 🗄️ Step 4: Create Database and User

### Open PostgreSQL Command Prompt

```powershell
psql -U postgres
# Enter the password you set during installation
```

### Execute Setup Script

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

-- Exit
\q
```

---

## 🔍 Step 5: Verify Database Setup

Test connection as the new user:

```powershell
psql -U targetsadmin -d target_accounts -h localhost
# Should connect without errors

# Inside psql:
SELECT version();
# Should show PostgreSQL version

# List tables (should be empty initially):
\dt

# Exit
\q
```

---

## 🚀 Step 6: Start PostgreSQL Service

### Windows Service (Automatic)
PostgreSQL should start automatically with Windows after installation.

### Manual Start/Stop

```powershell
# Start service
net start postgresql-x64-15
# (Replace 15 with your PostgreSQL version)

# Stop service
net stop postgresql-x64-15

# Check if running
Get-Service postgresql-x64-15 | Select-Object Status
```

### Or use Services Manager
1. Press `Win + R`
2. Type: `services.msc`
3. Find: `postgresql-x64-15`
4. Right-click → Start/Stop/Restart

---

## 🔐 Connection String

After setup, you can connect using:

```
Host: localhost
Port: 5432
Database: target_accounts
User: targetsadmin
Password: securepassword123
```

In connection string format:
```
postgresql://targetsadmin:securepassword123@localhost:5432/target_accounts
```

---

## 📝 Environment Configuration

The `.env` file is already configured for local development:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=targetsadmin
DB_PASSWORD=securepassword123
DB_NAME=target_accounts
```

---

## ✨ Optional: pgAdmin GUI

**pgAdmin** is a web-based database management tool installed with PostgreSQL.

Access it:
1. Browser: http://localhost:5050
2. Default login:
   - Email: `postgres@pgadmin.org`
   - Password: `admin`

### Connect to Server in pgAdmin
1. Right-click "Servers" → "Create" → "Server"
2. Name: `Target Accounts`
3. Connection tab:
   - Host: `localhost`
   - Port: `5432`
   - Username: `targetsadmin`
   - Password: `securepassword123`
   - Database: `target_accounts`
4. Save

---

## 🆘 Troubleshooting PostgreSQL

### Can't connect: ECONNREFUSED
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solutions:**
- Check if PostgreSQL service is running: `net start postgresql-x64-15`
- Verify port 5432 is not blocked
- Check credentials in .env file

### psql: command not found
**Solution:**
- Add PostgreSQL bin directory to PATH
- Or use full path: `"C:\Program Files\PostgreSQL\15\bin\psql"`

### Password authentication failed
**Solutions:**
- Check password in .env matches database password
- Reset password:
  ```sql
  ALTER USER targetsadmin WITH PASSWORD 'newpassword';
  ```

### Database already exists
**Solution:**
- Drop and recreate: `DROP DATABASE target_accounts;`
- Or use different database name in .env

### Port already in use
**Solution:**
- Change PostgreSQL port during installation
- Or stop the service using the port
- Or find what's using it:
  ```powershell
  netstat -ano | findstr :5432
  taskkill /PID <PID> /F
  ```

---

## ✅ You're Ready!

After PostgreSQL setup, proceed to:

```powershell
cd target-account-mgmt
.\setup.bat
# or
.\setup.ps1
```

This will install all Node.js dependencies and start the system.

---

## 📞 Need Help?

- PostgreSQL Docs: https://www.postgresql.org/docs/
- pgAdmin Docs: https://www.pgadmin.org/docs/
- Check LOCAL_SETUP.md for system setup steps
