# LicenseChain Status Page

A real-time status page for all LicenseChain services, built with Next.js and deployed on Vercel.

## Features

- Real-time service status monitoring
- Incident tracking and reporting
- Responsive design
- Auto-refresh functionality
- Service response time monitoring

## Services Monitored

- **API Service** - Core API endpoints for license management
- **Website** - Main LicenseChain website
- **Documentation** - API docs and developer guides
- **Dashboard** - User dashboard for license management
- **Authentication** - User auth and authorization
- **Payment Processing** - Stripe payment processing

## Development

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

This status page is designed to be deployed on Vercel:

1. Connect your GitHub repository to Vercel
2. Set the build command to `npm run build`
3. Set the output directory to `.next`
4. Deploy!

## Configuration

The status page can be configured by modifying the services array in `src/app/page.tsx`. You can add new services, update statuses, and configure monitoring intervals.

## API Integration

To make this status page truly real-time, you can integrate it with monitoring services like:

- UptimeRobot
- Pingdom
- StatusCake
- Custom monitoring endpoints

The page is designed to easily accept real-time data from these services.