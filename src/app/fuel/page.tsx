'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Gauge from '../../components/Gauge';
import {
  LocalGasStation,
  TrendingUp,
  TrendingDown,
  Speed,
  AttachMoney,
} from '@mui/icons-material';
import Layout from '@/components/Layout/Layout';

// Mock fuel data - replace with actual data from your Excel files
const fuelSummary = [
  {
    title: 'Total Consumption',
    value: '2,450 L',
    change: '+5.7%',
    trend: 'up',
    icon: LocalGasStation,
    color: '#f59e0b',
  },
  {
    title: 'Total Cost',
    value: 'KES 490,000',
    change: '+8.2%',
    trend: 'up',
    icon: AttachMoney,
    color: '#dc2626',
  },
  {
    title: 'Total Distance',
    value: '24,500 km',
    change: '+3.1%',
    trend: 'up',
    icon: Speed,
    color: '#10b981',
  },
  {
    title: 'Avg Efficiency',
    value: '10.0 km/L',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp,
    color: '#3b82f6',
  },
];

const monthlyData = [
  { month: 'Jan', consumption: 95, cost: 19000, distance: 920, efficiency: 9.7 },
  { month: 'Feb', consumption: 88, cost: 17600, distance: 850, efficiency: 9.7 },
  { month: 'Mar', consumption: 102, cost: 20400, distance: 990, efficiency: 9.7 },
  { month: 'Apr', consumption: 96, cost: 19200, distance: 930, efficiency: 9.7 },
  { month: 'May', consumption: 110, cost: 22000, distance: 1070, efficiency: 9.7 },
  { month: 'Jun', consumption: 118, cost: 23600, distance: 1145, efficiency: 9.7 },
];

// Updated vehicle fleet data based on the provided table
const vehicleData = [
  {
    vehicle: 'ISUZU MV118',
    make: 'ISUZU',
    model: 'MV118',
    type: 'BUS',
    registration: 'KAC 328E',
    passengers: 62,
    fuelType: 'Diesel',
    consumption: 280,
    cost: 56000,
    distance: 2800,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'ISUZU MV118',
    make: 'ISUZU',
    model: 'MV118',
    type: 'BUS',
    registration: 'KAC 354E',
    passengers: 62,
    fuelType: 'Diesel',
    consumption: 275,
    cost: 55000,
    distance: 2750,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'ISUZU FRR',
    make: 'ISUZU',
    model: 'FRR',
    type: 'BUS',
    registration: 'KBD 129P',
    passengers: 51,
    fuelType: 'Diesel',
    consumption: 220,
    cost: 44000,
    distance: 2200,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'ISUZU FRR',
    make: 'ISUZU',
    model: 'FRR',
    type: 'BUS',
    registration: 'KBD 130P',
    passengers: 51,
    fuelType: 'Diesel',
    consumption: 225,
    cost: 45000,
    distance: 2250,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'ISUZU FRR',
    make: 'ISUZU',
    model: 'FRR',
    type: 'BUS',
    registration: 'KBK 734Q',
    passengers: 51,
    fuelType: 'Diesel',
    consumption: 230,
    cost: 46000,
    distance: 2300,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'TOYOTA HILUX',
    make: 'TOYOTA',
    model: 'HILUX',
    type: 'PICK-UP',
    registration: 'KBR 449P',
    passengers: 4,
    fuelType: 'Petrol',
    consumption: 120,
    cost: 24000,
    distance: 1200,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'TOYOTA HILUX',
    make: 'TOYOTA',
    model: 'HILUX',
    type: 'DOUBLE-CAB',
    registration: 'KBW 306M',
    passengers: 4,
    fuelType: 'Petrol',
    consumption: 125,
    cost: 25000,
    distance: 1250,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'TOYOTA FIELDER',
    make: 'TOYOTA',
    model: 'FIELDER',
    type: 'STATION WAGON',
    registration: 'KBW 334B',
    passengers: 4,
    fuelType: 'Petrol',
    consumption: 95,
    cost: 19000,
    distance: 950,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'TOYOTA FIELDER',
    make: 'TOYOTA',
    model: 'FIELDER',
    type: 'STATION WAGON',
    registration: 'KCA 330Z',
    passengers: 4,
    fuelType: 'Petrol',
    consumption: 90,
    cost: 18000,
    distance: 900,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'TOYOTA FIELDER',
    make: 'TOYOTA',
    model: 'FIELDER',
    type: 'STATION WAGON',
    registration: 'KCK 806Z',
    passengers: 4,
    fuelType: 'Petrol',
    consumption: 92,
    cost: 18400,
    distance: 920,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'TOYOTA HIACE',
    make: 'TOYOTA',
    model: 'HIACE',
    type: 'VAN',
    registration: 'KCV 353L',
    passengers: 10,
    fuelType: 'Diesel',
    consumption: 180,
    cost: 36000,
    distance: 1800,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'TOYOTA HIACE',
    make: 'TOYOTA',
    model: 'HIACE',
    type: 'VAN',
    registration: 'KCV 355E',
    passengers: 10,
    fuelType: 'Diesel',
    consumption: 185,
    cost: 37000,
    distance: 1850,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'SUBARU FORESTER',
    make: 'SUBARU',
    model: 'FORESTER',
    type: 'MID-SUV',
    registration: 'KDB 063U',
    passengers: 4,
    fuelType: 'Petrol',
    consumption: 110,
    cost: 22000,
    distance: 1100,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'NISSAN XTRAIL',
    make: 'NISSAN',
    model: 'XTRAIL',
    type: 'MID-SUV',
    registration: 'KDE 903R',
    passengers: 4,
    fuelType: 'Petrol',
    consumption: 105,
    cost: 21000,
    distance: 1050,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'ISUZU MV128',
    make: 'ISUZU',
    model: 'MV128',
    type: 'BUS',
    registration: 'KDH 268N',
    passengers: 67,
    fuelType: 'Diesel',
    consumption: 300,
    cost: 60000,
    distance: 3000,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'TOYOTA RAV4',
    make: 'TOYOTA',
    model: 'RAV4',
    type: 'MID-SUV',
    registration: 'KDN 295D',
    passengers: 4,
    fuelType: 'Petrol',
    consumption: 100,
    cost: 20000,
    distance: 1000,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'TOYOTA FORTUNER',
    make: 'TOYOTA',
    model: 'FORTUNER',
    type: 'SUV',
    registration: 'KDS 033Q',
    passengers: 4,
    fuelType: 'Diesel',
    consumption: 140,
    cost: 28000,
    distance: 1400,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
  },
  {
    vehicle: 'Diesel Generator',
    make: 'Generator',
    model: 'Diesel',
    type: 'CAT',
    registration: 'N/A',
    passengers: 'N/A',
    fuelType: 'Diesel',
    consumption: 150,
    cost: 30000,
    distance: 'N/A',
    efficiency: 'N/A',
    costPerKm: 'N/A',
    status: 'Standby',
  },
];

// Generator fuel consumption data
const generatorFuelData = {
  monthlyConsumption: 150,
  monthlyCost: 30000,
  fuelType: 'Diesel',
  fuelLevel: 85,
  lastRefill: '2024-01-10',
  nextRefill: '2024-01-25',
  efficiency: '2.5 L/hour',
  runtime: '60 hours/month',
  status: 'Standby',
  maintenance: 'Due in 15 days',
};

// Updated fuel type breakdown
const fuelTypeBreakdown = [
  { name: 'Diesel (Vehicles)', value: 1580, color: '#f59e0b' },
  { name: 'Petrol (Vehicles)', value: 720, color: '#dc2626' },
  { name: 'Diesel (Generator)', value: 150, color: '#8b5cf6' },
];

const efficiencyTrends = [
  { month: 'Jan', avgEfficiency: 9.5, targetEfficiency: 10.0 },
  { month: 'Feb', avgEfficiency: 9.6, targetEfficiency: 10.0 },
  { month: 'Mar', avgEfficiency: 9.7, targetEfficiency: 10.0 },
  { month: 'Apr', avgEfficiency: 9.7, targetEfficiency: 10.0 },
  { month: 'May', avgEfficiency: 9.7, targetEfficiency: 10.0 },
  { month: 'Jun', avgEfficiency: 9.7, targetEfficiency: 10.0 },
];

export default function FuelPage() {
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedMonth, setSelectedMonth] = useState('Jun');

  // Monthly generator data for interactive demonstration
  const monthlyGeneratorData = {
    'Jan': { fuelLevel: 95, consumption: 140, status: 'Standby', oilPressure: 65, temperature: 45 },
    'Feb': { fuelLevel: 88, consumption: 135, status: 'Standby', oilPressure: 62, temperature: 48 },
    'Mar': { fuelLevel: 82, consumption: 150, status: 'Running', oilPressure: 58, temperature: 72 },
    'Apr': { fuelLevel: 75, consumption: 145, status: 'Standby', oilPressure: 55, temperature: 52 },
    'May': { fuelLevel: 68, consumption: 160, status: 'Running', oilPressure: 52, temperature: 78 },
    'Jun': { fuelLevel: 85, consumption: 150, status: 'Standby', oilPressure: 60, temperature: 50 }
  };

  const currentGeneratorData = monthlyGeneratorData[selectedMonth as keyof typeof monthlyGeneratorData];

  return (
    <Layout>
      <Container 
        maxWidth={false} 
        sx={{ 
          py: { xs: 2, sm: 3, md: 4 }, 
          px: { xs: 1, sm: 2, md: 3 },
          maxWidth: '100%',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700, 
              color: 'text.primary', 
              mb: 1,
              fontSize: { xs: '1.5rem', sm: '2rem', md: '3rem' }
            }}
          >
            Fuel Dashboard
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: 'text.secondary',
              fontSize: { xs: '0.875rem', sm: '1rem' }
            }}
          >
            Monitor fuel consumption, vehicle efficiency, and cost analysis across the fleet
          </Typography>
        </Box>

        {/* Navigation Buttons */}
        <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Button
              variant={selectedView === 'overview' ? 'contained' : 'outlined'}
              onClick={() => setSelectedView('overview')}
              sx={{ borderRadius: 2 }}
            >
              Overview
            </Button>
            <Button
              variant={selectedView === 'monthly' ? 'contained' : 'outlined'}
              onClick={() => setSelectedView('monthly')}
              sx={{ borderRadius: 2 }}
            >
              Monthly Trends
            </Button>
            <Button
              variant={selectedView === 'fuelType' ? 'contained' : 'outlined'}
              onClick={() => setSelectedView('fuelType')}
              sx={{ borderRadius: 2 }}
            >
              Fuel Type Distribution
            </Button>
            <Button
              variant={selectedView === 'efficiency' ? 'contained' : 'outlined'}
              onClick={() => setSelectedView('efficiency')}
              sx={{ borderRadius: 2 }}
            >
              Efficiency Trends
            </Button>
            <Button
              variant={selectedView === 'generator' ? 'contained' : 'outlined'}
              onClick={() => setSelectedView('generator')}
              sx={{ borderRadius: 2 }}
            >
              Generator Monitoring
            </Button>
            <Button
              variant={selectedView === 'fleet' ? 'contained' : 'outlined'}
              onClick={() => setSelectedView('fleet')}
              sx={{ borderRadius: 2 }}
            >
              Vehicle Fleet
            </Button>
            <Button
              variant={selectedView === 'diesel' ? 'contained' : 'outlined'}
              onClick={() => setSelectedView('diesel')}
              sx={{ borderRadius: 2 }}
            >
              Diesel Vehicles
            </Button>
            <Button
              variant={selectedView === 'petrol' ? 'contained' : 'outlined'}
              onClick={() => setSelectedView('petrol')}
              sx={{ borderRadius: 2 }}
            >
              Petrol Vehicles
            </Button>
          </Box>
        </Box>

        {selectedView === 'overview' && (
          <>
        {/* Summary Cards */}
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: { xs: 1, sm: 2, md: 3 }, 
              mb: { xs: 2, sm: 3, md: 4 } 
            }}>
          {fuelSummary.map((item) => {
            const Icon = item.icon;
            return (
                  <Box key={item.title} sx={{ 
                    flex: '1 1 200px', 
                    minWidth: { xs: '150px', sm: '200px' }, 
                    maxWidth: { xs: '100%', sm: '300px' } 
                  }}>
                <Card sx={{ height: '100%' }}>
                      <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: `${item.color}20`,
                          borderRadius: 2,
                              p: { xs: 0.5, sm: 1 },
                              mr: { xs: 1, sm: 2 },
                        }}
                      >
                            <Icon sx={{ color: item.color, fontSize: { xs: 20, sm: 24 } }} />
                      </Box>
                      <Box>
                            <Typography 
                              variant="h5" 
                              sx={{ 
                                fontWeight: 700, 
                                color: 'text.primary',
                                fontSize: { xs: '1.25rem', sm: '1.5rem' }
                              }}
                            >
                          {item.value}
                        </Typography>
                            <Typography 
                              variant="body2" 
                              sx={{ 
                                color: 'text.secondary',
                                fontSize: { xs: '0.75rem', sm: '0.875rem' }
                              }}
                            >
                          {item.title}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {item.trend === 'up' ? (
                            <TrendingUp sx={{ color: 'success.main', fontSize: { xs: 12, sm: 14 }, mr: 0.5 }} />
                      ) : (
                            <TrendingDown sx={{ color: 'error.main', fontSize: { xs: 12, sm: 14 }, mr: 0.5 }} />
                      )}
                      <Typography
                        variant="body2"
                        sx={{
                          color: item.trend === 'up' ? 'success.main' : 'error.main',
                          fontWeight: 600,
                              fontSize: { xs: '0.75rem', sm: '0.875rem' }
                        }}
                      >
                        {item.change} from last month
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
                  </Box>
            );
          })}
            </Box>

        {/* Charts Row 1 */}
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: { xs: 1, sm: 2, md: 3 }, 
              mb: { xs: 2, sm: 3, md: 4 } 
            }}>
          {/* Monthly Trends */}
              <Box sx={{ 
                flex: '2 1 500px', 
                minWidth: { xs: '280px', sm: '300px' },
                maxWidth: '100%'
              }}>
            <Card>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Monthly Fuel Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="consumption"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      name="Consumption (L)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="cost"
                      stroke="#dc2626"
                      strokeWidth={3}
                      name="Cost (KES)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
              </Box>

          {/* Fuel Type Breakdown */}
              <Box sx={{ 
                flex: '1 1 250px', 
                minWidth: { xs: '250px', sm: '280px' },
                maxWidth: '100%'
              }}>
            <Card>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Fuel Type Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={fuelTypeBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                          label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                          outerRadius={70}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {fuelTypeBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
              </Box>
            </Box>

        {/* Charts Row 2 */}
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: { xs: 1, sm: 2, md: 3 }, 
              mb: { xs: 2, sm: 3, md: 4 } 
            }}>
          {/* Efficiency Trends */}
              <Box sx={{ 
                flex: '1 1 350px', 
                minWidth: { xs: '280px', sm: '300px' },
                maxWidth: '100%'
              }}>
            <Card>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Efficiency Trends vs Target
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={efficiencyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="avgEfficiency"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Average Efficiency (km/L)"
                    />
                    <Line
                      type="monotone"
                      dataKey="targetEfficiency"
                      stroke="#dc2626"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="Target Efficiency (km/L)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
              </Box>

              {/* Generator Monitoring */}
              <Box sx={{ 
                flex: '1 1 350px', 
                minWidth: { xs: '280px', sm: '300px' },
                maxWidth: '100%'
              }}>
            <Card>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Generator Fuel Monitoring
                </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
                      <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#8b5cf6' }}>
                          {generatorFuelData.monthlyConsumption}L
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Monthly Consumption
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#dc2626' }}>
                          {generatorFuelData.fuelLevel}%
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Fuel Level
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ '& > *': { mb: 1 } }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Status:</Typography>
                        <Chip
                          label={generatorFuelData.status}
                          size="small"
                          color={generatorFuelData.status === 'Running' ? 'error' : 'success'}
                          variant="outlined"
                        />
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Efficiency:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {generatorFuelData.efficiency}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Runtime:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {generatorFuelData.runtime}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Next Refill:</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 600 }}>
                          {generatorFuelData.nextRefill}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mt: 2, p: 2, backgroundColor: 'warning.50', borderRadius: 1 }}>
                      <Typography variant="caption" sx={{ color: 'warning.main', fontWeight: 600 }}>
                        ⚠️ {generatorFuelData.maintenance}
                      </Typography>
                    </Box>
              </CardContent>
            </Card>
              </Box>
            </Box>

        {/* Vehicle Details Table */}
            <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
            <Card>
                <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Vehicle Fleet Fuel Consumption & Efficiency
                </Typography>
                  <Box sx={{ overflowX: 'auto' }}>
                    <TableContainer 
                      component={Paper} 
                      sx={{ 
                        boxShadow: 'none',
                        '& .MuiTable-root': {
                          minWidth: { xs: '800px', sm: 'auto' }
                        }
                      }}
                    >
                  <Table>
                    <TableHead>
                      <TableRow>
                            <TableCell sx={{ fontWeight: 600 }}>Make & Model</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>Registration</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600 }}>Passengers</TableCell>
                            <TableCell align="center" sx={{ fontWeight: 600 }}>Fuel Type</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Consumption (L)</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Cost (KES)</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Distance (km)</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Efficiency (km/L)</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {vehicleData.map((row) => (
                            <TableRow key={row.registration || row.vehicle}>
                          <TableCell component="th" scope="row">
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {row.make} {row.model}
                            </Typography>
                          </TableCell>
                              <TableCell>
                                <Chip
                                  label={row.type}
                                  size="small"
                                  color="primary"
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                  {row.registration}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Typography variant="body2">
                                  {row.passengers}
                                </Typography>
                              </TableCell>
                              <TableCell align="center">
                                <Chip
                                  label={row.fuelType}
                                  size="small"
                                  color={row.fuelType === 'Diesel' ? 'warning' : 'error'}
                                  variant="outlined"
                                />
                              </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              {row.consumption.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              {row.cost.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                                  {row.distance === 'N/A' ? 'N/A' : row.distance.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                  {row.efficiency === 'N/A' ? 'N/A' : row.efficiency}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={row.status}
                              size="small"
                              color={row.status === 'Active' ? 'success' : 'warning'}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                  </Box>
              </CardContent>
            </Card>
            </Box>

        {/* Insights & Recommendations */}
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: { xs: 1, sm: 2, md: 3 } 
            }}>
              <Box sx={{ 
                flex: '1 1 300px', 
                minWidth: { xs: '250px', sm: '280px' },
                maxWidth: '100%'
              }}>
            <Card>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  🎯 Key Insights
                </Typography>
                <Box sx={{ '& > *': { mb: 1 } }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        • Fleet consists of 18 vehicles including 1 diesel generator
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        • 5 ISUZU buses serve as the main passenger transport
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        • 8 petrol vehicles for administrative and utility purposes
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        • Generator consumes 150L/month for backup power
                  </Typography>
                </Box>
              </CardContent>
            </Card>
              </Box>

              <Box sx={{ 
                flex: '1 1 300px', 
                minWidth: { xs: '250px', sm: '280px' },
                maxWidth: '100%'
              }}>
            <Card>
                  <CardContent sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  🚀 Recommendations
                </Typography>
                <Box sx={{ '& > *': { mb: 1 } }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        • Implement IoT monitoring for real-time fuel level tracking
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        • Monitor generator fuel consumption during power outages
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        • Consider route optimization for high-consumption buses
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        • Regular maintenance scheduling for all vehicles
                  </Typography>
                </Box>
              </CardContent>
            </Card>
              </Box>
            </Box>
          </>
        )}

        {selectedView === 'monthly' && (
          <>
            {/* Monthly Consumption Bar Chart */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Monthly Fuel Consumption Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="consumption" fill="#f59e0b" name="Consumption (L)" />
                      <Bar yAxisId="right" dataKey="cost" fill="#dc2626" name="Cost (KES)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Monthly Efficiency vs Distance */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Monthly Efficiency vs Distance Covered
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="efficiency" stroke="#10b981" strokeWidth={3} name="Efficiency (km/L)" />
                      <Line yAxisId="right" type="monotone" dataKey="distance" stroke="#3b82f6" strokeWidth={3} name="Distance (km)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Monthly Cost Breakdown */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Monthly Cost Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="cost" fill="#10b981" name="Cost (KES)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>
          </>
        )}

        {selectedView === 'fuelType' && (
          <>
            {/* Fuel Type Distribution Pie Chart */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Fuel Type Distribution
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={fuelTypeBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {fuelTypeBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Fuel Type Consumption Bar Chart */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Fuel Consumption by Type
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={fuelTypeBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#f59e0b" name="Consumption (L)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Fuel Type Cost Analysis */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Fuel Cost Analysis by Type
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
                    {fuelTypeBreakdown.map((fuel) => (
                      <Box key={fuel.name} sx={{ textAlign: 'center', p: 3, backgroundColor: 'grey.50', borderRadius: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: fuel.color, mb: 1 }}>
                          {fuel.value}L
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                          {fuel.name}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'success.main' }}>
                          KES {(fuel.value * 200).toLocaleString()}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Estimated Cost
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </>
        )}

        {selectedView === 'efficiency' && (
          <>
            {/* Efficiency Trends Line Chart */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Monthly Efficiency Trends vs Target
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={efficiencyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="avgEfficiency"
                        stroke="#10b981"
                        strokeWidth={3}
                        name="Average Efficiency (km/L)"
                      />
                      <Line
                        type="monotone"
                        dataKey="targetEfficiency"
                        stroke="#dc2626"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target Efficiency (km/L)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Efficiency Performance Metrics */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Efficiency Performance Analysis
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3 }}>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'success.50', borderRadius: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'success.main', mb: 1 }}>
                        {efficiencyTrends[efficiencyTrends.length - 1]?.avgEfficiency || 0}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Current Efficiency (km/L)
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'error.50', borderRadius: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'error.main', mb: 1 }}>
                        {efficiencyTrends[efficiencyTrends.length - 1]?.targetEfficiency || 0}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Target Efficiency (km/L)
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'info.50', borderRadius: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'info.main', mb: 1 }}>
                        {((efficiencyTrends[efficiencyTrends.length - 1]?.avgEfficiency || 0) / (efficiencyTrends[efficiencyTrends.length - 1]?.targetEfficiency || 1) * 100).toFixed(1)}%
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Target Achievement
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Efficiency Improvement Chart */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Efficiency Improvement Over Time
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={efficiencyTrends}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avgEfficiency" fill="#10b981" name="Efficiency (km/L)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>
          </>
        )}

        {selectedView === 'generator' && (
          <>
            {/* Interactive Fuel Gauge Dashboard */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    🚨 Generator Fuel Monitoring - IoT Integration Required
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                    Current monitoring shows monthly snapshots only. Real-time IoT monitoring would provide instant alerts for fuel levels, 
                    oil pressure, temperature, and generator status - critical for preventing power outages.
                  </Typography>
                  
                  {/* Main Fuel Gauge */}
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    {/* Month Selector */}
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
                        Select Month to See Generator Parameters:
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
                        {Object.keys(monthlyGeneratorData).map((month) => (
                          <Button
                            key={month}
                            variant={selectedMonth === month ? 'contained' : 'outlined'}
                            size="small"
                            onClick={() => setSelectedMonth(month)}
                            sx={{ minWidth: '60px' }}
                          >
                            {month}
                          </Button>
                        ))}
                      </Box>
                    </Box>

                    {/* Generator Monitoring Gauges */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 4, mb: 4 }}>
                      <Gauge
                        value={currentGeneratorData.fuelLevel}
                        max={100}
                        label="Fuel Level"
                        unit="%"
                        zones={[
                          { min: 0, max: 30, color: '#ef4444' },   // Red - Critical
                          { min: 30, max: 60, color: '#f59e0b' },  // Orange - Warning
                          { min: 60, max: 100, color: '#22c55e' }  // Green - Safe
                        ]}
                      />
                      
                      <Gauge
                        value={currentGeneratorData.oilPressure || 45}
                        max={80}
                        label="Oil Pressure"
                        unit=" PSI"
                        zones={[
                          { min: 0, max: 20, color: '#ef4444' },   // Red - Critical
                          { min: 20, max: 35, color: '#f59e0b' },  // Orange - Warning
                          { min: 35, max: 80, color: '#22c55e' }   // Green - Safe
                        ]}
                      />
                      
                      <Gauge
                        value={currentGeneratorData.temperature || 75}
                        max={120}
                        label="Temperature"
                        unit="°C"
                        zones={[
                          { min: 0, max: 60, color: '#22c55e' },   // Green - Safe
                          { min: 60, max: 90, color: '#f59e0b' },  // Orange - Warning
                          { min: 90, max: 120, color: '#ef4444' }  // Red - Critical
                        ]}
                      />
                    </Box>
                  </Box>

                  {/* Monthly Fuel Level Trends */}
                  <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                      Monthly Fuel Level Changes (Current: Monthly Data Only)
                    </Typography>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={Object.entries(monthlyGeneratorData).map(([month, data]) => ({
                        month,
                        fuelLevel: data.fuelLevel,
                        consumption: data.consumption,
                        status: data.status
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis yAxisId="left" domain={[0, 100]} />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Line yAxisId="left" type="monotone" dataKey="fuelLevel" stroke="#3b82f6" strokeWidth={3} name="Fuel Level (%)" />
                        <Line yAxisId="right" type="monotone" dataKey="consumption" stroke="#f59e0b" strokeWidth={2} name="Consumption (L)" />
                      </LineChart>
                    </ResponsiveContainer>
                    
                    {/* Current Month Status */}
                    <Box sx={{ mt: 2, textAlign: 'center' }}>
                      <Chip
                        label={`${selectedMonth}: ${currentGeneratorData.status} | Fuel: ${currentGeneratorData.fuelLevel}% | Consumption: ${currentGeneratorData.consumption}L`}
                        color={currentGeneratorData.status === 'Running' ? 'error' : 'success'}
                        variant="outlined"
                        sx={{ fontSize: '1rem', p: 1 }}
                      />
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* IoT Monitoring Benefits */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'primary.main' }}>
                    🔌 Why IoT Monitoring is Critical
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
                    <Box sx={{ p: 3, backgroundColor: 'error.50', borderRadius: 2, border: '1px solid', borderColor: 'error.main' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'error.main', mb: 1 }}>
                        ⚠️ Current Limitations
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                        • Monthly fuel level snapshots only
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                        • No real-time alerts for low fuel
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                        • Risk of unexpected power outages
                      </Typography>
                    </Box>
                    
                    <Box sx={{ p: 3, backgroundColor: 'success.50', borderRadius: 2, border: '1px solid', borderColor: 'success.main' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'success.main', mb: 1 }}>
                        🚀 IoT Benefits
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                        • Real-time fuel level monitoring
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                        • Instant alerts for critical levels
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                        • Predictive maintenance scheduling
                      </Typography>
                    </Box>
                    
                    <Box sx={{ p: 3, backgroundColor: 'info.50', borderRadius: 2, border: '1px solid', borderColor: 'info.main' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'info.main', mb: 1 }}>
                        📊 Real-Time Parameters
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                        • Fuel level, oil pressure, temperature
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                        • Voltage, current, power output
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                        • Runtime, efficiency, maintenance alerts
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Generator Status Dashboard */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Generator Status Dashboard
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3 }}>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'purple.50', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'purple.main', mb: 1 }}>
                        {generatorFuelData.monthlyConsumption}L
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Monthly Consumption
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'blue.50', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'blue.main', mb: 1 }}>
                        {generatorFuelData.efficiency}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Efficiency
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'green.50', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'green.main', mb: 1 }}>
                        {generatorFuelData.runtime}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Runtime
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'orange.50', borderRadius: 2 }}>
                      <Typography variant="h4" sx={{ fontWeight: 700, color: 'orange.main', mb: 1 }}>
                        {generatorFuelData.nextRefill}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Next Refill
                      </Typography>
                    </Box>
                  </Box>
                  
                  {/* Status Indicators */}
                  <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    <Chip
                      label={`Status: ${generatorFuelData.status}`}
                      size="medium"
                      color={generatorFuelData.status === 'Running' ? 'error' : 'success'}
                      variant="outlined"
                      sx={{ fontSize: '1rem', p: 1 }}
                    />
                    <Chip
                      label={`Fuel Type: ${generatorFuelData.fuelType}`}
                      size="medium"
                      color="warning"
                      variant="outlined"
                      sx={{ fontSize: '1rem', p: 1 }}
                    />
                  </Box>
                  
                  {/* Maintenance Alert */}
                  <Box sx={{ mt: 3, p: 2, backgroundColor: 'warning.50', borderRadius: 2, border: '1px solid', borderColor: 'warning.main' }}>
                    <Typography variant="body1" sx={{ color: 'warning.main', fontWeight: 600, display: 'flex', alignItems: 'center' }}>
                      ⚠️ {generatorFuelData.maintenance}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </>
        )}

        {selectedView === 'fleet' && (
          <>
            {/* Vehicle Type Distribution */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Vehicle Fleet Distribution by Type
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Buses', value: 5, color: '#f59e0b' },
                          { name: 'Pick-ups', value: 3, color: '#dc2626' },
                          { name: 'Station Wagons', value: 2, color: '#10b981' },
                          { name: 'Vans', value: 2, color: '#3b82f6' },
                          { name: 'SUVs', value: 4, color: '#8b5cf6' },
                          { name: 'Generator', value: 1, color: '#ef4444' }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          { name: 'Buses', value: 5, color: '#f59e0b' },
                          { name: 'Pick-ups', value: 3, color: '#dc2626' },
                          { name: 'Station Wagons', value: 2, color: '#10b981' },
                          { name: 'Vans', value: 2, color: '#3b82f6' },
                          { name: 'SUVs', value: 4, color: '#8b5cf6' },
                          { name: 'Generator', value: 1, color: '#ef4444' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Vehicle Efficiency Comparison */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Vehicle Efficiency Comparison
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={[
                      { type: 'Buses', efficiency: 10.0, consumption: 280, cost: 56000 },
                      { type: 'Pick-ups', efficiency: 10.0, consumption: 220, cost: 44000 },
                      { type: 'Station Wagons', efficiency: 10.0, consumption: 185, cost: 37000 },
                      { type: 'Vans', efficiency: 10.0, consumption: 120, cost: 24000 },
                      { type: 'SUVs', efficiency: 10.0, consumption: 100, cost: 20000 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="efficiency" fill="#10b981" name="Efficiency (km/L)" />
                      <Bar yAxisId="right" dataKey="consumption" fill="#f59e0b" name="Consumption (L)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Fleet Cost Analysis */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Fleet Cost Analysis by Vehicle Type
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={[
                      { type: 'Buses', cost: 280000, count: 5, avgCost: 56000 },
                      { type: 'Pick-ups', cost: 132000, count: 3, avgCost: 44000 },
                      { type: 'Station Wagons', cost: 74000, count: 2, avgCost: 37000 },
                      { type: 'Vans', cost: 48000, count: 2, avgCost: 24000 },
                      { type: 'SUVs', cost: 80000, count: 4, avgCost: 20000 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="cost" fill="#dc2626" name="Total Cost (KES)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Fleet Performance Summary */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Fleet Performance Summary
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3 }}>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'blue.50', borderRadius: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'blue.main', mb: 1 }}>
                        {vehicleData.length}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Total Vehicles
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'green.50', borderRadius: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'green.main', mb: 1 }}>
                        {vehicleData.filter(v => v.status === 'Active').length}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Active Vehicles
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'orange.50', borderRadius: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'orange.main', mb: 1 }}>
                        {vehicleData.reduce((sum, v) => sum + v.consumption, 0).toLocaleString()}L
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Total Consumption
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'purple.50', borderRadius: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'purple.main', mb: 1 }}>
                        KES {vehicleData.reduce((sum, v) => sum + v.cost, 0).toLocaleString()}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Total Cost
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </>
        )}

        {selectedView === 'diesel' && (
          <>
            {/* Diesel Vehicles Overview */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Diesel Vehicles Analysis
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3 }}>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'blue.50', borderRadius: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'blue.main', mb: 1 }}>
                        {vehicleData.filter(v => v.fuelType === 'Diesel').length}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Total Diesel Vehicles
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'green.50', borderRadius: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'green.main', mb: 1 }}>
                        {vehicleData.filter(v => v.fuelType === 'Diesel').reduce((sum, v) => sum + v.consumption, 0).toLocaleString()}L
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Total Consumption
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'orange.50', borderRadius: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'orange.main', mb: 1 }}>
                        KES {vehicleData.filter(v => v.fuelType === 'Diesel').reduce((sum, v) => sum + v.cost, 0).toLocaleString()}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Total Cost
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Diesel Vehicle Efficiency Comparison */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Diesel Vehicle Efficiency & Consumption
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={vehicleData.filter(v => v.fuelType === 'Diesel')}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="vehicle" angle={-45} textAnchor="end" height={100} />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="efficiency" fill="#10b981" name="Efficiency (km/L)" />
                      <Bar yAxisId="right" dataKey="consumption" fill="#f59e0b" name="Consumption (L)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Diesel Vehicle Cost Analysis */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Diesel Vehicle Cost Breakdown
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={vehicleData.filter(v => v.fuelType === 'Diesel')}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="vehicle" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="cost" fill="#dc2626" name="Cost (KES)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>
          </>
        )}

        {selectedView === 'petrol' && (
          <>
            {/* Petrol Vehicles Overview */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Petrol Vehicles Analysis
                  </Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3 }}>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'red.50', borderRadius: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'red.main', mb: 1 }}>
                        {vehicleData.filter(v => v.fuelType === 'Petrol').length}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Total Petrol Vehicles
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'green.50', borderRadius: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'green.main', mb: 1 }}>
                        {vehicleData.filter(v => v.fuelType === 'Petrol').reduce((sum, v) => sum + v.consumption, 0).toLocaleString()}L
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Total Consumption
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'orange.50', borderRadius: 2 }}>
                      <Typography variant="h3" sx={{ fontWeight: 700, color: 'orange.main', mb: 1 }}>
                        KES {vehicleData.filter(v => v.fuelType === 'Petrol').reduce((sum, v) => sum + v.cost, 0).toLocaleString()}
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Total Cost
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>

            {/* Petrol Vehicle Efficiency Comparison */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Petrol Vehicle Efficiency & Consumption
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={vehicleData.filter(v => v.fuelType === 'Petrol')}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="vehicle" angle={-45} textAnchor="end" height={100} />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Bar yAxisId="left" dataKey="efficiency" fill="#10b981" name="Efficiency (km/L)" />
                      <Bar yAxisId="right" dataKey="consumption" fill="#f59e0b" name="Consumption (L)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Petrol Vehicle Cost Analysis */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Petrol Vehicle Cost Breakdown
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={vehicleData.filter(v => v.fuelType === 'Petrol')}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="vehicle" angle={-45} textAnchor="end" height={100} />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="cost" fill="#dc2626" name="Cost (KES)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>
          </>
        )}
      </Container>
    </Layout>
  );
}


