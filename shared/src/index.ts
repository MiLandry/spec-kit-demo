/**
 * Entry point for @employee-system/shared package
 */

// Export types
export * from './types';

// Export validation schemas (without duplicate types)
export {
  employeeStatusSchema,
  employeeSchema,
  createEmployeeSchema,
  updateEmployeeSchema,
  employeeListQuerySchema,
} from './validation/employee';
