# Target Account Management System
version: '3'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:15-alpine
    container_name: target-management-db
    environment:
      POSTGRES_USER: targetsadmin
      POSTGRES_PASSWORD: securepassword123
      POSTGRES_DB: target_accounts
    ports:
      - '5432:5432'
    volumes:
      - target-db-volume:/var/lib/postgresql/data
    networks:
      - target-network

  # Backend API
  backend:
    build: ./backend
    container_name: target-management-api
    environment:
      NODE_ENV: development
      PORT: 3001
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USER: targetsadmin
      DB_PASSWORD: securepassword123
      DB_NAME: target_accounts
    ports:
      - '3001:3001'
    depends_on:
      - postgres
    networks:
      - target-network

  # Frontend UI
  frontend:
    build: ./frontend
    container_name: target-management-ui
    environment:
      VITE_API_URL: http://localhost:3001
    ports:
      - '8081:5173'
    depends_on:
      - backend
    networks:
      - target-network

volumes:
  target-db-volume:

networks:
  target-network:
    driver: bridge
