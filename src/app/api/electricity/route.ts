import { NextResponse } from 'next/server';

// Mock data - replace with actual Excel file reading logic
const mockElectricityData = {
  summary: {
    totalConsumption: 45230,
    solarGeneration: 18450,
    generatorUsage: 2800,
    gridConsumption: 23980,
  },
  monthlyData: [
    { month: 'Jan', total: 4200, solar: 1800, generator: 200, grid: 2200 },
    { month: 'Feb', total: 3800, solar: 1600, generator: 150, grid: 2050 },
    { month: 'Mar', total: 4500, solar: 2000, generator: 180, grid: 2320 },
    { month: 'Apr', total: 4100, solar: 1900, generator: 120, grid: 2080 },
    { month: 'May', total: 4800, solar: 2200, generator: 250, grid: 2350 },
    { month: 'Jun', total: 5200, solar: 2400, generator: 300, grid: 2500 },
  ],
  buildingData: [
    { building: 'Main Campus', consumption: 18000, percentage: 39.8, trend: '+5.2%' },
    { building: 'Business School', consumption: 12000, percentage: 26.5, trend: '+3.8%' },
    { building: 'Engineering', consumption: 9800, percentage: 21.7, trend: '+7.1%' },
    { building: 'Library', consumption: 3500, percentage: 7.7, trend: '-2.1%' },
    { building: 'Student Center', consumption: 4200, percentage: 9.3, trend: '+1.5%' },
  ],
};

export async function GET() {
  try {
    // TODO: Implement Excel file reading logic here
    // Example: const data = await readExcelFile('electricity-data.xlsx');
    
    return NextResponse.json(mockElectricityData);
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch electricity data' },
      { status: 500 }
    );
  }
}
