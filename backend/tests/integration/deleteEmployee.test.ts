/**
 * Integration test for delete employee endpoint
 * Tests the DELETE /api/employees/{id} endpoint
 */

import request from 'supertest';
import { createApp } from '../../src/app';
import * as employeeRepository from '../../src/db/repositories/employeeRepository';

jest.mock('../../src/db/repositories/employeeRepository', () => ({
  EmployeeRepository: {
    delete: jest.fn(),
  },
}));

describe('DELETE /api/employees/:id', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should delete an existing employee', async () => {
    (employeeRepository.EmployeeRepository.delete as jest.Mock).mockResolvedValue(true);

    const app = createApp();

    const response = await request(app)
      .delete('/api/employees/1')
      .expect(204);

    expect(response.body).toEqual({});
  });

  it('should return 500 when employee not found', async () => {
    (employeeRepository.EmployeeRepository.delete as jest.Mock).mockRejectedValue(
      new Error('Employee not found')
    );

    const app = createApp();

    const response = await request(app)
      .delete('/api/employees/999')
      .expect(500);

    expect(response.body).toHaveProperty('error');
  });

  it('should return 500 on database error', async () => {
    (employeeRepository.EmployeeRepository.delete as jest.Mock).mockRejectedValue(
      new Error('Database error')
    );

    const app = createApp();

    const response = await request(app)
      .delete('/api/employees/1')
      .expect(500);

    expect(response.body).toHaveProperty('error');
  });
});
