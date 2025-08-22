'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
} from '@mui/material';
import {
  ElectricBolt,
  WaterDrop,
  LocalGasStation,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import Layout from '@/components/Layout/Layout';

// Mock data - replace with actual data from your Excel files
const summaryData = [
  {
    title: 'Total Electricity',
    value: '55,695 kWh',
    change: '+12.5%',
    trend: 'up',
    icon: ElectricBolt,
    color: '#3b82f6',
  },
  {
    title: 'Total Water',
    value: '55,695 m³',
    change: '+0.8%',
    trend: 'up',
    icon: WaterDrop,
    color: '#06b6d4',
  },
  {
    title: 'Total Fuel',
    value: '2,450 L',
    change: '+5.7%',
    trend: 'up',
    icon: LocalGasStation,
    color: '#f59e0b',
  },
  {
    title: 'Carbon Footprint',
    value: '12.4 tCO₂',
    change: '-3.1%',
    trend: 'down',
    icon: TrendingDown,
    color: '#10b981',
  },
];

const trendData = [
  { month: 'Jan', electricity: 4600, water: 4600, fuel: 95, carbon: 1.2 },
  { month: 'Feb', electricity: 4400, water: 4400, fuel: 88, carbon: 1.1 },
  { month: 'Mar', electricity: 4800, water: 4800, fuel: 102, carbon: 1.3 },
  { month: 'Apr', electricity: 4700, water: 4700, fuel: 96, carbon: 1.2 },
  { month: 'May', electricity: 5000, water: 5000, fuel: 110, carbon: 1.4 },
  { month: 'Jun', electricity: 5200, water: 5200, fuel: 118, carbon: 1.5 },
];

const buildingData = [
  { building: 'Solandra 1', electricity: 18500, water: 800, fuel: 450 },
  { building: 'STMB, SBS, MSB, STC, Forge', electricity: 12000, water: 600, fuel: 320 },
  { building: 'Mvule, Phase 1, Clinic, Audit, Oval', electricity: 9800, water: 450, fuel: 280 },
  { building: 'Keri', electricity: 3500, water: 200, fuel: 120 },
  { building: 'Olokire', electricity: 4200, water: 250, fuel: 150 },
  { building: 'Solandra 2', electricity: 2800, water: 150, fuel: 80 },
  { building: 'Mbagathi', electricity: 1800, water: 100, fuel: 60 },
  { building: 'Sports Complex', electricity: 3200, water: 180, fuel: 100 },
];

export default function OverviewPage() {
  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
            Energy Dashboard Overview
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Comprehensive view of Strathmore University&apos;s energy consumption and sustainability metrics
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {summaryData.map((item) => {
            const Icon = item.icon;
            return (
              <Box key={item.title} sx={{ flex: '1 1 250px', minWidth: '250px' }}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          backgroundColor: `${item.color}20`,
                          borderRadius: 2,
                          p: 1,
                          mr: 2,
                        }}
                      >
                        <Icon sx={{ color: item.color, fontSize: 28 }} />
                      </Box>
                      <Box>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                          {item.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          {item.title}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {item.trend === 'up' ? (
                        <TrendingUp sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                      ) : (
                        <TrendingDown sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                      )}
                      <Typography
                        variant="body2"
                        sx={{
                          color: item.trend === 'up' ? 'success.main' : 'error.main',
                          fontWeight: 600,
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

        {/* Charts Row */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {/* Trends Chart */}
          <Box sx={{ flex: '2 1 600px', minWidth: '400px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Monthly Energy Trends
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="electricity"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      name="Electricity (kWh)"
                    />
                    <Line
                      type="monotone"
                      dataKey="water"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      name="Water (m³)"
                    />
                    <Line
                      type="monotone"
                      dataKey="fuel"
                      stroke="#f59e0b"
                      strokeWidth={3}
                      name="Fuel (L)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>

          {/* Building Consumption */}
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Building Consumption
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={buildingData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="building" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="electricity" fill="#3b82f6" name="Electricity (kWh)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Quick Insights */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: '1 1 400px', minWidth: '400px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  🎯 Key Insights
                </Typography>
                <Box sx={{ '& > *': { mb: 1 } }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Solandra 1 leads in electricity consumption (18,500 kWh)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • STMB, SBS, MSB, STC, Forge complex shows high water usage
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Fuel efficiency improved with new vehicle fleet management
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Solar generation integration planned for residential buildings
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ flex: '1 1 400px', minWidth: '400px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  🚀 Recommendations
                </Typography>
                <Box sx={{ '& > *': { mb: 1 } }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Implement IoT monitoring for Solandra residential buildings
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Upgrade water systems in STMB, SBS, MSB, STC, Forge complex
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Solar panel installation on Keri and Olokire buildings
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Energy efficiency audit for Mbagathi and Sports Complex
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Container>
    </Layout>
  );
}
