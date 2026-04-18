import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EmployeeListPage } from '../../src/pages/EmployeeList';
import { employeeApi } from '../../src/services/api';

type Employee = {
  id: string;
  fullName: string;
  email: string;
  title: string;
  department: string;
  status: string;
  manager: string | null;
  startDate: string;
  phone: string | null;
  location: string | null;
  createdAt: string;
  updatedAt: string;
};

jest.mock('../../src/services/api', () => ({
  employeeApi: {
    listEmployees: jest.fn(),
    createEmployee: jest.fn(),
    updateEmployee: jest.fn(),
    deleteEmployee: jest.fn(),
  },
}));

const mockEmployees: Employee[] = [
  {
    id: '1',
    fullName: 'John Doe',
    email: 'john@example.com',
    title: 'Engineer',
    department: 'Engineering',
    status: 'active',
    manager: null,
    startDate: '2020-01-01',
    phone: '555-0001',
    location: 'Remote',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

describe('EmployeeListPage', () => {
  beforeEach(() => {
    (employeeApi.listEmployees as jest.Mock).mockResolvedValue(mockEmployees);
    (employeeApi.deleteEmployee as jest.Mock).mockResolvedValue(undefined);
    jest.clearAllMocks();
  });

  it('renders employee list and add button', async () => {
    render(<EmployeeListPage />);

    expect(await screen.findByText('Employee Management')).toBeInTheDocument();
    expect(await screen.findByText('John Doe')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add Employee/i })).toBeInTheDocument();
  });

  it('opens the add employee dialog when clicking Add Employee', async () => {
    render(<EmployeeListPage />);

    await waitFor(() => expect(employeeApi.listEmployees).toHaveBeenCalled());

    await userEvent.click(screen.getByRole('button', { name: /Add Employee/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
  });

  it('deletes an employee when Delete is clicked', async () => {
    window.confirm = jest.fn().mockReturnValue(true);
    render(<EmployeeListPage />);

    await waitFor(() => expect(employeeApi.listEmployees).toHaveBeenCalled());
    await userEvent.click(screen.getByRole('button', { name: /Delete/i }));

    await waitFor(() => expect(employeeApi.deleteEmployee).toHaveBeenCalledWith('1'));
  });
});
