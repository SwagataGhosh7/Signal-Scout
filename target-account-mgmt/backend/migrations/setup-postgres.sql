-- Target Account Management - PostgreSQL Setup Script
-- Run this as the postgres user in psql to set up the database and user

-- Create database
CREATE DATABASE target_accounts;

-- Connect to the new database
\c target_accounts

-- Create user
CREATE USER targetsadmin WITH PASSWORD 'securepassword123';

-- Grant connection privileges
ALTER ROLE targetsadmin SET client_encoding TO 'utf8';
ALTER ROLE targetsadmin SET default_transaction_isolation TO 'read committed';
ALTER ROLE targetsadmin SET default_transaction_deferrable TO on;
ALTER ROLE targetsadmin SET default_transaction_read_only TO off;

-- Grant all privileges on database
GRANT ALL PRIVILEGES ON DATABASE target_accounts TO targetsadmin;

-- Grant schema privileges
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO targetsadmin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO targetsadmin;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO targetsadmin;

-- Display completion message
\echo 'Database setup complete!'
\echo 'Database: target_accounts'
\echo 'User: targetsadmin'
\echo 'Password: securepassword123'
\echo ''
\echo 'You can now connect with:'
\echo 'psql -U targetsadmin -d target_accounts -h localhost'
