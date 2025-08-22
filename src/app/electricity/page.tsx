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
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import {
  ElectricBolt,
  SolarPower,
  Power,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  LineChart,
  Line,
} from 'recharts';
import Gauge from '../../components/Gauge';
import Layout from '@/components/Layout/Layout';

// Enhanced electricity data with detailed breakdowns and costs
const electricitySummary = [
  {
    title: 'Total Consumption',
    value: '55,695 kWh',
    change: '+12.5%',
    trend: 'up',
    icon: ElectricBolt,
    color: '#3b82f6',
  },
  {
    title: 'Solar Generation',
    value: '18,450 kWh',
    change: '+15.2%',
    trend: 'up',
    icon: SolarPower,
    color: '#f59e0b',
  },
  {
    title: 'Solar Consumption',
    value: '16,200 kWh',
    change: '+14.8%',
    trend: 'up',
    icon: SolarPower,
    color: '#10b981',
  },
  {
    title: 'Grid Consumption',
    value: '23,980 kWh',
    change: '+18.3%',
    trend: 'up',
    icon: TrendingUp,
    color: '#8b5cf6',
  },
  {
    title: 'Generator Usage',
    value: '2,800 kWh',
    change: '-8.7%',
    trend: 'down',
    icon: Power,
    color: '#dc2626',
  },
];

// Monthly consumption data for line graph
const monthlyData = [
  { month: 'Jan', total: 4200, solarGen: 1800, solarCons: 1600, generator: 200, grid: 2200, cost: 117000 },
  { month: 'Feb', total: 3800, solarGen: 1600, solarCons: 1400, generator: 180, grid: 2000, cost: 80000 },
  { month: 'Mar', total: 4500, solarGen: 1900, solarCons: 1700, generator: 220, grid: 2400, cost: 120000 },
  { month: 'Apr', total: 4100, solarGen: 1700, solarCons: 1500, generator: 200, grid: 2200, cost: 80000 },
  { month: 'May', total: 4800, solarGen: 2100, solarCons: 1900, generator: 240, grid: 2600, cost: 80000 },
  { month: 'Jun', total: 5200, solarGen: 2300, solarCons: 2100, generator: 260, grid: 2800, cost: 78000 },
  { month: 'Jul', total: 4900, solarGen: 2100, solarCons: 1900, generator: 240, grid: 2600, cost: 78000 },
  { month: 'Aug', total: 5300, solarGen: 2300, solarCons: 2100, generator: 260, grid: 2800, cost: 100000 },
  { month: 'Sep', total: 4600, solarGen: 2000, solarCons: 1800, generator: 220, grid: 2400, cost: 65000 },
  { month: 'Oct', total: 4800, solarGen: 2100, solarCons: 1900, generator: 240, grid: 2600, cost: 65000 },
  { month: 'Nov', total: 5100, solarGen: 2200, solarCons: 2000, generator: 250, grid: 2700, cost: 128000 },
  { month: 'Dec', total: 3900, solarGen: 1700, solarCons: 1500, generator: 190, grid: 2000, cost: 33000 },
];

// Detailed building consumption with submeters and costs
const buildingData = [
  {
    category: 'Residential Areas',
    buildings: [
      {
        name: 'Mbagathi',
        consumption: 2800,
        percentage: 5.0,
        trend: '+2.1%',
        cost: 14000,
        submeters: null,
        type: 'residential',
      },
      {
        name: 'Mvule',
        consumption: 4200,
        percentage: 7.5,
        trend: '+1.8%',
        cost: 21000,
        submeters: [
          { name: 'Mvule Kitchen', consumption: 1800, percentage: 3.2, cost: 9000 },
          { name: 'Mvule Main House', consumption: 1600, percentage: 2.9, cost: 8000 },
          { name: 'Mvule Laundry', consumption: 800, percentage: 1.4, cost: 4000 },
        ],
        type: 'residential',
      },
      {
        name: 'Keri',
        consumption: 2100,
        percentage: 3.8,
        trend: '-0.5%',
        cost: 10500,
        submeters: null,
        type: 'residential',
      },
      {
        name: 'Olokire',
        consumption: 1900,
        percentage: 3.4,
        trend: '+1.2%',
        cost: 9500,
        submeters: null,
        type: 'residential',
      },
      {
        name: 'Solandra 1',
        consumption: 3800,
        percentage: 6.8,
        trend: '+3.1%',
        cost: 19000,
        submeters: [
          { name: 'Solandra 1 Kitchen', consumption: 1400, percentage: 2.5, cost: 7000 },
          { name: 'Solandra 1 Laundry', consumption: 900, percentage: 1.6, cost: 4500 },
          { name: 'Solandra 1 Main House', consumption: 1500, percentage: 2.7, cost: 7500 },
        ],
        type: 'residential',
      },
      {
        name: 'Solandra 2',
        consumption: 1200,
        percentage: 2.2,
        trend: '+1.8%',
        cost: 6000,
        submeters: null,
        type: 'residential',
      },
    ],
  },
  {
    category: 'Student Center (STC)',
    buildings: [
      {
        name: 'STC Tenants',
        consumption: 5200,
        percentage: 9.3,
        trend: '+5.2%',
        cost: 26000,
        submeters: [
          { name: 'Shop 1 - Mark Info', consumption: 450, percentage: 0.8, cost: 2250 },
          { name: 'Shop 2 - Pate', consumption: 380, percentage: 0.7, cost: 1900 },
          { name: 'Shop 3 - Springs of Olive', consumption: 420, percentage: 0.8, cost: 2100 },
          { name: 'Shop 4 - Film Production', consumption: 520, percentage: 0.9, cost: 2600 },
          { name: 'Shop 4B - Eliteways', consumption: 310, percentage: 0.6, cost: 1550 },
          { name: 'Shop 5 - Karate Dojo', consumption: 280, percentage: 0.5, cost: 1400 },
          { name: 'Shop 6 - Salon', consumption: 350, percentage: 0.6, cost: 1750 },
          { name: 'Shop 7 - Afya Corner', consumption: 410, percentage: 0.7, cost: 2050 },
          { name: 'Shop 8 - Upesi', consumption: 330, percentage: 0.6, cost: 1650 },
          { name: 'Shop 9 - Faculty Affairs', consumption: 480, percentage: 0.9, cost: 2400 },
          { name: 'Shop 10A - Electronics Shop', consumption: 520, percentage: 0.9, cost: 2600 },
          { name: 'Shop 10B - Fancy Enterprise', consumption: 290, percentage: 0.5, cost: 1450 },
          { name: 'Shop 12 - Financial Aid', consumption: 380, percentage: 0.7, cost: 1900 },
          { name: 'Shop 15 - Unknown', consumption: 250, percentage: 0.4, cost: 1250 },
          { name: 'SBM Bank', consumption: 680, percentage: 1.2, cost: 3400 },
          { name: 'Utawala (SU Partnerships SRCC)', consumption: 420, percentage: 0.8, cost: 2100 },
          { name: 'Bookshop', consumption: 390, percentage: 0.7, cost: 1950 },
        ],
        type: 'commercial',
      },
      {
        name: 'STC Kitchen',
        consumption: 3100,
        percentage: 5.6,
        trend: '+2.8%',
        cost: 15500,
        submeters: [
          { name: 'SC Main Kitchen', consumption: 1800, percentage: 3.2, cost: 9000 },
          { name: 'SC Kitchen 2 Survey Area', consumption: 800, percentage: 1.4, cost: 4000 },
          { name: 'Pate (STC Kitchen)', consumption: 500, percentage: 0.9, cost: 2500 },
        ],
        type: 'kitchen',
      },
      {
        name: 'STC Main House',
        consumption: 2800,
        percentage: 5.0,
        trend: '+1.5%',
        cost: 14000,
        submeters: null,
        type: 'main',
      },
    ],
  },
  {
    category: 'Academic Buildings',
    buildings: [
      {
        name: 'STMB (Strathmore Business School)',
        consumption: 6800,
        percentage: 12.2,
        trend: '+4.1%',
        cost: 34000,
        submeters: [
          { name: 'STMB Lecture Halls', consumption: 3200, percentage: 5.7, cost: 16000 },
          { name: 'STMB Offices', consumption: 1800, percentage: 3.2, cost: 9000 },
          { name: 'STMB Library', consumption: 1200, percentage: 2.2, cost: 6000 },
          { name: 'STMB Computer Labs', consumption: 600, percentage: 1.1, cost: 3000 },
        ],
        type: 'academic',
      },
      {
        name: 'SBS (Strathmore Business School)',
        consumption: 5200,
        percentage: 9.3,
        trend: '+3.8%',
        cost: 26000,
        submeters: [
          { name: 'SBS Lecture Halls', consumption: 2400, percentage: 4.3, cost: 12000 },
          { name: 'SBS Offices', consumption: 1400, percentage: 2.5, cost: 7000 },
          { name: 'SBS Library', consumption: 800, percentage: 1.4, cost: 4000 },
          { name: 'SBS Computer Labs', consumption: 600, percentage: 1.1, cost: 3000 },
        ],
        type: 'academic',
      },
      {
        name: 'MSB (Mathematics & Sciences)',
        consumption: 4100,
        percentage: 7.4,
        trend: '+2.9%',
        cost: 20500,
        submeters: [
          { name: 'MSB Lecture Halls', consumption: 1900, percentage: 3.4, cost: 9500 },
          { name: 'MSB Labs', consumption: 1200, percentage: 2.2, cost: 6000 },
          { name: 'MSB Offices', consumption: 1000, percentage: 1.8, cost: 5000 },
        ],
        type: 'academic',
      },
      {
        name: 'STC (Strathmore Teaching College)',
        consumption: 3800,
        percentage: 6.8,
        trend: '+3.2%',
        cost: 19000,
        submeters: [
          { name: 'STC Lecture Halls', consumption: 1800, percentage: 3.2, cost: 9000 },
          { name: 'STC Offices', consumption: 1000, percentage: 1.8, cost: 5000 },
          { name: 'STC Library', consumption: 600, percentage: 1.1, cost: 3000 },
          { name: 'STC Computer Labs', consumption: 400, percentage: 0.7, cost: 2000 },
        ],
        type: 'academic',
      },
    ],
  },
  {
    category: 'Administrative & Support',
    buildings: [
      {
        name: 'Forge (Innovation Hub)',
        consumption: 2900,
        percentage: 5.2,
        trend: '+6.8%',
        cost: 14500,
        submeters: [
          { name: 'Forge Main Space', consumption: 1600, percentage: 2.9, cost: 8000 },
          { name: 'Forge Meeting Rooms', consumption: 800, percentage: 1.4, cost: 4000 },
          { name: 'Forge Equipment', consumption: 500, percentage: 0.9, cost: 2500 },
        ],
        type: 'administrative',
      },
      {
        name: 'Sports Complex',
        consumption: 3200,
        percentage: 5.7,
        trend: '+2.3%',
        cost: 16000,
        submeters: [
          { name: 'Sports Gym', consumption: 1800, percentage: 3.2, cost: 9000 },
          { name: 'Sports Pool', consumption: 800, percentage: 1.4, cost: 4000 },
          { name: 'Sports Courts', consumption: 600, percentage: 1.1, cost: 3000 },
        ],
        type: 'sports',
      },
      {
        name: 'Maintenance & Utilities',
        consumption: 1800,
        percentage: 3.2,
        trend: '+1.7%',
        cost: 9000,
        submeters: [
          { name: 'Water Pumping', consumption: 800, percentage: 1.4, cost: 4000 },
          { name: 'Lighting Systems', consumption: 600, percentage: 1.1, cost: 3000 },
          { name: 'Security Systems', consumption: 400, percentage: 0.7, cost: 2000 },
        ],
        type: 'utilities',
      },
    ],
  },
];

// Cost breakdown data
const costBreakdown = [
  { category: 'Residential Areas', cost: 70000, percentage: 25.1 },
  { category: 'Student Center (STC)', cost: 55500, percentage: 19.9 },
  { category: 'Academic Buildings', cost: 99500, percentage: 35.7 },
  { category: 'Administrative & Support', percentage: 19.3, cost: 39500 },
];

// Solar system data
const solarSystemData = {
  totalGeneration: '18,450 kWh',
  totalConsumption: '16,200 kWh',
  gridFeedIn: '2,250 kWh',
  efficiency: '87.8%',
  monthlyGeneration: [
    { month: 'Jan', generation: 1800, consumption: 1600, feedIn: 200 },
    { month: 'Feb', generation: 1600, consumption: 1400, feedIn: 200 },
    { month: 'Mar', generation: 1900, consumption: 1700, feedIn: 200 },
    { month: 'Apr', generation: 1700, consumption: 1500, feedIn: 200 },
    { month: 'May', generation: 2100, consumption: 1900, feedIn: 200 },
    { month: 'Jun', generation: 2300, consumption: 2100, feedIn: 200 },
    { month: 'Jul', generation: 2100, consumption: 1900, feedIn: 200 },
    { month: 'Aug', generation: 2300, consumption: 2100, feedIn: 200 },
    { month: 'Sep', generation: 2000, consumption: 1800, feedIn: 200 },
    { month: 'Oct', generation: 2100, consumption: 1900, feedIn: 200 },
    { month: 'Nov', generation: 2200, consumption: 2000, feedIn: 200 },
    { month: 'Dec', generation: 1700, consumption: 1500, feedIn: 200 },
  ],
};

// Generator IoT data
const generatorIoTData = {
  status: 'Standby',
  fuelLevel: '85%',
  oilPressure: '45 PSI',
  voltage: '415V',
  current: '0A',
  temperature: '65°C',
  runtime: '0 hours',
  powerOutput: '0 kW',
  batteryLevel: '95%',
  efficiency: '92%',
  gridFeedIn: '0 kW',
  selfConsumption: '0 kW',
  maintenanceDue: '2024-03-15',
};

export default function ElectricityPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [activeTab, setActiveTab] = useState(0);

  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedCategory(event.target.value as string);
    setSelectedBuilding('all');
  };

  const handleBuildingChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedBuilding(event.target.value as string);
  };

  const getFilteredData = () => {
    if (selectedCategory === 'all') return buildingData;
    
    const category = buildingData.find(cat => cat.category === selectedCategory);
    return category ? [category] : [];
  };

  const getFilteredBuildings = () => {
    const filteredData = getFilteredData();
    if (selectedBuilding === 'all') return filteredData;
    
    return filteredData.map(category => ({
      ...category,
      buildings: category.buildings.filter(building => building.name === selectedBuilding)
    }));
  };

  return (
    <Layout>
      <Container maxWidth={false} sx={{ py: 4, px: 2 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
            Electricity Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Comprehensive electricity consumption analysis with detailed breakdowns and cost analysis
          </Typography>
        </Box>

        {/* IoT Integration Note */}
        <Box sx={{ p: 2, backgroundColor: 'info.50', borderRadius: 1, border: '1px solid', borderColor: 'info.200', mb: 4 }}>
          <Typography variant="body2" sx={{ color: 'info.main', fontWeight: 600 }}>
            🔌 Note: IoT integration is required for real-time monitoring of solar generation, consumption, and generator status.
            Current data is based on monthly meter readings and estimates.
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {electricitySummary.map((item) => {
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

        {/* Navigation Dropdowns */}
          <Box sx={{ mb: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                📍 Navigation & Filtering
                </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
                <FormControl sx={{ minWidth: 250 }}>
                  <InputLabel>Select Category</InputLabel>
                  <Select
                    value={selectedCategory}
                    label="Select Category"
                    onChange={handleCategoryChange}
                  >
                    <MenuItem value="all">All Categories</MenuItem>
          {buildingData.map((category) => (
                      <MenuItem key={category.category} value={category.category}>
                {category.category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl sx={{ minWidth: 250 }}>
                  <InputLabel>Select Building/Area</InputLabel>
                  <Select
                    value={selectedBuilding}
                    label="Select Building/Area"
                    onChange={handleBuildingChange}
                    disabled={selectedCategory === 'all'}
                  >
                    <MenuItem value="all">All Buildings</MenuItem>
                    {getFilteredData().map((category) =>
                      category.buildings.map((building) => (
                        <MenuItem key={building.name} value={building.name}>
                              {building.name}
                        </MenuItem>
                      ))
                    )}
                  </Select>
                </FormControl>

                            <Button
                  variant="outlined"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedBuilding('all');
                  }}
                >
                  Reset Filters
                            </Button>
                                  </Box>
                      </CardContent>
                    </Card>
                  </Box>

        {/* Tabs for different views */}
          <Box sx={{ mb: 4 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
            <Tab label="Overview & Trends" />
            <Tab label="Detailed Breakdown" />
            <Tab label="Cost Analysis" />
            <Tab label="Solar & Generator" />
          </Tabs>
          </Box>

        {/* Tab Content */}
        {activeTab === 0 && (
          <>
            {/* Monthly Trends Chart */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Monthly Electricity Consumption & Costs
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="solarGen"
                        stackId="1"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                        name="Solar Generation"
                      />
                      <Area
                        type="monotone"
                        dataKey="solarCons"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        name="Solar Consumption"
                      />
                      <Area
                        type="monotone"
                        dataKey="generator"
                        stackId="1"
                        stroke="#dc2626"
                        fill="#dc2626"
                        name="Generator"
                      />
                      <Area
                        type="monotone"
                        dataKey="grid"
                        stackId="1"
                        stroke="#8b5cf6"
                        fill="#8b5cf6"
                        name="Grid Power"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="cost"
                        stroke="#ef4444"
                        strokeWidth={3}
                        name="Monthly Cost (KES)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Cost Trends */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Monthly Electricity Costs (KES)
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="cost" fill="#ef4444" name="Cost (KES)" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>
          </>
        )}

        {activeTab === 1 && (
          <>
            {/* Building Consumption Breakdown */}
            <Box sx={{ mb: 4 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    {selectedBuilding === 'all' ? 'Building Consumption Overview' : `${selectedBuilding} - Detailed Breakdown`}
                  </Typography>
                  
                  {getFilteredBuildings().map((category) => (
                    <Box key={category.category} sx={{ mb: 4 }}>
                      <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
                        {category.category}
                      </Typography>
                      
                      {category.buildings.map((building) => (
                        <Box key={building.name} sx={{ mb: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                              {building.name}
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              <Chip
                                label={`${building.consumption.toLocaleString()} kWh`}
                                color="primary"
                                size="small"
                              />
                              <Chip
                                label={`${building.percentage}%`}
                                color="secondary"
                                size="small"
                              />
                              <Chip
                                label={`KES ${building.cost.toLocaleString()}`}
                                color="success"
                                size="small"
                              />
                            </Box>
                          </Box>
                          
                          {building.submeters && (
                            <Box sx={{ ml: 3 }}>
                              <Typography variant="body2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                                Sub-meters:
                              </Typography>
                              {building.submeters.map((submeter) => (
                                <Box key={submeter.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    • {submeter.name}
                                  </Typography>
                                  <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Chip
                                      label={`${submeter.consumption} kWh`}
                                      size="small"
                                      variant="outlined"
                                    />
                                    <Chip
                                      label={`KES ${submeter.cost}`}
                                      size="small"
                                      variant="outlined"
                                      color="success"
                                    />
                                  </Box>
                                </Box>
                              ))}
                            </Box>
                          )}
                        </Box>
                      ))}
                    </Box>
                  ))}
                </CardContent>
              </Card>
            </Box>
          </>
        )}

        {activeTab === 2 && (
          <>
            {/* Cost Breakdown */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
              <Box sx={{ flex: '1 1 400px', minWidth: '400px' }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Cost Breakdown by Category
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                          data={costBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                          dataKey="cost"
                      >
                          {costBreakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6'][index]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

              <Box sx={{ flex: '1 1 400px', minWidth: '400px' }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Cost Summary
                    </Typography>
                    <Box sx={{ '& > *': { mb: 2 } }}>
                      {costBreakdown.map((item) => (
                        <Box key={item.category} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {item.category}
                          </Typography>
                          <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                              KES {item.cost.toLocaleString()}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {item.percentage}% of total
                            </Typography>
          </Box>
                        </Box>
                      ))}
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="h6" sx={{ fontWeight: 700 }}>
                          Total Cost
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>
                          KES {costBreakdown.reduce((sum, item) => sum + item.cost, 0).toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </>
        )}

        {activeTab === 3 && (
          <>
            {/* Solar System Overview */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
              <Box sx={{ flex: '2 1 600px', minWidth: '400px' }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Solar System Overview
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3, mb: 3 }}>
                      <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#f59e0b' }}>
                          {solarSystemData.totalGeneration}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Total Generation
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#10b981' }}>
                          {solarSystemData.totalConsumption}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Total Consumption
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#8b5cf6' }}>
                          {solarSystemData.gridFeedIn}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Grid Feed-in
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: '#3b82f6' }}>
                          {solarSystemData.efficiency}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          System Efficiency
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                      Monthly Solar Performance
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={solarSystemData.monthlyGeneration}>
                    <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="generation"
                          stroke="#f59e0b"
                          strokeWidth={3}
                          name="Generation (kWh)"
                        />
                        <Line
                          type="monotone"
                          dataKey="consumption"
                          stroke="#10b981"
                          strokeWidth={3}
                          name="Consumption (kWh)"
                        />
                        <Line
                          type="monotone"
                          dataKey="feedIn"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Grid Feed-in (kWh)"
                        />
                      </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>

              {/* Generator IoT Monitoring */}
              <Box sx={{ mb: 4 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                      Generator IoT Monitoring Dashboard
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                      Real-time monitoring of critical generator parameters for preventive maintenance and outage prevention.
                    </Typography>
                    
                    {/* Generator Gauges */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 4, mb: 4 }}>
                      <Gauge
                        value={Number(generatorIoTData.fuelLevel)}
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
                        value={Number(generatorIoTData.oilPressure)}
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
                        value={Number(generatorIoTData.temperature)}
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
                    
                    {/* Generator Status and Alerts */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3, mb: 3 }}>
                      <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'purple.50', borderRadius: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'purple.main', mb: 1 }}>
                          {generatorIoTData.voltage}V
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Voltage Output
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'blue.50', borderRadius: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'blue.main', mb: 1 }}>
                          {generatorIoTData.current}A
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Current Output
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'green.50', borderRadius: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'green.main', mb: 1 }}>
                          {generatorIoTData.powerOutput}kW
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Power Output
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'center', p: 3, backgroundColor: 'orange.50', borderRadius: 2 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, color: 'orange.main', mb: 1 }}>
                          {generatorIoTData.runtime}h
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          Runtime
                        </Typography>
                      </Box>
                    </Box>
                    
                    {/* Status Indicators */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
                      <Box sx={{ 
                        p: 2, 
                        backgroundColor: generatorIoTData.status === 'Running' ? 'error.50' : 'success.50', 
                        borderRadius: 2, 
                        border: '1px solid', 
                        borderColor: generatorIoTData.status === 'Running' ? 'error.main' : 'success.main' 
                      }}>
                        <Typography variant="body1" sx={{ 
                          color: generatorIoTData.status === 'Running' ? 'error.main' : 'success.main', 
                          fontWeight: 600 
                        }}>
                          Status: {generatorIoTData.status}
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        p: 2, 
                        backgroundColor: generatorIoTData.maintenanceDue ? 'warning.50' : 'success.50', 
                        borderRadius: 2, 
                        border: '1px solid', 
                        borderColor: generatorIoTData.maintenanceDue ? 'warning.main' : 'success.main' 
                      }}>
                        <Typography variant="body1" sx={{ 
                          color: generatorIoTData.maintenanceDue ? 'warning.main' : 'success.main', 
                          fontWeight: 600 
                        }}>
                          Maintenance: {generatorIoTData.maintenanceDue ? 'Due' : 'Up to Date'}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </>
        )}
      </Container>
    </Layout>
  );
}


