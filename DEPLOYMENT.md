# LicenseChain Status Page Deployment Guide

## Real-time Status Monitoring

The LicenseChain Status Page now features **real-time monitoring** of all services with automatic health checks and live data updates.

## Features Implemented

### ✅ Real-time Data Fetching
- **Live Health Checks** - Monitors actual service endpoints
- **Auto-refresh** - Updates every 30 seconds automatically
- **Manual Refresh** - Users can manually refresh status
- **Error Handling** - Graceful error states and retry functionality

### ✅ Service Monitoring
- **API Service** - `https://api.licensechain.app/health`
- **Website** - `https://licensechain.app`
- **Documentation** - `https://docs.licensechain.app`
- **Dashboard** - `https://dashboard.licensechain.app`
- **Authentication** - Mock service (internal)
- **Payment Processing** - Mock service (internal)

### ✅ Performance Metrics
- **Real Response Times** - Actual measured response times
- **Service Uptime** - Calculated from operational services
- **Error Tracking** - Count of services with issues
- **Live Statistics** - Real-time performance data

## Deployment Steps

### 1. Build the Application
```bash
cd apps/status
npm run build
```

### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

### 3. Environment Variables
No environment variables are required for basic functionality.

### 4. Custom Domain
Configure the custom domain `status.licensechain.app` in Vercel dashboard.

## API Endpoints

### GET /api/status
Returns real-time status of all services:

```json
{
  "status": "operational",
  "services": [
    {
      "name": "API Service",
      "status": "operational",
      "description": "Core API endpoints for license management and verification",
      "lastChecked": "Just now",
      "responseTime": 45,
      "uptime": "99.9%",
      "category": "core"
    }
  ],
  "metrics": {
    "operational": 6,
    "total": 6,
    "avgResponseTime": 120,
    "uptime": "99.8%"
  },
  "lastUpdated": "2024-01-15T10:30:00.000Z"
}
```

## Monitoring Configuration

### Service Health Checks
The status monitor checks the following endpoints:

1. **API Service**: `GET https://api.licensechain.app/health`
   - Expected Status: 200
   - Timeout: 5 seconds

2. **Website**: `GET https://licensechain.app`
   - Expected Status: 200
   - Timeout: 10 seconds

3. **Documentation**: `GET https://docs.licensechain.app`
   - Expected Status: 200
   - Timeout: 10 seconds

4. **Dashboard**: `GET https://dashboard.licensechain.app`
   - Expected Status: 200
   - Timeout: 10 seconds

### Status Determination
- **Operational**: HTTP 200 response within timeout
- **Degraded**: HTTP 4xx response
- **Outage**: HTTP 5xx response or timeout
- **Maintenance**: Custom status (not implemented yet)

## Real-time Updates

### Auto-refresh
- **Interval**: 30 seconds
- **Background**: Runs automatically
- **UI**: Shows loading states during refresh

### Manual Refresh
- **Button**: Prominent refresh button in header
- **Loading**: Visual feedback during refresh
- **Error Handling**: Retry on failure

## Performance Optimizations

### Caching
- **API Responses**: Cached for 30 seconds
- **Service Checks**: Parallel execution
- **Error States**: Graceful degradation

### Monitoring
- **Response Times**: Tracked and displayed
- **Uptime**: Calculated from service availability
- **Error Rates**: Monitored and reported

## Customization

### Adding New Services
1. Update `serviceChecks` array in `src/lib/status-monitor.ts`
2. Add service configuration in `getServiceConfig()`
3. Update icon mapping in the main component

### Modifying Check Intervals
- **Auto-refresh**: Change interval in `useEffect` (currently 30000ms)
- **Service Timeouts**: Modify `timeout` values in `serviceChecks`

### Styling
- **Theme**: Dark/light mode toggle
- **Colors**: Status-based color coding
- **Animations**: Smooth transitions and loading states

## Production Checklist

- [ ] Deploy to Vercel
- [ ] Configure custom domain `status.licensechain.app`
- [ ] Test all service endpoints
- [ ] Verify auto-refresh functionality
- [ ] Test error handling
- [ ] Validate mobile responsiveness
- [ ] Check dark mode functionality

## Monitoring & Alerts

### Service Health
- **Uptime Monitoring**: Track service availability
- **Response Time**: Monitor performance metrics
- **Error Tracking**: Count and categorize failures

### User Experience
- **Page Load**: Monitor initial load times
- [ ] **API Performance**: Track `/api/status` response times
- [ ] **Error Rates**: Monitor failed health checks

## Support

For issues or questions about the status page:
- **Repository**: LicenseChain Status Page
- **Documentation**: This deployment guide
- **Monitoring**: Real-time status at `https://status.licensechain.app`

---

**Status**: ✅ **Ready for Production Deployment**
**Last Updated**: January 2024
**Version**: 2.0.0 (Real-time Monitoring)
