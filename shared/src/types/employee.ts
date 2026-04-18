/**
 * Shared Employee domain types
 * Used across backend services and frontend components
 */

export type EmployeeStatus = 'active' | 'inactive' | 'on_leave' | 'terminated';

export interface Employee {
  id: string;
  fullName: string;
  email: string;
  title: string;
  department: string;
  status: EmployeeStatus;
  manager: string | null;
  startDate: string; // ISO date string
  phone: string | null;
  location: string | null;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface CreateEmployeeInput {
  fullName: string;
  email: string;
  title: string;
  department: string;
  status?: EmployeeStatus;
  manager?: string | null;
  startDate: string;
  phone?: string | null;
  location?: string | null;
}

export interface UpdateEmployeeInput {
  fullName?: string;
  email?: string;
  title?: string;
  department?: string;
  status?: EmployeeStatus;
  manager?: string | null;
  startDate?: string;
  phone?: string | null;
  location?: string | null;
}

export interface EmployeeListQuery {
  search?: string;
  department?: string;
  status?: EmployeeStatus;
  limit?: number;
  offset?: number;
}
