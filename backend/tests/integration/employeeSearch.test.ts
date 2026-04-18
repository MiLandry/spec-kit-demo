/**
 * Integration test for employee search and filter endpoint
 * Tests GET /api/employees/list with search and department query parameters
 */

import request from 'supertest';
import { createApp } from '../../src/app';
import * as employeeRepository from '../../src/db/repositories/employeeRepository';

jest.mock('../../src/db/repositories/employeeRepository', () => ({
  EmployeeRepository: {
    findAll: jest.fn(),
  },
}));

describe('GET /api/employees/list search and filter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should pass search and department filters to the repository', async () => {
    const mockEmployees: Array<Record<string, unknown>> = [];
    (employeeRepository.EmployeeRepository.findAll as jest.Mock).mockResolvedValue({
      employees: mockEmployees,
      total: 0,
    });

    const app = createApp();

    const response = await request(app)
      .get('/api/employees/list')
      .query({ search: 'John', department: 'Engineering' })
      .expect(200);

    expect(employeeRepository.EmployeeRepository.findAll).toHaveBeenCalledWith({
      search: 'John',
      department: 'Engineering',
      status: undefined,
      limit: undefined,
      offset: undefined,
    });
    expect(response.body).toEqual({ employees: mockEmployees, total: 0 });
  });

  it('should handle empty search and department values gracefully', async () => {
    const mockEmployees: Array<Record<string, unknown>> = [];
    (employeeRepository.EmployeeRepository.findAll as jest.Mock).mockResolvedValue({
      employees: mockEmployees,
      total: 0,
    });

    const app = createApp();

    await request(app)
      .get('/api/employees/list')
      .query({ search: '', department: '' })
      .expect(200);

    expect(employeeRepository.EmployeeRepository.findAll).toHaveBeenCalledWith({
      search: undefined,
      department: undefined,
      status: undefined,
      limit: undefined,
      offset: undefined,
    });
  });
});
