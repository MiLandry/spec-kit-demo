/**
 * EmployeeListPage component
 * Main page for viewing and managing employee list
 */

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import type { Employee, CreateEmployeeInput, UpdateEmployeeInput } from '@employee-system/shared';
import { employeeApi } from '../services/api';
import { EmployeeForm } from '../components/EmployeeForm';

export const EmployeeListPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Load employees on mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await employeeApi.listEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (employee?: Employee) => {
    setEditingEmployee(employee || null);
    setFormError(null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingEmployee(null);
    setFormError(null);
  };

  const handleFormSubmit = async (data: CreateEmployeeInput | UpdateEmployeeInput) => {
    try {
      setFormError(null);
      if (editingEmployee) {
        await employeeApi.updateEmployee(editingEmployee.id, data);
      } else {
        await employeeApi.createEmployee(data as CreateEmployeeInput);
      }
      await fetchEmployees();
      handleCloseDialog();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Failed to save employee');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeApi.deleteEmployee(id);
        await fetchEmployees();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete employee');
      }
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, 'default' | 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'> = {
      active: 'success',
      inactive: 'default',
      on_leave: 'warning',
      terminated: 'error',
    };
    return colors[status] || 'default';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <h1>Employee Management</h1>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Employee
        </Button>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : employees.length === 0 ? (
        <Alert severity="info">No employees found. Click "Add Employee" to create one.</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id} hover>
                  <TableCell>{employee.fullName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.title}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>
                    <Chip label={employee.status} color={getStatusColor(employee.status)} size="small" />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleOpenDialog(employee)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Employee Form Dialog */}
      {(() => {
        const initialValues = editingEmployee ? (editingEmployee as any) : undefined;
        return (
          <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
            <DialogTitle>
              {editingEmployee ? `Edit Employee: ${editingEmployee.fullName}` : 'Add New Employee'}
            </DialogTitle>
            <DialogContent>
              <EmployeeForm
                initialValues={initialValues}
                error={formError}
                onSubmit={handleFormSubmit}
              />
            </DialogContent>
          </Dialog>
        );
      })()}
    </Box>
  );
};

export default EmployeeListPage;
