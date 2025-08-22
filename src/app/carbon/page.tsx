'use client';

import React from 'react';
import {
  Box,
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
  LinearProgress,
} from '@mui/material';
import {
  Nature,
  TrendingUp,
  TrendingDown,
  ElectricBolt,
  WaterDrop,
  LocalGasStation,
} from '@mui/icons-material';
import {
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

// Mock carbon footprint data - replace with actual data from your Excel files
const carbonSummary = [
  {
    title: 'Total Emissions',
    value: '12.4 tCO₂',
    change: '-3.1%',
    trend: 'down',
    icon: Nature,
    color: '#10b981',
  },
  {
    title: 'Electricity Emissions',
    value: '8.2 tCO₂',
    change: '-2.8%',
    trend: 'down',
    icon: ElectricBolt,
    color: '#3b82f6',
  },
  {
    title: 'Water Emissions',
    value: '2.1 tCO₂',
    change: '-5.2%',
    trend: 'down',
    icon: WaterDrop,
    color: '#06b6d4',
  },
  {
    title: 'Fuel Emissions',
    value: '2.1 tCO₂',
    change: '+1.5%',
    trend: 'up',
    icon: LocalGasStation,
    color: '#f59e0b',
  },
];

const monthlyEmissions = [
  { month: 'Jan', electricity: 1.4, water: 0.35, fuel: 0.35, total: 2.1 },
  { month: 'Feb', electricity: 1.3, water: 0.32, fuel: 0.33, total: 1.95 },
  { month: 'Mar', electricity: 1.5, water: 0.38, fuel: 0.36, total: 2.24 },
  { month: 'Apr', electricity: 1.4, water: 0.35, fuel: 0.34, total: 2.09 },
  { month: 'May', electricity: 1.6, water: 0.40, fuel: 0.37, total: 2.37 },
  { month: 'Jun', electricity: 1.7, water: 0.42, fuel: 0.38, total: 2.5 },
];

const emissionSources = [
  { name: 'Electricity', value: 8.2, color: '#3b82f6' },
  { name: 'Water', value: 2.1, color: '#06b6d4' },
  { name: 'Fuel', value: 2.1, color: '#f59e0b' },
];

const buildingEmissions = [
  { building: 'Main Campus', emissions: 4.8, percentage: 38.7, trend: '-2.1%' },
  { building: 'Business School', emissions: 3.2, percentage: 25.8, trend: '-1.8%' },
  { building: 'Engineering', emissions: 2.6, percentage: 21.0, trend: '-3.2%' },
  { building: 'Library', emissions: 0.9, percentage: 7.3, trend: '-0.5%' },
  { building: 'Student Center', emissions: 0.9, percentage: 7.3, trend: '-0.3%' },
];

const sustainabilityMetrics = [
  { metric: 'Carbon Intensity', value: '0.12 tCO₂/m²', target: '0.10 tCO₂/m²', progress: 83 },
  { metric: 'Renewable Energy', value: '40.8%', target: '50%', progress: 82 },
  { metric: 'Energy Efficiency', value: 'B+', target: 'A', progress: 75 },
  { metric: 'Water Efficiency', value: 'A-', target: 'A+', progress: 88 },
  { metric: 'Waste Reduction', value: '15%', target: '20%', progress: 75 },
];

const carbonReductionOpportunities = [
  {
    project: 'Solar Panel Expansion',
    potential: '2.1 tCO₂/year',
    cost: '$45,000',
    payback: '4.2 years',
    priority: 'High',
  },
  {
    project: 'LED Lighting Upgrade',
    potential: '0.8 tCO₂/year',
    cost: '$12,000',
    payback: '2.1 years',
    priority: 'High',
  },
  {
    project: 'Smart Building Controls',
    potential: '1.2 tCO₂/year',
    cost: '$28,000',
    payback: '3.8 years',
    priority: 'Medium',
  },
  {
    project: 'Water Recycling System',
    potential: '0.5 tCO₂/year',
    cost: '$35,000',
    payback: '6.2 years',
    priority: 'Medium',
  },
];

export default function CarbonPage() {
  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
            Carbon Footprint Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Monitor and track Strathmore University&apos;s carbon emissions and sustainability performance
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {carbonSummary.map((item) => {
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
                        <TrendingUp sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
                      ) : (
                        <TrendingDown sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
                      )}
                      <Typography
                        variant="body2"
                        sx={{
                          color: item.trend === 'up' ? 'error.main' : 'success.main',
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
          {/* Monthly Emissions */}
          <Box sx={{ flex: '2 1 600px', minWidth: '400px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Monthly Carbon Emissions by Source
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyEmissions}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="electricity"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      name="Electricity"
                    />
                    <Area
                      type="monotone"
                      dataKey="water"
                      stackId="1"
                      stroke="#06b6d4"
                      fill="#06b6d4"
                      name="Water"
                    />
                    <Area
                      type="monotone"
                      dataKey="fuel"
                      stackId="1"
                      stroke="#f59e0b"
                      fill="#f59e0b"
                      name="Fuel"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>

          {/* Emission Sources */}
          <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Emissions Source Breakdown
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={emissionSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {emissionSources.map((entry, index) => (
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

        {/* Sustainability Metrics */}
        <Box sx={{ mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Sustainability Performance Metrics
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {sustainabilityMetrics.map((metric) => (
                  <Box key={metric.metric} sx={{ flex: '1 1 200px', minWidth: '200px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {metric.metric}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {metric.value}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={metric.progress}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: metric.progress >= 80 ? 'success.main' : 
                                        metric.progress >= 60 ? 'warning.main' : 'error.main',
                        },
                      }}
                    />
                    <Typography variant="caption" sx={{ color: 'text.secondary', mt: 0.5 }}>
                      Target: {metric.target}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Building Emissions */}
        <Box sx={{ mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Building Carbon Emissions
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={buildingEmissions}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="building" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="emissions" fill="#10b981" name="Emissions (tCO₂)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Carbon Reduction Opportunities */}
        <Box sx={{ mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Carbon Reduction Opportunities
              </Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Project</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Potential Reduction</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Cost</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600 }}>Payback Period</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600 }}>Priority</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {carbonReductionOpportunities.map((opportunity) => (
                      <TableRow key={opportunity.project}>
                        <TableCell component="th" scope="row">
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {opportunity.project}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ color: 'success.main', fontWeight: 600 }}>
                            {opportunity.potential}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2">
                            {opportunity.cost}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {opportunity.payback}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={opportunity.priority}
                            size="small"
                            color={opportunity.priority === 'High' ? 'error' : 'warning'}
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
        </Box>

        {/* Insights and Recommendations */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          <Box sx={{ flex: '1 1 400px', minWidth: '400px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  🌱 Key Insights
                </Typography>
                <Box sx={{ '& > *': { mb: 1 } }}>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Total emissions reduced by 3.1% this month
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Electricity remains the largest emission source (66%)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Water efficiency improvements showing positive results
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • On track to meet annual reduction target of 15%
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
                    • Prioritize solar panel expansion project
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Implement LED lighting upgrade across campus
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Continue water efficiency initiatives
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    • Monitor fuel consumption trends closely
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


