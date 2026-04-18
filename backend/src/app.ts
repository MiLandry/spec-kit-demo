/**
 * Express app bootstrap
 * Core Express application setup and middleware configuration
 */

import express, { Express } from 'express';
import { createEmployeeRoutes } from './routes/employees';
import { EmployeeService } from './services/employeeService';

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
