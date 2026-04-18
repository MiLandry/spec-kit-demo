/**
 * Integration test for create employee endpoint
 * Tests the POST /api/employees/list/create endpoint
 */

import request from 'supertest';
import { createApp } from '../../src/app';
import * as employeeRepository from '../../src/db/repositories/employeeRepository';

jest.mock('../../src/db/repositories/employeeRepository', () => ({
  EmployeeRepository: {
    create: jest.fn(),
  },
}));

describe('POST /api/employees/list/create', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new employee', async () => {
    const newEmployee = {
      id: '2',
      fullName: 'Jane Smith',
      email: 'jane@example.com',
      title: 'Designer',
      department: 'Design',
      status: 'active' as const,
      manager: null,
      startDate: '2021-06-15',
      phone: '555-0001',
      location: 'New York',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (employeeRepository.EmployeeRepository.create as jest.Mock).mockResolvedValue(newEmployee);

    const app = createApp();

    const response = await request(app)
      .post('/api/employees/list/create')
      .send({
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        title: 'Designer',
        department: 'Design',
        startDate: '2021-06-15',
        phone: '555-0001',
        location: 'New York',
      })
      .expect(201);

    expect(response.body).toHaveProperty('employee');
    expect(response.body.employee.fullName).toBe('Jane Smith');
    expect(response.body.employee.id).toBe('2');
  });

  it('should return 400 for invalid input', async () => {
    const app = createApp();

    const response = await request(app)
      .post('/api/employees/list/create')
      .send({
        fullName: 'Jane Smith',
        // missing email
        title: 'Designer',
        department: 'Design',
        startDate: '2021-06-15',
      })
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('should return 500 on database error', async () => {
    (employeeRepository.EmployeeRepository.create as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const app = createApp();

    const response = await request(app)
      .post('/api/employees/list/create')
      .send({
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        title: 'Designer',
        department: 'Design',
        startDate: '2021-06-15',
      })
      .expect(500);

    expect(response.body).toHaveProperty('error');
  });
});
