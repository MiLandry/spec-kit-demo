-- Migration: 001-create-employees-table
-- Creates the employees table with all required fields from the specification

CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave', 'terminated')),
  manager VARCHAR(255),
  start_date DATE NOT NULL,
  phone VARCHAR(20),
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on email for uniqueness and lookups
CREATE UNIQUE INDEX idx_employees_email ON employees(email);

-- Index on department for filtering
CREATE INDEX idx_employees_department ON employees(department);

-- Index on status for filtering
CREATE INDEX idx_employees_status ON employees(status);

-- Index on full_name for search
CREATE INDEX idx_employees_full_name ON employees(full_name);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_employees_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_employees_timestamp
BEFORE UPDATE ON employees
FOR EACH ROW
EXECUTE FUNCTION update_employees_timestamp();
