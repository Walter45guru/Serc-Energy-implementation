'use client';

import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Assessment,
  Email,
  Download,
  Schedule,
  TrendingUp,
  TrendingDown,
} from '@mui/icons-material';
import Layout from '@/components/Layout/Layout';

// Mock report data
const reportTemplates = [
  {
    id: 'monthly-summary',
    name: 'Monthly Energy Summary',
    description: 'Comprehensive monthly overview of all energy metrics',
    frequency: 'Monthly',
    recipients: ['management@strathmore.ac.ke', 'facilities@strathmore.ac.ke'],
    lastGenerated: '2024-06-01',
    status: 'Active',
  },
  {
    id: 'quarterly-review',
    name: 'Quarterly Performance Review',
    description: 'Detailed quarterly analysis with trends and recommendations',
    frequency: 'Quarterly',
    recipients: ['management@strathmore.ac.ke', 'board@strathmore.ac.ke'],
    lastGenerated: '2024-04-01',
    status: 'Active',
  },
  {
    id: 'annual-report',
    name: 'Annual Sustainability Report',
    description: 'Complete annual sustainability and energy performance report',
    frequency: 'Annual',
    recipients: ['management@strathmore.ac.ke', 'stakeholders@strathmore.ac.ke'],
    lastGenerated: '2023-12-31',
    status: 'Active',
  },
  {
    id: 'carbon-audit',
    name: 'Carbon Footprint Audit',
    description: 'Detailed carbon emissions analysis and reduction opportunities',
    frequency: 'Semi-Annual',
    recipients: ['sustainability@strathmore.ac.ke', 'management@strathmore.ac.ke'],
    lastGenerated: '2024-03-15',
    status: 'Active',
  },
];

const generatedReports = [
  {
    id: 1,
    name: 'June 2024 Energy Summary',
    type: 'Monthly Summary',
    generatedDate: '2024-06-01',
    size: '2.4 MB',
    status: 'Sent',
    recipients: 3,
  },
  {
    id: 2,
    name: 'Q2 2024 Performance Review',
    type: 'Quarterly Review',
    generatedDate: '2024-04-01',
    size: '5.8 MB',
    status: 'Sent',
    recipients: 4,
  },
  {
    id: 3,
    name: 'May 2024 Energy Summary',
    type: 'Monthly Summary',
    generatedDate: '2024-05-01',
    size: '2.1 MB',
    status: 'Sent',
    recipients: 3,
  },
];

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [emailRecipients, setEmailRecipients] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleGenerateReport = () => {
    if (!selectedReport || !startDate || !endDate) {
      setShowError(true);
      return;
    }
    
    // Mock report generation
    setShowSuccess(true);
    console.log('Generating report:', {
      type: selectedReport,
      startDate,
      endDate,
      recipients: emailRecipients,
    });
  };

  const handleScheduleReport = () => {
    if (!selectedReport || !startDate || !endDate) {
      setShowError(true);
      return;
    }
    
    setShowSuccess(true);
    console.log('Scheduling report:', {
      type: selectedReport,
      startDate,
      endDate,
      recipients: emailRecipients,
    });
  };

  const handleDownloadReport = (reportId: number) => {
    console.log('Downloading report:', reportId);
    // Mock download functionality
  };

  const handleResendReport = (reportId: number) => {
    console.log('Resending report:', reportId);
    setShowSuccess(true);
  };

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
            Reports Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Generate, schedule, and manage energy consumption reports for management
          </Typography>
        </Box>

        {/* Report Generation Form */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Generate New Report
                </Typography>
                <Grid container spacing={3}>
                  <Grid xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel>Report Type</InputLabel>
                      <Select
                        value={selectedReport}
                        label="Report Type"
                        onChange={(e) => setSelectedReport(e.target.value)}
                      >
                        {reportTemplates.map((template) => (
                          <MenuItem key={template.id} value={template.id}>
                            {template.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Email Recipients (comma-separated)"
                      value={emailRecipients}
                      onChange={(e) => setEmailRecipients(e.target.value)}
                      placeholder="email1@example.com, email2@example.com"
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Start Date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      type="date"
                      label="End Date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid xs={12}>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button
                        variant="contained"
                        startIcon={<Assessment />}
                        onClick={handleGenerateReport}
                        disabled={!selectedReport || !startDate || !endDate}
                      >
                        Generate Report
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Schedule />}
                        onClick={handleScheduleReport}
                        disabled={!selectedReport || !startDate || !endDate}
                      >
                        Schedule Report
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Report Templates */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Available Report Templates
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Report Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Frequency</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Recipients</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Last Generated</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {reportTemplates.map((template) => (
                        <TableRow key={template.id}>
                          <TableCell component="th" scope="row">
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {template.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {template.description}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={template.frequency}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {template.recipients.length} recipients
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {template.lastGenerated}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={template.status}
                              size="small"
                              color="success"
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

        {/* Generated Reports */}
        <Grid container spacing={3}>
          <Grid xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Recently Generated Reports
                </Typography>
                <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 600 }}>Report Name</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Generated Date</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>Size</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>Status</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>Recipients</TableCell>
                        <TableCell align="center" sx={{ fontWeight: 600 }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {generatedReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell component="th" scope="row">
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                              {report.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {report.type}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {report.generatedDate}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {report.size}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label={report.status}
                              size="small"
                              color="success"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {report.recipients}
                            </Typography>
                          </TableCell>
                          <TableCell align="center">
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                              <Button
                                size="small"
                                startIcon={<Download />}
                                onClick={() => handleDownloadReport(report.id)}
                                variant="outlined"
                              >
                                Download
                              </Button>
                              <Button
                                size="small"
                                startIcon={<Email />}
                                onClick={() => handleResendReport(report.id)}
                                variant="outlined"
                              >
                                Resend
                              </Button>
                            </Box>
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

        {/* Success/Error Messages */}
        <Snackbar
          open={showSuccess}
          autoHideDuration={6000}
          onClose={() => setShowSuccess(false)}
        >
          <Alert onClose={() => setShowSuccess(false)} severity="success">
            Report generated successfully!
          </Alert>
        </Snackbar>

        <Snackbar
          open={showError}
          autoHideDuration={6000}
          onClose={() => setShowError(false)}
        >
          <Alert onClose={() => setShowError(false)} severity="error">
            Please fill in all required fields.
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
}
