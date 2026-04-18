import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
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

describe('EmployeeSearch and filter', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (employeeApi.listEmployees as jest.Mock).mockResolvedValue(mockEmployees);
  });

  const renderWithRouter = () => render(
    <MemoryRouter>
      <EmployeeListPage />
    </MemoryRouter>
  );

  it('calls API with search parameters when the search field changes', async () => {
    renderWithRouter();

    await waitFor(() => expect(employeeApi.listEmployees).toHaveBeenCalledTimes(1));

    const searchField = screen.getByLabelText(/Search by name/i);
    await userEvent.type(searchField, 'Jane');

    await waitFor(() => expect(employeeApi.listEmployees).toHaveBeenLastCalledWith({ search: 'Jane', department: '' }));
  });

  it('calls API with department parameter when department is selected', async () => {
    renderWithRouter();

    await waitFor(() => expect(employeeApi.listEmployees).toHaveBeenCalledTimes(1));

    const departmentField = screen.getByRole('combobox');
    await userEvent.click(departmentField);
    await userEvent.click(screen.getByRole('option', { name: 'Engineering' }));

    await waitFor(() => expect(employeeApi.listEmployees).toHaveBeenLastCalledWith({ search: '', department: 'Engineering' }));
  });
});
