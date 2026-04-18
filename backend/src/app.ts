/**
 * Express app bootstrap
 * Core Express application setup and middleware configuration
 */

import { config } from 'dotenv';
import express, { Express } from 'express';
import { createEmployeeRoutes } from './routes/employees';
import { EmployeeService } from './services/employeeService';
import { query } from './db/connection';
import path from 'path';

// Load environment variables from root .env file
config({ path: path.resolve(__dirname, '../../.env') });

export const createApp = (): Express => {
  const app = express();

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // CORS support for development
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    next();
  });

  // Health check endpoint
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Register API routes
  const employeeRoutes = createEmployeeRoutes(EmployeeService);
  app.use('/api/employees', employeeRoutes);

  return app;
};

export default createApp;

// Validate database connection
const validateDatabaseConnection = async (): Promise<void> => {
  try {
    await query('SELECT 1');
    console.log('✅ Database connection established successfully');
  } catch (error) {
    const err = error as any;
    console.error('❌ Database connection failed:', err.message || 'Unknown error');

    // Provide specific guidance based on error type
    if (err.code === 'ECONNREFUSED') {
      console.error('\n🔍 Connection refused. This usually means:');
      console.error('  - PostgreSQL server is not running');
      console.error('  - PostgreSQL is not installed');
      console.error('  - Wrong host/port configuration');
      console.error('\n💡 To fix this:');
      console.error('  1. Install PostgreSQL: brew install postgresql');
      console.error('  2. Start PostgreSQL: brew services start postgresql');
      console.error('  3. Create database: createdb employee_management');
      console.error('  4. Run migrations: (check README for migration commands)');
    } else if (err.code === '42P01') {
      console.error('\n🔍 Database table does not exist. Run database migrations first.');
    } else if (err.code === '28P01') {
      console.error('\n🔍 Authentication failed. Check POSTGRES_USER and POSTGRES_PASSWORD in .env file.');
    } else if (err.code === '3D000') {
      console.error('\n🔍 Database does not exist. Create it first: createdb employee_management');
    } else {
      console.error('\n🔍 General database error. Check your .env configuration.');
    }

    console.error('\n📋 Current database configuration:');
    console.error(`  Host: ${process.env.POSTGRES_HOST || 'not set'}`);
    console.error(`  Port: ${process.env.POSTGRES_PORT || 'not set'}`);
    console.error(`  User: ${process.env.POSTGRES_USER || 'not set'}`);
    console.error(`  Database: ${process.env.POSTGRES_DB || 'not set'}`);
    console.error('  Password: [HIDDEN]');

    throw new Error('Database connection validation failed');
  }
};

// Start server if this file is run directly
if (require.main === module) {
  const port = process.env.BACKEND_PORT || 3000;

  // Validate required environment variables
  const requiredEnvVars = ['POSTGRES_HOST', 'POSTGRES_PORT', 'POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_DB'];
  const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

  if (missingEnvVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingEnvVars.forEach(varName => {
      console.error(`  - ${varName}`);
    });
    console.error('Please check your .env file and ensure all database connection variables are set.');
    process.exit(1);
  }

  console.log('🚀 Starting Employee Management Backend Server...');

  validateDatabaseConnection()
    .then(() => {
      const app = createApp();
      app.listen(port, () => {
        console.log(`✅ Server running successfully on port ${port}`);
        console.log(`🌐 Health check available at: http://localhost:${port}/health`);
        console.log(`📚 API documentation available at: http://localhost:${port}/api/employees`);
      });
    })
    .catch((error) => {
      console.error('❌ Failed to start server:', error.message);
      process.exit(1);
    });
}
