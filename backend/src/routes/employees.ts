/**
 * Employee API routes
 * REST endpoints for employee CRUD operations
 */

import { Router, Request, Response } from 'express';
import type { EmployeeService as EmployeeServiceType } from '../services/employeeService';
import type { EmployeeStatus } from '@employee-system/shared';
import { createEmployeeSchema, updateEmployeeSchema } from '@employee-system/shared';

export const createEmployeeRoutes = (employeeService: typeof EmployeeServiceType): Router => {
  const router = Router();

  /**
   * GET /api/employees/list
   * Returns a list of employees, optionally filtered by search, department, status, limit, or offset.
   */
  router.get('/list', async (req: Request, res: Response) => {
    try {
      const { search, department, status, limit, offset } = req.query;
      const normalizedSearch = typeof search === 'string' && search.trim() !== '' ? search : undefined;
      const normalizedDepartment = typeof department === 'string' && department.trim() !== '' ? department : undefined;
      const normalizedStatus = typeof status === 'string' && status.trim() !== '' ? (status as EmployeeStatus) : undefined;

      const result = await employeeService.listEmployees({
        search: normalizedSearch,
        department: normalizedDepartment,
        status: normalizedStatus,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
      });
      res.json({ employees: result.employees, total: result.total });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch employees' });
    }
  });

  /**
   * GET /api/employees/:id
   * Returns a single employee by ID
   */
  router.get('/:id', async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const employee = await employeeService.getEmployee(id);
      res.json({ employee });
    } catch (error: any) {
      res.status(404).json({ error: error.message || 'Employee not found' });
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
