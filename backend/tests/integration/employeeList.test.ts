/**
 * Integration test for employee list endpoint
 * Tests the GET /api/employees/list endpoint
 */

import request from 'supertest';
import { createApp } from '../../src/app';
import * as employeeRepository from '../../src/db/repositories/employeeRepository';

// Mock the employee repository
jest.mock('../../src/db/repositories/employeeRepository', () => ({
  EmployeeRepository: {
    findAll: jest.fn(),
  },
}));

describe('GET /api/employees/list', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of employees', async () => {
    const mockEmployees = [
      {
        id: '1',
        fullName: 'John Doe',
        email: 'john@example.com',
        title: 'Engineer',
        department: 'Engineering',
        status: 'active' as const,
        manager: null,
        startDate: '2020-01-01',
        phone: null,
        location: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    (employeeRepository.EmployeeRepository.findAll as jest.Mock).mockResolvedValue({
      employees: mockEmployees,
      total: 1,
    });

    const app = createApp();

    const response = await request(app)
      .get('/api/employees/list')
      .expect(200);

    expect(response.body).toHaveProperty('employees');
    expect(Array.isArray(response.body.employees)).toBe(true);
    expect(response.body.employees).toHaveLength(1);
    expect(response.body.employees[0].fullName).toBe('John Doe');
  });

  it('should handle empty employee list', async () => {
    (employeeRepository.EmployeeRepository.findAll as jest.Mock).mockResolvedValue({
      employees: [],
      total: 0,
    });

    const app = createApp();

    const response = await request(app)
      .get('/api/employees/list')
      .expect(200);

    expect(response.body.employees).toEqual([]);
  });

  it('should return 500 on database error', async () => {
    (employeeRepository.EmployeeRepository.findAll as jest.Mock).mockRejectedValue(
      new Error('Database connection failed')
    );

    const app = createApp();

    const response = await request(app)
      .get('/api/employees/list')
      .expect(500);

    expect(response.body).toHaveProperty('error');
  });
});