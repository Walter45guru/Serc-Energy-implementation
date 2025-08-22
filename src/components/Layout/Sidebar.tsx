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
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';

const drawerWidth = 280;

const menuItems = [
  { text: 'Overview', icon: DashboardIcon, path: '/' },
  { text: 'Electricity', icon: ElectricityIcon, path: '/electricity' },
  { text: 'Water', icon: WaterIcon, path: '/water' },
  { text: 'Fuel', icon: FuelIcon, path: '/fuel' },
  { text: 'Carbon Footprint', icon: CarbonIcon, path: '/carbon' },
  { text: 'Reports', icon: ReportsIcon, path: '/reports' },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path);
    if (window.innerWidth < 768) {
      onClose();
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
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Box sx={{ mb: 2 }}>
          <Image
            src="/strathmore-logo.png"
            alt="Strathmore University"
            width={120}
            height={120}
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


