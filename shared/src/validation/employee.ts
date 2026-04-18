/**
 * Zod validation schemas for Employee domain
 * Used for runtime validation on backend and client-side validation on frontend
 */

import { z } from 'zod';

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Validation for employee status enum
 */
export const employeeStatusSchema = z
  .enum(['active', 'inactive', 'on_leave', 'terminated'])
  .default('active');

/**
 * Validation for a single employee record (read-only response)
 */
export const employeeSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(1, 'Full name is required').max(255),
  email: z.string().email('Invalid email address').max(255),
  title: z.string().min(1, 'Job title is required').max(255),
  department: z.string().min(1, 'Department is required').max(255),
  status: employeeStatusSchema,
  manager: z.string().max(255).nullable(),
  startDate: z
    .string()
    .regex(dateRegex, 'Start date must be in YYYY-MM-DD format')
    .refine((date) => new Date(date) <= new Date(), 'Start date cannot be in the future'),
  phone: z.string().max(20).nullable(),
  location: z.string().max(255).nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

/**
 * Validation for creating a new employee
 */
export const createEmployeeSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(255),
  email: z.string().email('Invalid email address').max(255),
  title: z.string().min(1, 'Job title is required').max(255),
  department: z.string().min(1, 'Department is required').max(255),
  status: employeeStatusSchema.optional(),
  manager: z.string().max(255).nullable().optional(),
  startDate: z
    .string()
    .regex(dateRegex, 'Start date must be in YYYY-MM-DD format')
    .refine((date) => new Date(date) <= new Date(), 'Start date cannot be in the future'),
  phone: z.string().max(20).nullable().optional(),
  location: z.string().max(255).nullable().optional(),
});

/**
 * Validation for updating an existing employee
 */
export const updateEmployeeSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(255).optional(),
  email: z.string().email('Invalid email address').max(255).optional(),
  title: z.string().min(1, 'Job title is required').max(255).optional(),
  department: z.string().min(1, 'Department is required').max(255).optional(),
  status: employeeStatusSchema.optional(),
  manager: z.string().max(255).nullable().optional(),
  startDate: z
    .string()
    .regex(dateRegex, 'Start date must be in YYYY-MM-DD format')
    .refine((date) => new Date(date) <= new Date(), 'Start date cannot be in the future')
    .optional(),
  phone: z.string().max(20).nullable().optional(),
  location: z.string().max(255).nullable().optional(),
});

/**
 * Validation for employee list query parameters
 */
export const employeeListQuerySchema = z.object({
  search: z.string().optional(),
  department: z.string().optional(),
  status: employeeStatusSchema.optional(),
  limit: z.number().int().positive().max(100).optional().default(20),
  offset: z.number().int().nonnegative().optional().default(0),
});

// Export types inferred from schemas for use throughout the application
export type Employee = z.infer<typeof employeeSchema>;
export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
export type EmployeeListQuery = z.infer<typeof employeeListQuerySchema>;
export type EmployeeStatus = z.infer<typeof employeeStatusSchema>;
