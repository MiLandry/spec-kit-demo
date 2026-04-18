/**
 * Employee Service
 * Business logic layer for employee operations
 */

import { EmployeeRepository } from '../db/repositories/employeeRepository';
import type { Employee, CreateEmployeeInput, UpdateEmployeeInput, EmployeeListQuery } from '@employee-system/shared';

export class EmployeeService {
  /**
   * Get all employees with optional filtering
   */
  static async listEmployees(params: EmployeeListQuery): Promise<{ employees: Employee[]; total: number }> {
    return EmployeeRepository.findAll(params);
  }

  /**
   * Get a single employee by ID
   */
  static async getEmployee(id: string): Promise<Employee> {
    const employee = await EmployeeRepository.findById(id);
    if (!employee) {
      throw new Error(`Employee with id ${id} not found`);
    }
    return employee;
  }

  /**
   * Create a new employee
   */
  static async createEmployee(input: CreateEmployeeInput): Promise<Employee> {
    return EmployeeRepository.create(input);
  }

  /**
   * Update an existing employee
   */
  static async updateEmployee(id: string, input: UpdateEmployeeInput): Promise<Employee> {
    return EmployeeRepository.update(id, input);
  }

  /**
   * Delete an employee
   */
  static async deleteEmployee(id: string): Promise<void> {
    const deleted = await EmployeeRepository.delete(id);
    if (!deleted) {
      throw new Error(`Employee with id ${id} not found`);
    }
  }
}
