/**
 * Main app component
 */

import { CssBaseline, ThemeProvider, createTheme, Box } from '@mui/material';
import { EmployeeListPage } from './pages/EmployeeList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
        <EmployeeListPage />
      </Box>
    </ThemeProvider>
  );
}

export default App;
