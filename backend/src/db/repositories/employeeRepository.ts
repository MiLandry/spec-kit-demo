/**
 * Employee Repository
 * Data access layer for employee CRUD operations
 */

import { query } from './connection';
import type { Employee, CreateEmployeeInput, UpdateEmployeeInput, EmployeeListQuery } from '@employee-system/shared';

export class EmployeeRepository {
  /**
   * Find all employees with optional filtering
   */
  static async findAll(params: EmployeeListQuery): Promise<{ employees: Employee[]; total: number }> {
    const { search = '', department, status, limit = 20, offset = 0 } = params;

    let whereClause = '1=1';
    const queryParams: any[] = [];
    let paramIndex = 1;

    if (search) {
      whereClause += ` AND LOWER(full_name) LIKE LOWER($${paramIndex}%)`;
      queryParams.push(search);
      paramIndex++;
    }

    if (department) {
      whereClause += ` AND department = $${paramIndex}`;
      queryParams.push(department);
      paramIndex++;
    }

    if (status) {
      whereClause += ` AND status = $${paramIndex}`;
      queryParams.push(status);
      paramIndex++;
    }

    // Count total matching records
    const countResult = await query(`SELECT COUNT(*) as count FROM employees WHERE ${whereClause}`, queryParams);
    const total = parseInt(countResult.rows[0].count, 10);

    // Fetch paginated results
    const listQuery = `
      SELECT id, full_name as "fullName", email, title, department, status,
             manager, start_date as "startDate", phone, location,
             created_at as "createdAt", updated_at as "updatedAt"
      FROM employees
      WHERE ${whereClause}
      ORDER BY created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;
    queryParams.push(limit, offset);

    const result = await query(listQuery, queryParams);
    const employees = result.rows as Employee[];

    return { employees, total };
  }

  /**
   * Find a single employee by ID
   */
  static async findById(id: string): Promise<Employee | null> {
    const result = await query(
      `SELECT id, full_name as "fullName", email, title, department, status,
              manager, start_date as "startDate", phone, location,
              created_at as "createdAt", updated_at as "updatedAt"
       FROM employees WHERE id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  /**
   * Find employee by email
   */
  static async findByEmail(email: string): Promise<Employee | null> {
    const result = await query(
      `SELECT id, full_name as "fullName", email, title, department, status,
              manager, start_date as "startDate", phone, location,
              created_at as "createdAt", updated_at as "updatedAt"
       FROM employees WHERE LOWER(email) = LOWER($1)`,
      [email]
    );
    return result.rows[0] || null;
  }

  /**
   * Create a new employee
   */
  static async create(input: CreateEmployeeInput): Promise<Employee> {
    // Check for duplicate email
    const existing = await this.findByEmail(input.email);
    if (existing) {
      throw new Error(`Employee with email ${input.email} already exists`);
    }

    const result = await query(
      `INSERT INTO employees (full_name, email, title, department, status, manager, start_date, phone, location)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id, full_name as "fullName", email, title, department, status,
                 manager, start_date as "startDate", phone, location,
                 created_at as "createdAt", updated_at as "updatedAt"`,
      [
        input.fullName,
        input.email,
        input.title,
        input.department,
        input.status || 'active',
        input.manager || null,
        input.startDate,
        input.phone || null,
        input.location || null,
      ]
    );
    return result.rows[0] as Employee;
  }

  /**
   * Update an existing employee
   */
  static async update(id: string, input: UpdateEmployeeInput): Promise<Employee> {
    const employee = await this.findById(id);
    if (!employee) {
      throw new Error(`Employee with id ${id} not found`);
    }

    // If email is being updated, check for duplicates
    if (input.email && input.email !== employee.email) {
      const existing = await this.findByEmail(input.email);
      if (existing) {
        throw new Error(`Employee with email ${input.email} already exists`);
      }
    }

    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (input.fullName !== undefined) {
      updates.push(`full_name = $${paramIndex}`);
      values.push(input.fullName);
      paramIndex++;
    }
    if (input.email !== undefined) {
      updates.push(`email = $${paramIndex}`);
      values.push(input.email);
      paramIndex++;
    }
    if (input.title !== undefined) {
      updates.push(`title = $${paramIndex}`);
      values.push(input.title);
      paramIndex++;
    }
    if (input.department !== undefined) {
      updates.push(`department = $${paramIndex}`);
      values.push(input.department);
      paramIndex++;
    }
    if (input.status !== undefined) {
      updates.push(`status = $${paramIndex}`);
      values.push(input.status);
      paramIndex++;
    }
    if (input.manager !== undefined) {
      updates.push(`manager = $${paramIndex}`);
      values.push(input.manager);
      paramIndex++;
    }
    if (input.startDate !== undefined) {
      updates.push(`start_date = $${paramIndex}`);
      values.push(input.startDate);
      paramIndex++;
    }
    if (input.phone !== undefined) {
      updates.push(`phone = $${paramIndex}`);
      values.push(input.phone);
      paramIndex++;
    }
    if (input.location !== undefined) {
      updates.push(`location = $${paramIndex}`);
      values.push(input.location);
      paramIndex++;
    }

    if (updates.length === 0) {
      return employee;
    }

    values.push(id);
    const result = await query(
      `UPDATE employees
       SET ${updates.join(', ')}
       WHERE id = $${paramIndex}
       RETURNING id, full_name as "fullName", email, title, department, status,
                 manager, start_date as "startDate", phone, location,
                 created_at as "createdAt", updated_at as "updatedAt"`,
      values
    );
    return result.rows[0] as Employee;
  }

  /**
   * Delete an employee by ID
   */
  static async delete(id: string): Promise<boolean> {
    const result = await query('DELETE FROM employees WHERE id = $1 RETURNING id', [id]);
    return result.rowCount !== null && result.rowCount > 0;
  }
}
