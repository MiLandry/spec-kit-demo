/**
 * EmployeeForm component
 * Form for creating and editing employee records
 */

import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
} from '@mui/material';
import type { CreateEmployeeInput, UpdateEmployeeInput } from '@employee-system/shared';

interface EmployeeFormProps {
  initialValues?: any;
  isLoading?: boolean;
  error?: string;
  onSubmit: (data: CreateEmployeeInput | UpdateEmployeeInput) => Promise<void>;
}

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialValues,
  isLoading = false,
  error,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<any>(
    initialValues || {
      fullName: '',
      email: '',
      title: '',
      department: '',
      startDate: new Date().toISOString().split('T')[0],
      status: 'active',
      manager: null,
      phone: null,
      location: null,
    }
  );
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value === '' ? null : value,
    }));
    // Clear error for this field when user starts editing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit(formData);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            error={!!validationErrors.fullName}
            helperText={validationErrors.fullName}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={!!validationErrors.title}
            helperText={validationErrors.title}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            error={!!validationErrors.department}
            helperText={validationErrors.department}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Start Date"
            name="startDate"
            type="date"
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formData.status || 'active'}
              onChange={handleChange as any}
              label="Status"
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
              <MenuItem value="on_leave">On Leave</MenuItem>
              <MenuItem value="terminated">Terminated</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Manager"
            name="manager"
            value={formData.manager || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Phone"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Location"
            name="location"
            value={formData.location || ''}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading || submitting}
            sx={{ mr: 2 }}
          >
            {submitting || isLoading ? <CircularProgress size={24} /> : 'Save Employee'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeForm;
