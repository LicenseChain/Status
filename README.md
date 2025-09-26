# LicenseChain Status Page

A modern, professional status page for LicenseChain services built with Next.js 14 and Tailwind CSS.

## Features

- **Real-time Status Monitoring** - Live updates of all service statuses
- **Modern UI/UX Design** - Clean, professional interface with smooth animations
- **Dark Mode Support** - Toggle between light and dark themes
- **Responsive Design** - Works perfectly on all devices
- **Service Categories** - Organized by Core Services, Infrastructure, and Payment Processing
- **Performance Metrics** - Real-time uptime and response time data
- **Incident Management** - Track and display service incidents
- **Auto-refresh** - Automatic status updates every minute

## Design Highlights

### Visual Improvements
- **Gradient Backgrounds** - Beautiful gradient overlays for visual appeal
- **Card-based Layout** - Modern card design with hover effects
- **Status Indicators** - Color-coded status bars and icons
- **Smooth Animations** - Fade-in and slide-up animations for better UX
- **Professional Typography** - Clear hierarchy and readable fonts

### User Experience
- **Sticky Header** - Always accessible navigation and refresh button
- **Dark Mode Toggle** - Easy theme switching
- **Hover Effects** - Interactive elements with smooth transitions
- **Loading States** - Visual feedback during refresh operations
- **Mobile Optimized** - Responsive grid layout for all screen sizes

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Custom Animations** - CSS keyframes for smooth transitions

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

The status page is designed to be deployed on Vercel or any static hosting service.

```bash
# Build the project
npm run build

# Deploy to Vercel
vercel --prod
```

## Customization

### Adding New Services
Update the `services` array in `src/app/page.tsx`:

```typescript
{
  name: 'New Service',
  status: 'operational',
  description: 'Service description',
  lastChecked: '1 minute ago',
  responseTime: 100,
  icon: YourIcon,
  uptime: '99.9%',
  category: 'core'
}
```

### Styling
The design uses Tailwind CSS classes and can be customized by modifying:
- `src/app/globals.css` - Global styles and animations
- Component files - Individual component styling
- `tailwind.config.js` - Tailwind configuration

## Status Page URL

The status page is available at: [https://status.licensechain.app](https://status.licensechain.app)

## License

This project is part of the LicenseChain ecosystem and follows the same licensing terms.