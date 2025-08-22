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
  WaterDrop,
  TrendingUp,
  TrendingDown,
  Opacity,
  Eco,
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
  AreaChart,
  Area,
} from 'recharts';
import Layout from '@/components/Layout/Layout';

// Mock water data - replace with actual data from your Excel files
const waterSummary = [
  {
    title: 'Total Consumption',
    value: '2,450 m³',
    change: '-8.2%',
    trend: 'down',
    icon: WaterDrop,
    color: '#06b6d4',
  },
  {
    title: 'Borehole 1',
    value: '850 m³',
    change: '-5.1%',
    trend: 'down',
    icon: Opacity,
    color: '#0891b2',
  },
  {
    title: 'Borehole 2',
    value: '720 m³',
    change: '-12.3%',
    trend: 'down',
    icon: Opacity,
    color: '#0e7490',
  },
  {
    title: 'Borehole 3',
    value: '580 m³',
    change: '-3.8%',
    trend: 'down',
    icon: Opacity,
    color: '#155e75',
  },
  {
    title: 'NAIWASCO 1',
    value: '180 m³',
    change: '+2.1%',
    trend: 'up',
    icon: TrendingUp,
    color: '#0ea5e9',
  },
  {
    title: 'NAIWASCO 2',
    value: '120 m³',
    change: '-15.7%',
    trend: 'down',
    icon: TrendingDown,
    color: '#0284c7',
  },
];

const monthlyData = [
  { month: 'Jan', total: 180, borehole1: 65, borehole2: 55, borehole3: 45, naiwasco1: 10, naiwasco2: 5 },
  { month: 'Feb', total: 165, borehole1: 60, borehole2: 50, borehole3: 40, naiwasco1: 10, naiwasco2: 5 },
  { month: 'Mar', total: 190, borehole1: 70, borehole2: 60, borehole3: 45, naiwasco1: 10, naiwasco2: 5 },
  { month: 'Apr', total: 175, borehole1: 65, borehole2: 55, borehole3: 40, naiwasco1: 10, naiwasco2: 5 },
  { month: 'May', total: 200, borehole1: 75, borehole2: 65, borehole3: 45, naiwasco1: 15, naiwasco2: 0 },
  { month: 'Jun', total: 220, borehole1: 80, borehole2: 70, borehole3: 50, naiwasco1: 15, naiwasco2: 5 },
];

const buildingConsumption = [
  { building: 'Main Campus', consumption: 800, percentage: 32.7, trend: '-5.2%', efficiency: 'High' },
  { building: 'Business School', consumption: 600, percentage: 24.5, trend: '-3.8%', efficiency: 'High' },
  { building: 'Engineering', consumption: 450, percentage: 18.4, trend: '-7.1%', efficiency: 'Medium' },
  { building: 'Library', consumption: 200, percentage: 8.2, trend: '-2.1%', efficiency: 'High' },
  { building: 'Student Center', consumption: 250, percentage: 10.2, trend: '-1.5%', efficiency: 'High' },
  { building: 'Residential Halls', consumption: 150, percentage: 6.1, trend: '-8.7%', efficiency: 'Medium' },
];

const sourceBreakdown = [
  { name: 'Borehole 1', value: 850, color: '#0891b2' },
  { name: 'Borehole 2', value: 720, color: '#0e7490' },
  { name: 'Borehole 3', value: 580, color: '#155e75' },
  { name: 'NAIWASCO 1', value: 180, color: '#0ea5e9' },
  { name: 'NAIWASCO 2', value: 120, color: '#0284c7' },
];

const dailyUsageData = [
  { day: 'Mon', consumption: 85, efficiency: 92 },
  { day: 'Tue', consumption: 78, efficiency: 95 },
  { day: 'Wed', consumption: 92, efficiency: 88 },
  { day: 'Thu', consumption: 88, efficiency: 90 },
  { day: 'Fri', consumption: 95, efficiency: 85 },
  { day: 'Sat', consumption: 65, efficiency: 96 },
  { day: 'Sun', consumption: 58, efficiency: 98 },
];

const efficiencyMetrics = [
  { metric: 'Overall Efficiency', value: '91.2%', status: 'Excellent', color: 'success' },
  { metric: 'Borehole Utilization', value: '87.8%', status: 'Good', color: 'success' },
  { metric: 'NAIWASCO Usage', value: '12.2%', status: 'Optimal', color: 'success' },
  { metric: 'Leak Detection', value: '0.3%', status: 'Excellent', color: 'success' },
  { metric: 'Water Quality', value: '98.5%', status: 'Excellent', color: 'success' },
];

export default function WaterPage() {
  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
            Water Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Monitor water consumption, source distribution, and efficiency across all buildings and sources
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {waterSummary.map((item) => {
            const Icon = item.icon;
            return (
              <Grid item xs={12} sm={6} md={4} lg={2} key={item.title}>
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
                        <Icon sx={{ color: item.color, fontSize: 24 }} />
                      </Box>
                      <Box>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'text.primary' }}>
                          {item.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>
                          {item.title}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {item.trend === 'up' ? (
                        <TrendingUp sx={{ color: 'success.main', fontSize: 14, mr: 0.5 }} />
                      ) : (
                        <TrendingDown sx={{ color: 'error.main', fontSize: 14, mr: 0.5 }} />
                      )}
                      <Typography
                        variant="caption"
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
                  Monthly Water Consumption by Source
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="borehole1"
                      stackId="1"
                      stroke="#0891b2"
                      fill="#0891b2"
                      name="Borehole 1"
                    />
                    <Area
                      type="monotone"
                      dataKey="borehole2"
                      stackId="1"
                      stroke="#0e7490"
                      fill="#0e7490"
                      name="Borehole 2"
                    />
                    <Area
                      type="monotone"
                      dataKey="borehole3"
                      stackId="1"
                      stroke="#155e75"
                      fill="#155e75"
                      name="Borehole 3"
                    />
                    <Area
                      type="monotone"
                      dataKey="naiwasco1"
                      stackId="1"
                      stroke="#0ea5e9"
                      fill="#0ea5e9"
                      name="NAIWASCO 1"
                    />
                    <Area
                      type="monotone"
                      dataKey="naiwasco2"
                      stackId="1"
                      stroke="#0284c7"
                      fill="#0284c7"
                      name="NAIWASCO 2"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Source Breakdown */}
          <Grid item xs={12} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Water Source Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sourceBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {sourceBreakdown.map((entry, index) => (
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
          {/* Daily Usage Pattern */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Weekly Usage Pattern & Efficiency
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={dailyUsageData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="consumption"
                      stroke="#06b6d4"
                      strokeWidth={3}
                      name="Consumption (m³)"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#10b981"
                      strokeWidth={3}
                      name="Efficiency (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Building Consumption */}
          <Grid item xs={12} lg={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Building Water Consumption
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={buildingConsumption}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="building" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="consumption" fill="#06b6d4" name="Consumption (m³)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Efficiency Metrics */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Water Efficiency Metrics
                </Typography>
                <Grid container spacing={2}>
                  {efficiencyMetrics.map((metric) => (
                    <Grid item xs={12} sm={6} md={2.4} key={metric.metric}>
                      <Box
                        sx={{
                          textAlign: 'center',
                          p: 2,
                          borderRadius: 2,
                          backgroundColor: 'background.paper',
                          border: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
                          {metric.value}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                          {metric.metric}
                        </Typography>
                        <Chip
                          label={metric.status}
                          size="small"
                          color={metric.color as any}
                          variant="outlined"
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Building Details Table */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Detailed Building Water Consumption
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Building</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Consumption (m³)</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Percentage</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Monthly Trend</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>Efficiency</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {buildingConsumption.map((row) => (
                        <TableRow key={row.building}>
                          <TableCell component="th" scope="row">
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {row.building}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2">
                              {row.consumption.toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {row.percentage}%
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              label={row.trend}
                              size="small"
                              color={row.trend.includes('+') ? 'error' : 'success'}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={row.efficiency}
                              size="small"
                              color={row.efficiency === 'High' ? 'success' : 'warning'}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={row.consumption > 600 ? 'High' : row.consumption > 300 ? 'Medium' : 'Low'}
                              size="small"
                              color={row.consumption > 600 ? 'error' : row.consumption > 300 ? 'warning' : 'success'}
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
      </Container>
    </Layout>
  );
}


