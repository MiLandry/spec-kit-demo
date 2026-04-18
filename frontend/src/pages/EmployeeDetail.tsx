/**
 * EmployeeDetailPage component
 * Shows detailed employee data and actions.
 */

import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Divider,
  Button,
  Chip,
} from '@mui/material';
import { employeeApi } from '../services/api';
import type { Employee } from '@employee-system/shared';

export const EmployeeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadEmployee = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await employeeApi.getEmployee(id);
        setEmployee(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load employee');
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!employee) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="info">Employee not found.</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">Employee Details</Typography>
        <Button component={RouterLink} to="/" variant="outlined">
          Back to list
        </Button>
      </Box>

      <Paper sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h5">{employee.fullName}</Typography>
          <Chip label={employee.status} color={employee.status === 'active' ? 'success' : 'default'} />
        </Box>
        <Divider sx={{ mb: 3 }} />

        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Profile
        </Typography>
        <Typography>
          <strong>Email:</strong> {employee.email}
        </Typography>
        <Typography>
          <strong>Title:</strong> {employee.title}
        </Typography>
        <Typography>
          <strong>Department:</strong> {employee.department}
        </Typography>
        <Typography>
          <strong>Manager:</strong> {employee.manager ?? 'N/A'}
        </Typography>
        <Typography>
          <strong>Start Date:</strong> {employee.startDate}
        </Typography>
        <Typography>
          <strong>Phone:</strong> {employee.phone ?? 'N/A'}
        </Typography>
        <Typography>
          <strong>Location:</strong> {employee.location ?? 'N/A'}
        </Typography>
      </Paper>
    </Box>
  );
};

export default EmployeeDetailPage;
