'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Container,
  Chip,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  WaterDrop,
  TrendingUp,
  TrendingDown,
  Opacity,
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
  AreaChart,
  Area,
} from 'recharts';
import Layout from '@/components/Layout/Layout';

// Enhanced water data with detailed breakdowns and costs
const waterSummary = [
  {
    title: 'Total Consumption',
    value: '55,695 m³',
    change: '+0.8%',
    trend: 'up',
    icon: WaterDrop,
    color: '#06b6d4',
  },
  {
    title: 'Total Cost',
    value: 'KES 278,475',
    change: '+2.1%',
    trend: 'up',
    icon: AttachMoney,
    color: '#10b981',
  },
  {
    title: 'Borehole 1 (Mbagathi)',
    value: '19,566 m³',
    change: '+4.1%',
    trend: 'up',
    icon: Opacity,
    color: '#0891b2',
  },
  {
    title: 'Borehole 2 (STC)',
    value: '25,872 m³',
    change: '+11.5%',
    trend: 'up',
    icon: Opacity,
    color: '#0e7490',
  },
  {
    title: 'NCC Sources',
    value: '10,257 m³',
    change: '-18.2%',
    trend: 'down',
    icon: TrendingDown,
    color: '#dc2626',
  },
];

// Monthly water consumption data
const monthlyData = [
  { month: 'Jan', total: 4600, borehole1: 1600, borehole2: 2100, nccSources: 900, cost: 23000 },
  { month: 'Feb', total: 4400, borehole1: 1550, borehole2: 2000, nccSources: 850, cost: 22000 },
  { month: 'Mar', total: 4800, borehole1: 1700, borehole2: 2200, nccSources: 900, cost: 24000 },
  { month: 'Apr', total: 4700, borehole1: 1650, borehole2: 2150, nccSources: 900, cost: 23500 },
  { month: 'May', total: 5000, borehole1: 1750, borehole2: 2300, nccSources: 950, cost: 25000 },
  { month: 'Jun', total: 5200, borehole1: 1800, borehole2: 2400, nccSources: 1000, cost: 26000 },
  { month: 'Jul', total: 5100, borehole1: 1750, borehole2: 2350, nccSources: 1000, cost: 25500 },
  { month: 'Aug', total: 5300, borehole1: 1850, borehole2: 2450, nccSources: 1000, cost: 26500 },
  { month: 'Sep', total: 4800, borehole1: 1700, borehole2: 2200, nccSources: 900, cost: 24000 },
  { month: 'Oct', total: 4900, borehole1: 1750, borehole2: 2250, nccSources: 900, cost: 24500 },
  { month: 'Nov', total: 4700, borehole1: 1650, borehole2: 2150, nccSources: 900, cost: 23500 },
  { month: 'Dec', total: 4500, borehole1: 1600, borehole2: 2100, nccSources: 800, cost: 22500 },
];

// Water sources breakdown
const sourceBreakdown = [
  { name: 'Borehole 2 (STC)', value: 25872, color: '#0e7490', cost: 129360 },
  { name: 'Borehole 1 (Mbagathi)', value: 19566, color: '#0891b2', cost: 97830 },
  { name: 'NCC Mbagathi', value: 6756, color: '#155e75', cost: 33780 },
  { name: 'NCC Langata Gate', value: 2062, color: '#0ea5e9', cost: 10310 },
  { name: 'NCC Sports Field', value: 1439, color: '#0284c7', cost: 7195 },
];

// Detailed building consumption with categorization
const buildingConsumption = [
  {
    building: 'Solandra 1',
    consumption: 11985,
    percentage: 21.5,
    trend: '-1.0%',
    efficiency: 'High',
    category: 'Residential',
    cost: 59925,
    monthlyTrend: [1200, 1180, 1220, 1190, 1210, 1200, 1180, 1220, 1190, 1210, 1180, 1200],
  },
  {
    building: 'STMB, SBS, MSB, STC, Forge',
    consumption: 25872,
    percentage: 46.5,
    trend: '+11.5%',
    efficiency: 'High',
    category: 'Academic',
    cost: 129360,
    monthlyTrend: [2100, 2080, 2120, 2090, 2110, 2100, 2080, 2120, 2090, 2110, 2080, 2100],
  },
  {
    building: 'Mvule, Phase 1, Clinic, Audit, Oval',
    consumption: 8125,
    percentage: 14.6,
    trend: '-11.8%',
    efficiency: 'High',
    category: 'Academic',
    cost: 40625,
    monthlyTrend: [680, 670, 690, 675, 685, 680, 670, 690, 675, 685, 670, 680],
  },
  {
    building: 'Keri',
    consumption: 2941,
    percentage: 5.3,
    trend: '+28.2%',
    efficiency: 'Medium',
    category: 'Residential',
    cost: 14705,
    monthlyTrend: [240, 235, 245, 240, 245, 240, 235, 245, 240, 245, 235, 240],
  },
  {
    building: 'Olokire',
    consumption: 2335,
    percentage: 4.2,
    trend: '+13.8%',
    efficiency: 'Medium',
    category: 'Residential',
    cost: 11675,
    monthlyTrend: [195, 190, 200, 195, 200, 195, 190, 200, 195, 200, 190, 195],
  },
  {
    building: 'Solandra 2',
    consumption: 350,
    percentage: 0.6,
    trend: '+9.0%',
    efficiency: 'High',
    category: 'Residential',
    cost: 1750,
    monthlyTrend: [30, 29, 31, 30, 31, 30, 29, 31, 30, 31, 29, 30],
  },
  {
    building: 'Mbagathi',
    consumption: 586,
    percentage: 1.1,
    trend: '-0.8%',
    efficiency: 'High',
    category: 'Residential',
    cost: 2930,
    monthlyTrend: [50, 49, 51, 50, 51, 50, 49, 51, 50, 51, 49, 50],
  },
  {
    building: 'Sports Complex',
    consumption: 1439,
    percentage: 2.6,
    trend: '-14.8%',
    efficiency: 'High',
    category: 'Sports',
    cost: 7195,
    monthlyTrend: [125, 120, 130, 125, 130, 125, 120, 130, 125, 130, 120, 125],
  },
  {
    building: 'Drinking Water',
    consumption: 2062,
    percentage: 3.7,
    trend: '-45.4%',
    efficiency: 'High',
    category: 'Utility',
    cost: 10310,
    monthlyTrend: [180, 175, 185, 180, 185, 180, 175, 185, 180, 185, 175, 180],
  },
];

// Reservoir data
const reservoirData = {
  reservoir1: {
    name: 'Reservoir 1 (Mbagathi Supply)',
    capacity: '30,000 m³',
    currentLevel: '26,322 m³',
    sources: ['NCC Mbagathi', 'Borehole 1'],
    consumers: ['Residences', 'Mvule, Phase 1, Clinic, Audit, Oval'],
    status: 'Optimal',
    monthlyLevels: [26322, 26150, 26280, 26200, 26350, 26400, 26350, 26450, 26300, 26350, 26280, 26322],
  },
  reservoir2: {
    name: 'Reservoir 2 (STC Supply)',
    capacity: '30,000 m³',
    currentLevel: '25,872 m³',
    sources: ['Borehole 2'],
    consumers: ['STMB, SBS, MSB, STC, Forge, Carwash'],
    status: 'Optimal',
    monthlyLevels: [25872, 25800, 25920, 25850, 25980, 26020, 25980, 26080, 25920, 25980, 25880, 25872],
  }
};

export default function WaterPage() {
  const [showDetailedView, setShowDetailedView] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string);
  };

  const getFilteredBuildings = () => {
    if (selectedCategory === 'all') return buildingConsumption;
    return buildingConsumption.filter(building => building.category === selectedCategory);
  };

  if (!showDetailedView) {
    // Main Overview Page
  return (
    <Layout>
        <Container maxWidth={false} sx={{ py: 4, px: 2 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
            Water Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Overview of water sources, consumption, and cost analysis
          </Typography>
        </Box>

          {/* Navigation Button */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => setShowDetailedView(true)}
              sx={{ 
                px: 4, 
                py: 2, 
                fontSize: '1.1rem',
                backgroundColor: 'primary.main',
                '&:hover': { backgroundColor: 'primary.dark' }
              }}
            >
              📊 View Detailed Breakdown
            </Button>
          </Box>

        {/* Summary Cards */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {waterSummary.map((item) => {
            const Icon = item.icon;
            return (
                <Box key={item.title} sx={{ flex: '1 1 200px', minWidth: '200px' }}>
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
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
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
            {/* Monthly Consumption Trends */}
            <Box sx={{ flex: '2 1 600px', minWidth: '400px' }}>
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
                        dataKey="nccSources"
                      stackId="1"
                        stroke="#dc2626"
                        fill="#dc2626"
                        name="NCC Sources"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            </Box>

            {/* Water Sources Distribution */}
            <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Water Sources Distribution
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={sourceBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
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
            </Box>
          </Box>

          {/* Monthly Cost Trends */}
          <Box sx={{ mb: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Monthly Water Costs (KES)
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
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

          {/* Key Insights */}
          <Box sx={{ mb: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  🎯 Key Insights
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                      Water Sources Analysis
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      • Borehole 2 (STC) is the primary source, providing 46.4% of total water
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      • Borehole 1 (Mbagathi) contributes 35.1% of total supply
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      • NCC sources provide 18.5% but show declining trend (-18.2%)
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'secondary.main' }}>
                      Consumption Patterns
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      • Academic buildings consume 61.0% of total water
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      • Residential areas use 32.0% of total consumption
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      • Sports Complex shows highest efficiency improvement (-14.8%)
                    </Typography>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
                      Cost Analysis
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      • Total annual cost: KES 278,475
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      • Average cost per m³: KES 5.0
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                      • Peak costs in May-June due to increased consumption
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Container>
      </Layout>
    );
  }

  // Detailed Breakdown View
  return (
    <Layout>
      <Container maxWidth={false} sx={{ py: 4, px: 2 }}>
        {/* Header with Back Button */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setShowDetailedView(false)}
              sx={{ mr: 2 }}
            >
              ← Back to Overview
            </Button>
            <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
              Water Dashboard - Detailed Breakdown
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Detailed analysis of water consumption by building, reservoir status, and cost breakdowns
          </Typography>
        </Box>

        {/* Category Filter */}
        <Box sx={{ mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                📍 Filter by Category
              </Typography>
              <FormControl sx={{ minWidth: 250 }}>
                <InputLabel>Select Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Select Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  <MenuItem value="Residential">Residential</MenuItem>
                  <MenuItem value="Academic">Academic</MenuItem>
                  <MenuItem value="Sports">Sports</MenuItem>
                  <MenuItem value="Utility">Utility</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Box>

        {/* Monthly Consumption by Building */}
        <Box sx={{ mb: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Monthly Water Consumption by Building
                </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                  <Bar dataKey="borehole1" fill="#0891b2" name="Borehole 1" />
                  <Bar dataKey="borehole2" fill="#0e7490" name="Borehole 2" />
                  <Bar dataKey="nccSources" fill="#dc2626" name="NCC Sources" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
        </Box>

        {/* Cost per Building */}
        <Box sx={{ mb: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Water Cost per Building (KES)
                </Typography>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={getFilteredBuildings()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="building" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="cost" fill="#10b981" name="Cost (KES)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Box>

        {/* Building Details Table */}
        <Box sx={{ mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Detailed Building Water Consumption & Costs
                        </Typography>
              <Box sx={{ overflowX: 'auto' }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 2 }}>
                  {getFilteredBuildings().map((building) => (
                    <Box key={building.building} sx={{ p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {building.building}
                        </Typography>
                        <Chip
                          label={building.category}
                          size="small"
                          color={building.category === 'Residential' ? 'primary' : building.category === 'Academic' ? 'secondary' : 'default'}
                          variant="outlined"
                        />
                      </Box>
                      
                      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
                        <Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Consumption:</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {building.consumption.toLocaleString()} m³
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Cost:</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
                            KES {building.cost.toLocaleString()}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Percentage:</Typography>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {building.percentage}%
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Efficiency:</Typography>
                          <Chip
                            label={building.efficiency}
                          size="small"
                            color={building.efficiency === 'High' ? 'success' : 'warning'}
                          variant="outlined"
                        />
                      </Box>
                      </Box>
                      
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                        Monthly Trend: {building.trend}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
              </CardContent>
            </Card>
        </Box>

        {/* Reservoir Status */}
        <Box sx={{ mb: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Reservoir Status & Monthly Levels
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {Object.entries(reservoirData).map(([key, reservoir]) => (
                  <Box key={key} sx={{ flex: '1 1 400px', minWidth: '400px' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                      {reservoir.name}
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 2 }}>
                      <Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Capacity:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{reservoir.capacity}</Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Current Level:</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600, color: 'success.main' }}>
                          {reservoir.currentLevel}
                </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>Sources: </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {reservoir.sources.join(', ')}
                            </Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>Consumers: </Typography>
                      <Typography variant="caption" sx={{ fontWeight: 500 }}>
                        {reservoir.consumers.join(', ')}
                            </Typography>
                    </Box>
                    
                    <Typography variant="body2" sx={{ mb: 2, fontWeight: 600 }}>
                      Monthly Level Trends:
                            </Typography>
                    <ResponsiveContainer width="100%" height={200}>
                      <LineChart data={reservoir.monthlyLevels.map((level, index) => ({
                        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][index],
                        level: level / 1000,
                      }))}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="level" stroke="#3b82f6" strokeWidth={2} name="Level (k m³)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Key Insights */}
        <Box sx={{ mb: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                🔍 Detailed Analysis Insights
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'primary.main' }}>
                    Building Performance
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    • STMB, SBS, MSB, STC, Forge complex shows highest consumption (46.5%)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    • Solandra 1 leads residential consumption with 21.5% of total
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    • Sports Complex demonstrates best efficiency improvement (-14.8%)
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'secondary.main' }}>
                    Cost Efficiency
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    • Academic buildings account for 61.0% of total costs
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    • Residential areas show 32.0% cost share
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    • Average cost per m³: KES 5.0 across all categories
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'success.main' }}>
                    Reservoir Management
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    • Both reservoirs operating at optimal levels (87-88% capacity)
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    • Stable monthly level trends with minor fluctuations
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    • Effective distribution to academic and residential areas
                  </Typography>
                </Box>
              </Box>
              </CardContent>
            </Card>
        </Box>
      </Container>
    </Layout>
  );
}


