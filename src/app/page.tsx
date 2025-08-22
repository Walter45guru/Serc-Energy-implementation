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
    value: '45,230 kWh',
    change: '+12.5%',
    trend: 'up',
    icon: ElectricBolt,
    color: '#3b82f6',
  },
  {
    title: 'Total Water',
    value: '2,450 m³',
    change: '-8.2%',
    trend: 'down',
    icon: WaterDrop,
    color: '#06b6d4',
  },
  {
    title: 'Total Fuel',
    value: '1,280 L',
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
  { month: 'Jan', electricity: 4200, water: 180, fuel: 95, carbon: 1.2 },
  { month: 'Feb', electricity: 3800, water: 165, fuel: 88, carbon: 1.1 },
  { month: 'Mar', electricity: 4500, water: 190, fuel: 102, carbon: 1.3 },
  { month: 'Apr', electricity: 4100, water: 175, fuel: 96, carbon: 1.2 },
  { month: 'May', electricity: 4800, water: 200, fuel: 110, carbon: 1.4 },
  { month: 'Jun', electricity: 5200, water: 220, fuel: 118, carbon: 1.5 },
];

const buildingData = [
  { building: 'Main Campus', electricity: 18000, water: 800, fuel: 450 },
  { building: 'Business School', electricity: 12000, water: 600, fuel: 320 },
  { building: 'Engineering', electricity: 9800, water: 450, fuel: 280 },
  { building: 'Library', electricity: 3500, water: 200, fuel: 120 },
  { building: 'Student Center', electricity: 4200, water: 250, fuel: 150 },
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
                    • Solar generation increased by 15% this month
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Water consumption reduced due to new efficiency measures
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Fuel efficiency improved by 8% with new vehicle maintenance
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Carbon footprint on track to meet annual reduction target
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
                    • Consider expanding solar panel installation
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Implement smart water monitoring systems
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Schedule regular vehicle maintenance for fuel efficiency
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Continue energy awareness campaigns
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
