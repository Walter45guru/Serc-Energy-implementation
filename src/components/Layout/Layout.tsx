'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from '@/theme/theme';
import Sidebar from './Sidebar';
import { Box } from '@mui/material';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex', 
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden'
      }}>
        <Sidebar open={true} onClose={() => {}} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: '100%',
            maxWidth: '100%',
            overflow: 'auto',
            backgroundColor: 'background.default',
            minHeight: '100vh'
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}


