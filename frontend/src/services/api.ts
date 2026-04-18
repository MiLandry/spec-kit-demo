/**
 * API client for employee endpoints
 * Provides type-safe wrappers for backend REST API calls
 */

import axios from 'axios';
import type { Employee, CreateEmployeeInput, UpdateEmployeeInput } from '@employee-system/shared';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const employeeApi = {
  /**
   * Fetch list of employees
   */
  async listEmployees(params?: { search?: string; department?: string }): Promise<Employee[]> {
    const response = await apiClient.get('/employees/list', { params });
    return response.data.employees || [];
  },

  /**
   * Fetch a single employee by ID
   */
  async getEmployee(id: string): Promise<Employee> {
    const response = await apiClient.get(`/employees/${id}`);
    return response.data.employee;
  },

  /**
   * Create a new employee
   */
  async createEmployee(input: CreateEmployeeInput): Promise<Employee> {
    const response = await apiClient.post('/employees/list/create', input);
    return response.data.employee;
  },

  /**
   * Update an existing employee
   */
  async updateEmployee(id: string, input: UpdateEmployeeInput): Promise<Employee> {
    const response = await apiClient.put(`/employees/${id}/edit`, input);
    return response.data.employee;
  },

  /**
   * Delete an employee
   */
  async deleteEmployee(id: string): Promise<void> {
    await apiClient.delete(`/employees/${id}`);
  },
};

export default employeeApi;
