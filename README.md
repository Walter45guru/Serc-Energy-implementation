# Strathmore University Energy Dashboard

A comprehensive energy consumption and sustainability monitoring dashboard built with Next.js, Material-UI, and Recharts.

## 🚀 Features

### 📊 Overview Dashboard
- **Summary Cards**: Total electricity, water, fuel consumption, and carbon footprint
- **Trend Charts**: Monthly energy consumption trends
- **Building Analysis**: Consumption breakdown by building
- **Quick Insights**: Key findings and recommendations

### ⚡ Electricity Dashboard
- **Power Sources**: Grid power, solar generation, and generator usage
- **Building Consumption**: Detailed breakdown by building
- **Peak Hours Analysis**: Daily consumption patterns
- **Source Distribution**: Pie chart showing power source breakdown

### 💧 Water Dashboard
- **Water Sources**: 3 boreholes + 2 NAIWASCO sources
- **Consumption Trends**: Monthly water usage patterns
- **Building Efficiency**: Water consumption by building with efficiency ratings
- **Source Distribution**: Visual breakdown of water sources

### ⛽ Fuel Dashboard
- **Fleet Overview**: Total consumption, cost, and distance
- **Vehicle Analysis**: Individual vehicle consumption and efficiency
- **Cost Breakdown**: Fuel purchase, maintenance, insurance costs
- **Efficiency Metrics**: km/litre and cost per km calculations

### 🌱 Carbon Footprint Dashboard
- **Emissions Tracking**: CO₂ emissions from all sources
- **Sustainability Metrics**: Performance against targets
- **Reduction Opportunities**: Cost-benefit analysis of improvement projects
- **Annual Targets**: Progress towards carbon reduction goals

### 📋 Reports Dashboard
- **Report Generation**: Create custom reports with date ranges
- **Email Integration**: Send reports to management automatically
- **Scheduling**: Set up recurring report generation
- **Template Library**: Pre-built report templates

## 🛠️ Technology Stack

- **Frontend**: Next.js 14 with TypeScript
- **UI Components**: Material-UI (MUI) v6
- **Charts**: Recharts for data visualization
- **Styling**: MUI's built-in styling system
- **Icons**: Material Icons
- **Routing**: Next.js App Router

## 🎨 Design Features

- **Brand Colors**: Strathmore University navy blue, red, and gold
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Sidebar**: Navy blue sidebar with white content area
- **Modern UI**: Clean cards, rounded corners, and subtle shadows
- **Interactive Charts**: Hover effects and tooltips

## 📁 Project Structure

```
strathmore-energy-dashboard/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Overview dashboard
│   │   ├── electricity/       # Electricity dashboard
│   │   ├── water/            # Water dashboard
│   │   ├── fuel/             # Fuel dashboard
│   │   ├── carbon/           # Carbon footprint dashboard
│   │   └── reports/          # Reports dashboard
│   ├── components/            # Reusable components
│   │   └── Layout/           # Sidebar and main layout
│   └── theme/                # MUI theme configuration
├── public/                    # Static assets
│   └── strathmore-logo.png   # University logo
└── package.json              # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd strathmore-energy-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Data Integration

### Current State
The dashboard currently uses mock data for demonstration purposes. All data is defined in the respective page components.

### Real Data Integration
To integrate with your actual Excel datasets:

1. **Install Excel parsing library**
   ```bash
   npm install xlsx papaparse
   ```

2. **Create API routes** in `src/app/api/`:
   - `/api/electricity` - Electricity consumption data
   - `/api/water` - Water consumption data
   - `/api/fuel` - Fuel consumption data
   - `/api/carbon` - Carbon footprint calculations

3. **Replace mock data** in each dashboard page with API calls

4. **Data Structure Example**:
   ```typescript
   interface ElectricityData {
     month: string;
     total: number;
     solar: number;
     generator: number;
     grid: number;
   }
   ```

## 🔧 Customization

### Theme Colors
Edit `src/theme/theme.ts` to modify:
- Primary colors (sidebar, buttons)
- Secondary colors (accent elements)
- Background colors
- Typography styles

### Adding New Metrics
1. Create new data structures
2. Add new chart components
3. Update the relevant dashboard page
4. Add navigation to the sidebar

### New Dashboard Pages
1. Create new folder in `src/app/`
2. Add page component with Layout wrapper
3. Update sidebar navigation in `src/components/Layout/Sidebar.tsx`

## 📱 Responsive Design

The dashboard is fully responsive and works on:
- **Desktop**: Full sidebar + content layout
- **Tablet**: Collapsible sidebar
- **Mobile**: Hamburger menu for navigation

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local` for any API keys or configuration:
```env
NEXT_PUBLIC_API_URL=your-api-endpoint
NEXT_PUBLIC_EMAIL_SERVICE=your-email-service
```

## 📈 Future Enhancements

- **Real-time Data**: Live monitoring with WebSocket connections
- **Advanced Analytics**: Machine learning for consumption predictions
- **Mobile App**: React Native companion app
- **Integration**: Connect with building management systems
- **Alerts**: Automated notifications for unusual consumption patterns
- **Export**: PDF and Excel report generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is developed for Strathmore University. All rights reserved.

## 📞 Support

For technical support or questions about the dashboard:
- Email: [your-email@strathmore.ac.ke]
- GitHub Issues: [repository-issues-url]

---

**Built with ❤️ for Strathmore University's Energy Management Team**
