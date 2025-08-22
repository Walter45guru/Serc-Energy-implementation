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
  Dashboard,
  ElectricBolt,
  LocalGasStation,
  WaterDrop,
  Assessment,
  Settings,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

const drawerWidth = 320;

const menuItems = [
  { text: 'Overview', icon: Dashboard, path: '/' },
  { text: 'Electricity', icon: ElectricBolt, path: '/electricity' },
  { text: 'Fuel', icon: LocalGasStation, path: '/fuel' },
  { text: 'Water', icon: WaterDrop, path: '/water' },
  { text: 'Reports', icon: Assessment, path: '/reports' },
  { text: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
    if (window.innerWidth < 768) {
      // onClose(); // This line was removed from the original file, so it's removed here.
    }
  };

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
        },
      }}
    >
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Box sx={{ mb: 3 }}>
          <Image
            src="/strathmore-logo.png"
            alt="Strathmore University"
            width={200}
            height={200}
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'white' }}>
          Energy Dashboard
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
          Strathmore University
        </Typography>
      </Box>
      
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
      
      <List sx={{ px: 2, pt: 2 }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  backgroundColor: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>
                  <Icon />
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ 
                    '& .MuiTypography-root': { 
                      fontWeight: isActive ? 600 : 400,
                      color: 'white',
                    } 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}


