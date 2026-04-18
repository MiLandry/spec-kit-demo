/**
 * Employee API routes
 * REST endpoints for employee CRUD operations
 */

import { Router, Request, Response } from 'express';
import type { EmployeeService as EmployeeServiceType } from '../services/employeeService';
import { createEmployeeSchema, updateEmployeeSchema } from '@employee-system/shared';

export const createEmployeeRoutes = (employeeService: typeof EmployeeServiceType): Router => {
  const router = Router();

  /**
   * GET /api/employees/list
   * Returns a list of all employees
   */
  router.get('/list', async (_req: Request, res: Response) => {
    try {
      const result = await employeeService.listEmployees({});
      res.json({ employees: result.employees });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch employees' });
    }
  });

  /**
   * POST /api/employees/list/create
   * Creates a new employee
   */
  router.post('/list/create', async (req: Request, res: Response): Promise<void> => {
    try {
      // Validate input
      const validatedInput = createEmployeeSchema.parse(req.body);
      const employee = await employeeService.createEmployee(validatedInput);
      res.status(201).json({ employee });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to create employee' });
      }
    }
  });

  /**
   * PUT /api/employees/:id/edit
   * Updates an existing employee
   */
  router.put('/:id/edit', async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      // Validate input
      const validatedInput = updateEmployeeSchema.parse(req.body);
      const employee = await employeeService.updateEmployee(id, validatedInput);
      res.json({ employee });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Failed to update employee' });
      }
    }
  });

  /**
   * DELETE /api/employees/:id
   * Deletes an employee
   */
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await employeeService.deleteEmployee(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete employee' });
    }
  });

  return router;
};

export default createEmployeeRoutes;
