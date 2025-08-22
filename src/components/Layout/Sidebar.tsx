'use client';

import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  ElectricBolt as ElectricityIcon,
  WaterDrop as WaterIcon,
  LocalGasStation as FuelIcon,
  Nature as CarbonIcon,
  Assessment as ReportsIcon,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const drawerWidth = 280;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon />, path: '/' },
    { text: 'Electricity', icon: <ElectricityIcon />, path: '/electricity' },
    { text: 'Water', icon: <WaterIcon />, path: '/water' },
    { text: 'Fuel', icon: <FuelIcon />, path: '/fuel' },
    { text: 'Carbon Footprint', icon: <CarbonIcon />, path: '/carbon' },
    { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'primary.main',
          color: 'white',
          border: 'none',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Box
          component="img"
          src="/strathmore-logo.png"
          alt="Strathmore University Logo"
          sx={{
            width: '80px',
            height: 'auto',
            mb: 2,
          }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
          Energy Dashboard
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.8 }}>
          Strathmore University
        </Typography>
      </Box>
      
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)', mx: 2 }} />
      
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={Link}
              href={item.path}
              sx={{
                mx: 1,
                borderRadius: 2,
                mb: 0.5,
                backgroundColor: pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                sx={{ 
                  '& .MuiTypography-root': { 
                    fontWeight: pathname === item.path ? 600 : 400 
                  } 
                }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}


