'use client';

import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  LocalGasStation,
  DirectionsCar,
  TrendingUp,
  TrendingDown,
  Speed,
  AttachMoney,
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
  PieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
} from 'recharts';
import Layout from '@/components/Layout/Layout';

// Mock fuel data - replace with actual data from your Excel files
const fuelSummary = [
  {
    title: 'Total Consumption',
    value: '1,280 L',
    change: '+5.7%',
    trend: 'up',
    icon: LocalGasStation,
    color: '#f59e0b',
  },
  {
    title: 'Total Cost',
    value: 'KES 256,000',
    change: '+8.2%',
    trend: 'up',
    icon: AttachMoney,
    color: '#dc2626',
  },
  {
    title: 'Total Distance',
    value: '12,450 km',
    change: '+3.1%',
    trend: 'up',
    icon: Speed,
    color: '#10b981',
  },
  {
    title: 'Avg Efficiency',
    value: '9.7 km/L',
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

const vehicleData = [
  {
    vehicle: 'Toyota Hiace (Admin)',
    consumption: 180,
    cost: 36000,
    distance: 1750,
    efficiency: 9.7,
    costPerKm: 20.6,
    status: 'Active',
    fuelType: 'Diesel',
  },
  {
    vehicle: 'Nissan Van (Transport)',
    consumption: 220,
    cost: 44000,
    distance: 2100,
    efficiency: 9.5,
    costPerKm: 21.0,
    status: 'Active',
    fuelType: 'Diesel',
  },
  {
    vehicle: 'Toyota Land Cruiser',
    consumption: 150,
    cost: 30000,
    distance: 1400,
    efficiency: 9.3,
    costPerKm: 21.4,
    status: 'Maintenance',
    fuelType: 'Petrol',
  },
  {
    vehicle: 'Mitsubishi Pajero',
    consumption: 120,
    cost: 24000,
    distance: 1150,
    efficiency: 9.6,
    costPerKm: 20.9,
    status: 'Active',
    fuelType: 'Diesel',
  },
  {
    vehicle: 'Toyota Corolla',
    consumption: 85,
    cost: 17000,
    distance: 820,
    efficiency: 9.6,
    costPerKm: 20.7,
    status: 'Active',
    fuelType: 'Petrol',
  },
  {
    vehicle: 'Motorcycle (Security)',
    consumption: 25,
    cost: 5000,
    distance: 250,
    efficiency: 10.0,
    costPerKm: 20.0,
    status: 'Active',
    fuelType: 'Petrol',
  },
];

const fuelTypeBreakdown = [
  { name: 'Diesel', value: 695, color: '#f59e0b' },
  { name: 'Petrol', value: 585, color: '#dc2626' },
];

const efficiencyTrends = [
  { month: 'Jan', avgEfficiency: 9.5, targetEfficiency: 10.0 },
  { month: 'Feb', avgEfficiency: 9.6, targetEfficiency: 10.0 },
  { month: 'Mar', avgEfficiency: 9.7, targetEfficiency: 10.0 },
  { month: 'Apr', avgEfficiency: 9.7, targetEfficiency: 10.0 },
  { month: 'May', avgEfficiency: 9.7, targetEfficiency: 10.0 },
  { month: 'Jun', avgEfficiency: 9.7, targetEfficiency: 10.0 },
];

const costAnalysis = [
  { category: 'Fuel Purchase', amount: 256000, percentage: 85.3 },
  { category: 'Maintenance', amount: 28000, percentage: 9.3 },
  { category: 'Insurance', amount: 12000, percentage: 4.0 },
  { category: 'Other Costs', amount: 4000, percentage: 1.3 },
];

export default function FuelPage() {
  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
            Fuel Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Monitor fuel consumption, vehicle efficiency, and cost analysis across the fleet
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {fuelSummary.map((item) => {
            const Icon = item.icon;
            return (
              <Grid item xs={12} sm={6} md={3} key={item.title}>
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
              </Grid>
            );
          })}
        </Grid>

        {/* Charts Row 1 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Monthly Trends */}
          <Grid item xs={12} lg={8}>
            <Card>
              <CardContent>
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
          </Grid>

          {/* Fuel Type Breakdown */}
          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
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
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
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
          </Grid>
        </Grid>

        {/* Charts Row 2 */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Efficiency Trends */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
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
          </Grid>

          {/* Cost Analysis */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Cost Breakdown
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={costAnalysis}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="amount" fill="#dc2626" name="Amount (KES)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Vehicle Details Table */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Vehicle Fuel Consumption & Efficiency
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Vehicle</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Consumption (L)</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Cost (KES)</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Distance (km)</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Efficiency (km/L)</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Cost/km (KES)</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>Fuel Type</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {vehicleData.map((row) => (
                        <TableRow key={row.vehicle}>
                          <TableCell component="th" scope="row">
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {row.vehicle}
                            </Typography>
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
                              {row.distance.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {row.efficiency}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {row.costPerKm}
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
                          <TableCell align="center">
                            <Chip
                              label={row.fuelType}
                              size="small"
                              color={row.fuelType === 'Diesel' ? 'warning' : 'error'}
                              variant="outlined"
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Insights & Recommendations */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  🎯 Key Insights
                </Typography>
                <Box sx={{ '& > *': { mb: 1 } }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Overall fleet efficiency improved by 2.1% this month
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Diesel vehicles show better efficiency than petrol vehicles
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Toyota Hiace has the highest consumption but serves admin needs
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Motorcycle shows best efficiency at 10.0 km/L
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  🚀 Recommendations
                </Typography>
                <Box sx={{ '& > *': { mb: 1 } }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Schedule regular maintenance for Land Cruiser to improve efficiency
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Consider route optimization for high-consumption vehicles
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Implement driver training for fuel-efficient driving techniques
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Monitor fuel quality and consider premium fuel for better efficiency
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}


