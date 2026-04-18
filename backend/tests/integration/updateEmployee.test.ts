/**
 * Integration test for update employee endpoint
 * Tests the PUT /api/employees/{id}/edit endpoint
 */

import request from 'supertest';
import { createApp } from '../../src/app';
import * as employeeRepository from '../../src/db/repositories/employeeRepository';

jest.mock('../../src/db/repositories/employeeRepository', () => ({
  EmployeeRepository: {
    update: jest.fn(),
  },
}));

describe('PUT /api/employees/:id/edit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update an existing employee', async () => {
    const updatedEmployee = {
      id: '1',
      fullName: 'John Doe Updated',
      email: 'john.updated@example.com',
      title: 'Senior Engineer',
      department: 'Engineering',
      status: 'active' as const,
      manager: null,
      startDate: '2020-01-01',
      phone: '555-0002',
      location: 'San Francisco',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    (employeeRepository.EmployeeRepository.update as jest.Mock).mockResolvedValue(updatedEmployee);

    const app = createApp();

    const response = await request(app)
      .put('/api/employees/1/edit')
      .send({
        fullName: 'John Doe Updated',
        email: 'john.updated@example.com',
        title: 'Senior Engineer',
        phone: '555-0002',
        location: 'San Francisco',
      })
      .expect(200);

    expect(response.body).toHaveProperty('employee');
    expect(response.body.employee.fullName).toBe('John Doe Updated');
    expect(response.body.employee.title).toBe('Senior Engineer');
  });

  it('should return 400 for invalid input', async () => {
    const app = createApp();

    const response = await request(app)
      .put('/api/employees/1/edit')
      .send({
        email: 'not-an-email',
      })
      .expect(400);

    expect(response.body).toHaveProperty('error');
  });

  it('should return 500 on database error', async () => {
    (employeeRepository.EmployeeRepository.update as jest.Mock).mockRejectedValue(
      new Error('Employee not found')
    );

    const app = createApp();

    const response = await request(app)
      .put('/api/employees/999/edit')
      .send({
        title: 'Manager',
      })
      .expect(500);

    expect(response.body).toHaveProperty('error');
  });
});
