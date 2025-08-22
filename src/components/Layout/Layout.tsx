import React from 'react';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@/theme/theme';
import Sidebar from './Sidebar';

const drawerWidth = 280;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar open={true} onClose={() => {}} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: 'background.default',
            minHeight: '100vh',
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}


