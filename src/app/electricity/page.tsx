'use client';

import React, { useState } from 'react';
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
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ElectricBolt,
  SolarPower,
  Power,
  TrendingUp,
  TrendingDown,
  ExpandMore,
  Home,
  Business,
  School,
  SportsEsports,
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
  Treemap,
} from 'recharts';
import Layout from '@/components/Layout/Layout';

// Mock electricity data for Strathmore University buildings
const electricitySummary = [
  {
    title: 'Total Consumption',
    value: '45,230 kWh',
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
    title: 'Generator Usage',
    value: '2,800 kWh',
    change: '-8.7%',
    trend: 'down',
    icon: Power,
    color: '#dc2626',
  },
  {
    title: 'Grid Consumption',
    value: '23,980 kWh',
    change: '+18.3%',
    trend: 'up',
    icon: TrendingUp,
    color: '#10b981',
  },
];

// Building data with submeters
const buildingData = [
  {
    category: 'Residential Areas',
    buildings: [
      {
        name: 'Mbagathi',
        consumption: 2800,
        percentage: 6.2,
        trend: '+2.1%',
        submeters: null,
        type: 'residential',
      },
      {
        name: 'Mvule',
        consumption: 4200,
        percentage: 9.3,
        trend: '+1.8%',
        submeters: [
          { name: 'Mvule Kitchen', consumption: 1800, percentage: 4.0 },
          { name: 'Mvule Main House', consumption: 1600, percentage: 3.5 },
          { name: 'Mvule Laundry', consumption: 800, percentage: 1.8 },
        ],
        type: 'residential',
      },
      {
        name: 'Keri',
        consumption: 2100,
        percentage: 4.6,
        trend: '-0.5%',
        submeters: null,
        type: 'residential',
      },
      {
        name: 'Olokire',
        consumption: 1900,
        percentage: 4.2,
        trend: '+1.2%',
        submeters: null,
        type: 'residential',
      },
      {
        name: 'Salandra',
        consumption: 3800,
        percentage: 8.4,
        trend: '+3.1%',
        submeters: [
          { name: 'Salandra Kitchen', consumption: 1400, percentage: 3.1 },
          { name: 'Salandra Laundry', consumption: 900, percentage: 2.0 },
          { name: 'Salandra Main House', consumption: 1500, percentage: 3.3 },
        ],
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
        percentage: 11.5,
        trend: '+5.2%',
        submeters: [
          { name: 'Shop 1 - Mark Info', consumption: 450, percentage: 1.0 },
          { name: 'Shop 2 - Pate', consumption: 380, percentage: 0.8 },
          { name: 'Shop 3 - Springs of Olive', consumption: 420, percentage: 0.9 },
          { name: 'Shop 4 - Film Production', consumption: 520, percentage: 1.2 },
          { name: 'Shop 4B - Eliteways', consumption: 310, percentage: 0.7 },
          { name: 'Shop 5 - Karate Dojo', consumption: 280, percentage: 0.6 },
          { name: 'Shop 6 - Salon', consumption: 350, percentage: 0.8 },
          { name: 'Shop 7 - Afya Corner', consumption: 410, percentage: 0.9 },
          { name: 'Shop 8 - Upesi', consumption: 330, percentage: 0.7 },
          { name: 'Shop 9 - Faculty Affairs', consumption: 480, percentage: 1.1 },
          { name: 'Shop 10A - Electronics Shop', consumption: 520, percentage: 1.2 },
          { name: 'Shop 10B - Fancy Enterprise', consumption: 290, percentage: 0.6 },
          { name: 'Shop 12 - Financial Aid', consumption: 380, percentage: 0.8 },
          { name: 'Shop 15 - Unknown', consumption: 250, percentage: 0.6 },
          { name: 'SBM Bank', consumption: 680, percentage: 1.5 },
          { name: 'Utawala (SU Partnerships SRCC)', consumption: 420, percentage: 0.9 },
          { name: 'Bookshop', consumption: 390, percentage: 0.9 },
        ],
        type: 'commercial',
      },
      {
        name: 'STC Kitchen',
        consumption: 3100,
        percentage: 6.9,
        trend: '+2.8%',
        submeters: [
          { name: 'SC Main Kitchen', consumption: 1800, percentage: 4.0 },
          { name: 'SC Kitchen 2 Survey Area', consumption: 800, percentage: 1.8 },
          { name: 'Pate (STC Kitchen)', consumption: 500, percentage: 1.1 },
        ],
        type: 'kitchen',
      },
      {
        name: 'STC Main House',
        consumption: 2800,
        percentage: 6.2,
        trend: '+1.5%',
        submeters: null,
        type: 'main',
      },
    ],
  },
  {
    category: 'Academic & Administrative',
    buildings: [
      {
        name: 'SBS',
        consumption: 6800,
        percentage: 15.0,
        trend: '+4.2%',
        submeters: [
          { name: 'SBS Main', consumption: 3200, percentage: 7.1 },
          { name: 'SBS Sub Meter', consumption: 1800, percentage: 4.0 },
          { name: 'KCIC', consumption: 1200, percentage: 2.7 },
          { name: 'KIVA', consumption: 600, percentage: 1.3 },
        ],
        type: 'academic',
      },
      {
        name: 'Phase 2',
        consumption: 4200,
        percentage: 9.3,
        trend: '+2.1%',
        submeters: null,
        type: 'academic',
        description: 'Clinic, Library, Auditorium, Oval, MSB, Workshop',
      },
      {
        name: 'Sport Complex',
        consumption: 2100,
        percentage: 4.6,
        trend: '+0.8%',
        submeters: null,
        type: 'sports',
      },
    ],
  },
];

const monthlyData = [
  { month: 'Jan', total: 4200, solar: 1800, generator: 200, grid: 2200 },
  { month: 'Feb', total: 3800, solar: 1600, generator: 150, grid: 2050 },
  { month: 'Mar', total: 4500, solar: 2000, generator: 180, grid: 2320 },
  { month: 'Apr', total: 4100, solar: 1900, generator: 120, grid: 2080 },
  { month: 'May', total: 4800, solar: 2200, generator: 250, grid: 2350 },
  { month: 'Jun', total: 5200, solar: 2400, generator: 300, grid: 2500 },
];

const sourceBreakdown = [
  { name: 'Solar Generation', value: 18450, color: '#f59e0b' },
  { name: 'Grid Power', value: 23980, color: '#10b981' },
  { name: 'Generator', value: 2800, color: '#dc2626' },
];

const peakHoursData = [
  { hour: '00:00', consumption: 1200 },
  { hour: '04:00', consumption: 800 },
  { hour: '08:00', consumption: 2800 },
  { hour: '12:00', consumption: 3200 },
  { hour: '16:00', consumption: 3500 },
  { hour: '20:00', consumption: 3000 },
  { hour: '24:00', consumption: 1400 },
];

// Prepare data for treemap visualization
const treemapData = buildingData.flatMap(category => 
  category.buildings.map(building => ({
    name: building.name,
    size: building.consumption,
    category: category.category,
    type: building.type,
    hasSubmeters: building.submeters !== null,
  }))
);

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`electricity-tabpanel-${index}`}
      aria-labelledby={`electricity-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

export default function ElectricityPage() {
  const [tabValue, setTabValue] = useState(0);
  const [expandedBuilding, setExpandedBuilding] = useState<string | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleBuildingExpand = (buildingName: string) => {
    setExpandedBuilding(expandedBuilding === buildingName ? null : buildingName);
  };

  const getBuildingIcon = (type: string) => {
    switch (type) {
      case 'residential': return <Home />;
      case 'commercial': return <Business />;
      case 'academic': return <School />;
      case 'kitchen': return <Power />;
      case 'sports': return <SportsEsports />;
      default: return <ElectricBolt />;
    }
  };

  const getBuildingColor = (type: string) => {
    switch (type) {
      case 'residential': return '#3b82f6';
      case 'commercial': return '#f59e0b';
      case 'academic': return '#10b981';
      case 'kitchen': return '#ef4444';
      case 'sports': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
            Electricity Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Monitor electricity consumption across Strathmore University&apos;s residential, commercial, and academic buildings
          </Typography>
        </Box>

        {/* Summary Cards */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
          {electricitySummary.map((item) => {
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

        {/* Tabs for different views */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="electricity dashboard tabs">
            <Tab label="Building Overview" />
            <Tab label="Detailed Breakdown" />
            <Tab label="Trends & Analytics" />
          </Tabs>
        </Box>

        {/* Tab Panel 1: Building Overview */}
        <TabPanel value={tabValue} index={0}>
          {/* Building Consumption Treemap */}
          <Box sx={{ mb: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Building Consumption Overview
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <Treemap
                    data={treemapData}
                    dataKey="size"
                    aspectRatio={4 / 3}
                    stroke="#fff"
                    fill="#8884d8"
                  >
                    <Tooltip
                      content={({ payload }) => {
                        if (payload && payload.length > 0) {
                          const data = payload[0].payload;
                          return (
                            <Box sx={{ p: 2, backgroundColor: 'white', border: '1px solid #ccc', borderRadius: 1 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                {data.name}
                              </Typography>
                              <Typography variant="body2">
                                Consumption: {data.size.toLocaleString()} kWh
                              </Typography>
                              <Typography variant="body2">
                                Category: {data.category}
                              </Typography>
                            </Box>
                          );
                        }
                        return null;
                      }}
                    />
                  </Treemap>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>

          {/* Building Categories */}
          {buildingData.map((category) => (
            <Box key={category.category} sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                {category.category}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                {category.buildings.map((building) => (
                  <Box key={building.name} sx={{ flex: '1 1 300px', minWidth: '300px' }}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Box
                            sx={{
                              backgroundColor: `${getBuildingColor(building.type)}20`,
                              borderRadius: 2,
                              p: 1,
                              mr: 2,
                            }}
                          >
                            {React.cloneElement(getBuildingIcon(building.type), {
                              sx: { color: getBuildingColor(building.type), fontSize: 24 }
                            })}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                              {building.name}
                            </Typography>
                            {building.description && (
                              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                                {building.description}
                              </Typography>
                            )}
                          </Box>
                          <Chip
                            label={building.trend}
                            size="small"
                            color={building.trend.includes('+') ? 'success' : 'error'}
                            variant="outlined"
                          />
                        </Box>
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary' }}>
                            {building.consumption.toLocaleString()} kWh
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {building.percentage}% of total consumption
                          </Typography>
                        </Box>

                        {building.submeters && (
                          <Box>
                            <Button
                              size="small"
                              onClick={() => handleBuildingExpand(building.name)}
                              endIcon={<ExpandMore />}
                              sx={{ mb: 1 }}
                            >
                              View Submeters
                            </Button>
                            
                            {expandedBuilding === building.name && (
                              <Box sx={{ mt: 2, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                                  Submeters:
                                </Typography>
                                {building.submeters.map((submeter) => (
                                  <Box key={submeter.name} sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                      {submeter.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                      {submeter.consumption.toLocaleString()} kWh
                                    </Typography>
                                  </Box>
                                ))}
                              </Box>
                            )}
                          </Box>
                        )}
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </TabPanel>

        {/* Tab Panel 2: Detailed Breakdown */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Detailed Building Consumption
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Building</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Category</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Consumption (kWh)</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Percentage</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>Trend</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>Submeters</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {buildingData.flatMap(category => 
                        category.buildings.map((building) => (
                          <TableRow key={building.name}>
                            <TableCell component="th" scope="row">
                              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {building.name}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={category.category}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2">
                                {building.consumption.toLocaleString()}
                              </Typography>
                            </TableCell>
                            <TableCell align="right">
                              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {building.percentage}%
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={building.trend}
                                size="small"
                                color={building.trend.includes('+') ? 'success' : 'error'}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Chip
                                label={building.submeters ? `${building.submeters.length} submeters` : 'Single meter'}
                                size="small"
                                color={building.submeters ? 'info' : 'default'}
                                variant="outlined"
                              />
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>

        {/* Tab Panel 3: Trends & Analytics */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4 }}>
            {/* Monthly Trends */}
            <Box sx={{ flex: '2 1 600px', minWidth: '400px' }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Monthly Electricity Trends
                  </Typography>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="solar"
                        stackId="1"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                        name="Solar Generation"
                      />
                      <Area
                        type="monotone"
                        dataKey="grid"
                        stackId="1"
                        stroke="#10b981"
                        fill="#10b981"
                        name="Grid Power"
                      />
                      <Area
                        type="monotone"
                        dataKey="generator"
                        stackId="1"
                        stroke="#dc2626"
                        fill="#dc2626"
                        name="Generator"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </Box>

            {/* Source Breakdown */}
            <Box sx={{ flex: '1 1 300px', minWidth: '300px' }}>
              <Card>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                    Power Source Breakdown
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

          {/* Peak Hours */}
          <Box sx={{ mb: 4 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Daily Peak Hours Pattern
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={peakHoursData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="consumption" fill="#3b82f6" name="Consumption (kWh)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>
        </TabPanel>
      </Container>
    </Layout>
  );
}


