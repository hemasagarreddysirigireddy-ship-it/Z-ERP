# Zollid ERP Dashboard

A modern, responsive, and interactive ERP dashboard built with React, TypeScript, and Vite.

## Features

### 🎨 Modern UI/UX
- Clean and professional design with gradient accents
- Smooth animations and transitions
- Glass morphism effects and modern shadows
- Fully responsive design (Desktop, Tablet, Mobile)

### 📊 Dashboard Overview
- **Real-time Statistics**: 6 key metric cards with trend indicators
  - Templates (3 Approved)
  - Total Leads (136)
  - Contacts (56)
  - Active Clients (156)
  - Total Revenue (₹24.5k)
  - Completion Rate (87.5%)

### 🎯 Key Components

#### Navigation
- **Sidebar**: Collapsible navigation with icons and badges
  - Dashboard
  - Projects
  - Invoices Builder
  - Tasks (with notification badge)
  - Leads
  - Contacts
  - Appointments
  - Workflows

#### Header Features
- Global search bar
- View selector (Week/Month/Year)
- Quick action buttons (Share, History, Notifications)
- New button with dropdown
- Dashboard options

#### Dashboard Widgets
- **Quick Actions**: 4 quick action buttons for common tasks
- **Stat Cards**: Interactive cards with hover effects and trend indicators
- **Recent Activities**: Real-time activity feed
- **Upcoming Tasks**: Task list with priority indicators and checkboxes
- **Performance Chart**: Visual performance overview

### 🎨 Design System

#### Color Palette
- Primary: Indigo (#6366f1)
- Success: Green (#10b981)
- Warning: Amber (#f59e0b)
- Danger: Red (#ef4444)
- Info: Blue (#3b82f6)

#### Typography
- System fonts for optimal performance
- Clear hierarchy with appropriate sizing
- Proper spacing and line heights

#### Icons
- Lucide React icons throughout
- Consistent sizing and styling
- Colorful icon backgrounds

### 📱 Responsive Design

#### Desktop (>1024px)
- Full sidebar visible
- Multi-column grid layouts
- All features accessible

#### Tablet (768px - 1024px)
- Collapsible sidebar
- Adjusted grid columns
- Optimized spacing

#### Mobile (<768px)
- Hamburger menu
- Slide-out sidebar with overlay
- Single column layouts
- Touch-optimized buttons
- Simplified header

## Technology Stack

- **React 19.2.0**: Modern React with latest features
- **TypeScript 5.9.3**: Type-safe development
- **Vite 7.2.4**: Lightning-fast build tool
- **React Router DOM 7.9.6**: Client-side routing
- **Lucide React 0.555.0**: Beautiful, consistent icons
- **ESLint**: Code quality and consistency

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
Frontend/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx          # Sidebar navigation component
│   │   ├── Header.tsx           # Top header component
│   │   └── StatCard.tsx         # Reusable stat card component
│   ├── Pages/
│   │   ├── Dashboard.tsx        # Main dashboard page
│   │   └── login.tsx           # Login page
│   ├── styles/
│   │   └── Dashboard.css       # Dashboard styles
│   ├── App.tsx                 # Main app component with routing
│   ├── main.tsx               # App entry point
│   └── index.css              # Global styles
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Component Overview

### Sidebar Component
- Responsive navigation menu
- Mobile-friendly with overlay
- Active state indicators
- User profile section
- Badge notifications

### Header Component
- Global search functionality
- View mode selector
- Icon buttons for quick actions
- Notification indicator
- Primary action button

### StatCard Component
- Reusable metric card
- Icon with custom color
- Value display
- Trend indicators (up/down)
- Hover effects

### Dashboard Page
- Grid layout for stats
- Activity feed
- Task management
- Performance visualization
- Quick action buttons

## Customization

### Adding New Routes
Edit `src/App.tsx` and add new routes:
```tsx
<Route path="/your-route" element={<YourComponent />} />
```

### Modifying Colors
Update CSS variables in `src/styles/Dashboard.css`:
```css
:root {
  --primary: #your-color;
  --secondary: #your-color;
}
```

### Adding New Stat Cards
In `Dashboard.tsx`, add to the `statsData` array:
```tsx
{
  title: 'Your Metric',
  value: '100',
  subtitle: 'Your subtitle',
  trend: { value: '+10%', isPositive: true, label: 'vs last month' },
  icon: YourIcon,
  iconColor: 'icon-color-class'
}
```

## Future Enhancements

- [ ] Add data visualization charts (Chart.js/Recharts)
- [ ] Implement dark mode toggle
- [ ] Add user authentication
- [ ] Connect to backend API
- [ ] Add data filtering and sorting
- [ ] Implement real-time updates
- [ ] Add export functionality
- [ ] Create additional pages (Projects, Leads, etc.)
- [ ] Add notifications system
- [ ] Implement advanced search

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized bundle size with Vite
- Lazy loading for better performance
- CSS optimizations
- Minimal dependencies
- Fast refresh during development

## Contributing

1. Create a new branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

Proprietary - Zollid ERP

## Contact

For support or questions, contact: admin@zollid.com

---

Built with ❤️ for Zollid ERP
