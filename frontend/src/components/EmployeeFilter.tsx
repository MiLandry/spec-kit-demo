/**
 * EmployeeFilter component
 * Search and department filter controls for employee list.
 */

import { Box, TextField, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

interface EmployeeFilterProps {
  search: string;
  department: string;
  onSearchChange: (value: string) => void;
  onDepartmentChange: (value: string) => void;
  onClear: () => void;
}

export const EmployeeFilter: React.FC<EmployeeFilterProps> = ({
  search,
  department,
  onSearchChange,
  onDepartmentChange,
  onClear,
}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3, alignItems: 'flex-end' }}>
      <TextField
        label="Search by name"
        variant="outlined"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        sx={{ minWidth: 260 }}
      />

      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>Department</InputLabel>
        <Select
          label="Department"
          value={department}
          onChange={(event) => onDepartmentChange(event.target.value)}
        >
          <MenuItem value="">All departments</MenuItem>
          <MenuItem value="Engineering">Engineering</MenuItem>
          <MenuItem value="Design">Design</MenuItem>
          <MenuItem value="Marketing">Marketing</MenuItem>
          <MenuItem value="Operations">Operations</MenuItem>
          <MenuItem value="Sales">Sales</MenuItem>
          <MenuItem value="HR">HR</MenuItem>
        </Select>
      </FormControl>

      <Button variant="outlined" onClick={onClear}>
        Clear
      </Button>
    </Box>
  );
};

export default EmployeeFilter;
