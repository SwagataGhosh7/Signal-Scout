# Target Account Management - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Docker Environment                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────┐    ┌──────────────────────┐          │
│  │   Frontend (React)   │    │   Backend (Express)  │          │
│  │   Port: 8081:5173    │    │   Port: 3001         │          │
│  │   - Vite Dev Server  │    │   - TypeScript       │          │
│  │   - Tailwind CSS     │◄──►│   - REST API         │          │
│  │   - Dark Theme       │    │   - Connection Pool  │          │
│  └──────────────────────┘    └──────────────────────┘          │
│                                        ▲                        │
│                                        │ (pg driver)             │
│                                        ▼                        │
│                            ┌──────────────────────┐            │
│                            │ PostgreSQL Database  │            │
│                            │ Port: 5432           │            │
│                            │ - Persistent Volume  │            │
│                            │ - target_accounts DB │            │
│                            └──────────────────────┘            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Development server & bundler
- **Tailwind CSS** - Styling with dark theme
- **Axios** - HTTP client for API calls

**Colors:**
- Background: `#0B0F17` (dark)
- Accent: `#22C55E` (neon green)
- Text: Gray shades for contrast

### Backend
- **Node.js 18** - Runtime
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **pg** - PostgreSQL driver
- **uuid** - ID generation

### Database
- **PostgreSQL 15** - Relational database
- **Persistent Volume** - Data survives container restarts

### Containerization
- **Docker** - Container runtime
- **Docker Compose** - Multi-container orchestration
- **Docker Volume** - Persistent data storage

## Project Structure

```
target-account-mgmt/
├── docker-compose.yml           # Main orchestration file
├── .env.example                 # Environment template
│
├── backend/
│   ├── Dockerfile               # Backend container image
│   ├── package.json             # Dependencies & scripts
│   ├── tsconfig.json            # TypeScript config
│   ├── src/
│   │   ├── server.ts            # Express server entry point
│   │   ├── routes/
│   │   │   └── targets.ts       # Target CRUD endpoints
│   │   ├── models/
│   │   │   └── Target.ts        # Target data model
│   │   ├── middleware/
│   │   │   └── validation.ts    # Request validation
│   │   └── migrations/
│   │       └── run.ts           # Migration runner
│   └── migrations/
│       └── 001_create_targets_table.sql  # Database schema
│
├── frontend/
│   ├── Dockerfile               # Frontend container image
│   ├── package.json             # Dependencies & scripts
│   ├── tsconfig.json            # TypeScript config
│   ├── vite.config.ts           # Vite configuration
│   ├── tailwind.config.ts       # Tailwind configuration
│   ├── postcss.config.js        # PostCSS configuration
│   ├── index.html               # HTML entry point
│   └── src/
│       ├── main.tsx             # React entry point
│       ├── App.tsx              # Root component
│       ├── index.css            # Global styles
│       ├── api/
│       │   └── client.ts        # API client & types
│       └── components/
│           ├── TargetCompanies.tsx  # Main dashboard
│           ├── TargetForm.tsx       # Add target form
│           └── TargetCard.tsx       # Target display card
```

## Database Schema

### targets table

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | UUID | PRIMARY KEY | Unique identifier |
| company_name | VARCHAR(255) | NOT NULL | Target company name |
| domain | VARCHAR(255) | NOT NULL UNIQUE | Company domain |
| industry | VARCHAR(100) | NOT NULL | Industry category |
| priority | VARCHAR(20) | NOT NULL | High/Medium/Low |
| owner | VARCHAR(20) | NOT NULL | Self/Team |
| status | VARCHAR(50) | NOT NULL | Active Scanning/Paused |
| icp_context | TEXT | NOT NULL | ICP description & notes |
| ai_intent_level | SMALLINT | 0-100 | AI intent score |
| calculated_risk | SMALLINT | 0-100 | Risk assessment |
| last_harvested | TIMESTAMP | NULL | Last signal harvest time |
| actions_queue | INTEGER | DEFAULT 0 | Queued actions count |
| created_at | TIMESTAMP | DEFAULT NOW() | Creation timestamp |
| updated_at | TIMESTAMP | DEFAULT NOW() | Last update timestamp |

**Indexes:**
- `idx_targets_priority` - ON priority
- `idx_targets_status` - ON status
- `idx_targets_created_at` - ON created_at DESC

## API Endpoints

### Targets
- `GET /api/targets` - Fetch all targets
- `GET /api/targets/:id` - Fetch single target
- `POST /api/targets` - Create new target
- `PUT /api/targets/:id` - Update target
- `DELETE /api/targets/:id` - Delete target
- `POST /api/targets/:id/harvest` - Trigger signal harvest

### Health Check
- `GET /health` - API health status

## Frontend Component Hierarchy

```
App
└── TargetCompanies (Main Dashboard)
    ├── Stats Section (Cards)
    ├── TargetForm (Conditional)
    └── TargetCard[] (Grid)
        ├── Company Info
        ├── Priority Badge
        ├── Metrics Display
        ├── Action Buttons
        └── Timestamps
```

## Data Flow

### Adding a Target
1. User fills TargetForm with required fields
2. Form validates input on client
3. Submit triggers API POST `/api/targets`
4. Backend validates and saves to PostgreSQL
5. Returns created target with ID
6. Frontend adds to targets list and clears form

### Fetching Targets
1. Component mounts, triggers useEffect
2. Calls API GET `/api/targets`
3. Backend queries PostgreSQL
4. Returns array of targets
5. Frontend populates grid with TargetCard components

### Harvesting Signals
1. User clicks "Harvest Signals" button on target card
2. Triggers API POST `/api/targets/:id/harvest`
3. Backend updates `last_harvested` and increments `actions_queue`
4. Returns updated target
5. Frontend updates target in state

### Deleting Target
1. User clicks trash icon on target card
2. Triggers API DELETE `/api/targets/:id`
3. Backend removes from PostgreSQL
4. Returns success message
5. Frontend removes from targets list

## Persistent Data Storage

The `target-db-volume` Docker volume ensures:
- Database data persists across container restarts
- Even if containers are stopped/removed, data survives
- Mounted to `/var/lib/postgresql/data` in PostgreSQL container
- Can be backed up and migrated independently

## Environment Variables

**Backend (.env):**
```
NODE_ENV=development
PORT=3001
DB_HOST=postgres
DB_PORT=5432
DB_USER=targetsadmin
DB_PASSWORD=securepassword123
DB_NAME=target_accounts
DB_POOL_MIN=2
DB_POOL_MAX=10
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:3001
```

## Key Features

✅ **CRUD Operations** - Create, Read, Update, Delete targets
✅ **Signal Harvesting** - Trigger and track signal harvesting
✅ **Real-time Metrics** - AI Intent, Risk calculations
✅ **Dark Theme UI** - Professional dark interface with neon accents
✅ **Responsive Design** - Mobile, tablet, desktop layouts
✅ **Type Safety** - Full TypeScript coverage
✅ **Data Persistence** - PostgreSQL with Docker volumes
✅ **API Validation** - Server-side form validation
✅ **Error Handling** - User-friendly error messages
