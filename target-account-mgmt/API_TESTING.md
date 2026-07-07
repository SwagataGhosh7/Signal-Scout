# 🧪 API Testing Guide

## Prerequisites
- System running: `docker-compose up --build`
- Backend available at: `http://localhost:3001`

---

## 1️⃣ Health Check

```bash
curl http://localhost:3001/health
```

**Response:**
```json
{"status":"ok","timestamp":"2026-07-07T20:30:00.000Z"}
```

---

## 2️⃣ List All Targets

```bash
curl http://localhost:3001/api/targets
```

**Response (empty initially):**
```json
[]
```

**Response (with targets):**
```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "company_name": "Acme Corporation",
    "domain": "acme.com",
    "industry": "Technology",
    "priority": "High",
    "owner": "Self",
    "status": "Active Scanning",
    "icp_context": "Enterprise software company focusing on cloud solutions",
    "ai_intent_level": 75,
    "calculated_risk": 42,
    "last_harvested": null,
    "actions_queue": 0,
    "created_at": "2026-07-07T20:30:00.000Z",
    "updated_at": "2026-07-07T20:30:00.000Z"
  }
]
```

---

## 3️⃣ Create a Target

```bash
curl -X POST http://localhost:3001/api/targets \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "TechCorp Inc",
    "domain": "techcorp.io",
    "industry": "SaaS",
    "priority": "High",
    "owner": "Self",
    "status": "Active Scanning",
    "icp_context": "Enterprise SaaS platform for data analytics"
  }'
```

**Response (201 Created):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "company_name": "TechCorp Inc",
  "domain": "techcorp.io",
  "industry": "SaaS",
  "priority": "High",
  "owner": "Self",
  "status": "Active Scanning",
  "icp_context": "Enterprise SaaS platform for data analytics",
  "ai_intent_level": 68,
  "calculated_risk": 35,
  "last_harvested": null,
  "actions_queue": 0,
  "created_at": "2026-07-07T20:32:15.000Z",
  "updated_at": "2026-07-07T20:32:15.000Z"
}
```

---

## 4️⃣ Get Single Target

```bash
curl http://localhost:3001/api/targets/550e8400-e29b-41d4-a716-446655440001
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "company_name": "TechCorp Inc",
  ...
}
```

**Response (404 Not Found):**
```json
{"error":"Target not found"}
```

---

## 5️⃣ Update Target

```bash
curl -X PUT http://localhost:3001/api/targets/550e8400-e29b-41d4-a716-446655440001 \
  -H "Content-Type: application/json" \
  -d '{
    "priority": "Medium",
    "status": "Paused",
    "ai_intent_level": 85
  }'
```

**Response (200 OK):**
```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "company_name": "TechCorp Inc",
  "domain": "techcorp.io",
  "industry": "SaaS",
  "priority": "Medium",
  "owner": "Self",
  "status": "Paused",
  "icp_context": "Enterprise SaaS platform for data analytics",
  "ai_intent_level": 85,
  "calculated_risk": 35,
  "last_harvested": null,
  "actions_queue": 0,
  "created_at": "2026-07-07T20:32:15.000Z",
  "updated_at": "2026-07-07T20:35:30.000Z"
}
```

---

## 6️⃣ Harvest Signals

```bash
curl -X POST http://localhost:3001/api/targets/550e8400-e29b-41d4-a716-446655440001/harvest
```

**Response (200 OK):**
```json
{
  "message": "Harvest signals initiated",
  "target": {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "company_name": "TechCorp Inc",
    "domain": "techcorp.io",
    "industry": "SaaS",
    "priority": "Medium",
    "owner": "Self",
    "status": "Paused",
    "icp_context": "Enterprise SaaS platform for data analytics",
    "ai_intent_level": 85,
    "calculated_risk": 35,
    "last_harvested": "2026-07-07T20:36:00.000Z",
    "actions_queue": 1,
    "created_at": "2026-07-07T20:32:15.000Z",
    "updated_at": "2026-07-07T20:36:00.000Z"
  }
}
```

---

## 7️⃣ Delete Target

```bash
curl -X DELETE http://localhost:3001/api/targets/550e8400-e29b-41d4-a716-446655440001
```

**Response (200 OK):**
```json
{
  "message": "Target deleted successfully",
  "id": "550e8400-e29b-41d4-a716-446655440001"
}
```

**Response (404 Not Found):**
```json
{"error":"Target not found"}
```

---

## ❌ Error Responses

### Missing Required Field
```bash
curl -X POST http://localhost:3001/api/targets \
  -H "Content-Type: application/json" \
  -d '{"company_name": "Test"}'
```

**Response (400 Bad Request):**
```json
{"error":"Domain is required"}
```

### Invalid Priority
```bash
curl -X POST http://localhost:3001/api/targets \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Test",
    "domain": "test.com",
    "industry": "Tech",
    "priority": "InvalidPriority",
    "owner": "Self",
    "status": "Active Scanning",
    "icp_context": "Test"
  }'
```

**Response (400 Bad Request):**
```json
{"error":"Priority must be High, Medium, or Low"}
```

### Duplicate Domain
```bash
curl -X POST http://localhost:3001/api/targets \
  -H "Content-Type: application/json" \
  -d '{...same domain...}'
```

**Response (500 Internal Server Error):**
```json
{"error":"Failed to create target","message":"...unique constraint..."}
```

---

## 📝 Test Scenarios

### Scenario 1: Complete CRUD Flow
```bash
# 1. Create
ID=$(curl -s -X POST http://localhost:3001/api/targets \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Test Corp",
    "domain": "testcorp.com",
    "industry": "Tech",
    "priority": "High",
    "owner": "Self",
    "status": "Active Scanning",
    "icp_context": "Test company"
  }' | jq -r '.id')

# 2. Read
curl http://localhost:3001/api/targets/$ID

# 3. Update
curl -X PUT http://localhost:3001/api/targets/$ID \
  -H "Content-Type: application/json" \
  -d '{"priority": "Low"}'

# 4. Harvest
curl -X POST http://localhost:3001/api/targets/$ID/harvest

# 5. Delete
curl -X DELETE http://localhost:3001/api/targets/$ID
```

### Scenario 2: Multiple Targets
```bash
# Create multiple targets
for i in {1..5}; do
  curl -X POST http://localhost:3001/api/targets \
    -H "Content-Type: application/json" \
    -d "{
      \"company_name\": \"Company $i\",
      \"domain\": \"company$i.com\",
      \"industry\": \"Tech\",
      \"priority\": \"High\",
      \"owner\": \"Self\",
      \"status\": \"Active Scanning\",
      \"icp_context\": \"Test company $i\"
    }"
done

# List all
curl http://localhost:3001/api/targets | jq '.'
```

### Scenario 3: Update with Partial Data
```bash
# Get a target ID first
ID=$(curl -s http://localhost:3001/api/targets | jq -r '.[0].id')

# Update only some fields (others remain unchanged)
curl -X PUT http://localhost:3001/api/targets/$ID \
  -H "Content-Type: application/json" \
  -d '{
    "priority": "Medium",
    "ai_intent_level": 90
  }'
```

---

## 🔍 Debugging Tips

### Check Logs
```bash
docker-compose logs backend
```

### Test Database Connection
```bash
docker-compose exec postgres psql -U targetsadmin -d target_accounts -c "SELECT * FROM targets;"
```

### Monitor in Real-time
```bash
watch -n 1 'curl -s http://localhost:3001/api/targets | jq length'
```

### Test with Pretty JSON
```bash
curl -s http://localhost:3001/api/targets | jq '.'
```

### Test with Headers
```bash
curl -i http://localhost:3001/api/targets
```

---

## 📊 Common Test Data

### High Priority Target
```bash
curl -X POST http://localhost:3001/api/targets \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Enterprise Corp",
    "domain": "enterprise.com",
    "industry": "Enterprise Software",
    "priority": "High",
    "owner": "Team",
    "status": "Active Scanning",
    "icp_context": "Large enterprise customer with significant contract value"
  }'
```

### Medium Priority Target
```bash
curl -X POST http://localhost:3001/api/targets \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Startup Inc",
    "domain": "startup.io",
    "industry": "Startup",
    "priority": "Medium",
    "owner": "Self",
    "status": "Paused",
    "icp_context": "Early-stage startup with growth potential"
  }'
```

### Low Priority Target
```bash
curl -X POST http://localhost:3001/api/targets \
  -H "Content-Type: application/json" \
  -d '{
    "company_name": "Research Lab",
    "domain": "researchlab.org",
    "industry": "Research",
    "priority": "Low",
    "owner": "Team",
    "status": "Paused",
    "icp_context": "Research institution for exploratory signals"
  }'
```

---

## 🚀 Performance Testing

```bash
# Send 100 requests
for i in {1..100}; do
  curl -s http://localhost:3001/api/targets > /dev/null &
done
wait

# Monitor time
time curl http://localhost:3001/api/targets > /dev/null
```

---

## 📋 API Contract

### Request Headers
```
Content-Type: application/json
```

### Response Headers
```
Content-Type: application/json
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept
```

### Status Codes
- `200 OK` - Success (GET, PUT)
- `201 Created` - Success (POST)
- `400 Bad Request` - Invalid input
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

**Last Updated:** July 7, 2026
