# LicenseChain Status Page - Vercel Deployment Guide

## 🚀 Quick Deployment to Vercel

The LicenseChain Status Page is now ready for deployment to Vercel with real-time monitoring capabilities.

### Repository
- **GitHub**: https://github.com/LicenseChain/Status
- **Live URL**: https://status.licensechain.app (after deployment)

## 📋 Deployment Steps

### 1. Connect to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import from GitHub: `LicenseChain/Status`
4. Select the repository

### 2. Configure Project
- **Framework Preset**: Next.js
- **Root Directory**: `./` (default)
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (default)
- **Install Command**: `npm install`

### 3. Environment Variables
No environment variables are required for basic functionality.

### 4. Custom Domain
1. Go to Project Settings → Domains
2. Add custom domain: `status.licensechain.app`
3. Configure DNS records as instructed by Vercel

## 🔧 Features Included

### ✅ Real-time Monitoring
- **Live Health Checks** - Monitors actual service endpoints
- **Auto-refresh** - Updates every 30 seconds
- **Manual Refresh** - User-triggered updates
- **Error Handling** - Graceful failure management

### ✅ Service Monitoring
- **API Service** - `https://api.licensechain.app/health`
- **Website** - `https://licensechain.app`
- **Documentation** - `https://docs.licensechain.app`
- **Dashboard** - `https://dashboard.licensechain.app`
- **Authentication** - Internal service monitoring
- **Payment Processing** - Internal service monitoring

### ✅ Professional UI/UX
- **Modern Design** - Clean, professional interface
- **Dark Mode** - Toggle between light and dark themes
- **Responsive** - Mobile-friendly design
- **Animations** - Smooth transitions and loading states
- **Real-time Updates** - Live data without page refresh

## 📊 API Endpoints

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

## 🛠️ Technical Details

### Build Configuration
- **Framework**: Next.js 14
- **TypeScript**: Full type safety
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

### Performance
- **Static Generation**: Optimized for speed
- **API Routes**: Server-side health checking
- **Caching**: 30-second cache for health checks
- **Error Boundaries**: Graceful error handling

## 🔍 Monitoring Configuration

### Health Check Endpoints
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
- **Maintenance**: Custom status (future feature)

## 📱 User Experience

### Real-time Features
- **Auto-refresh**: Every 30 seconds
- **Manual Refresh**: Prominent refresh button
- **Loading States**: Visual feedback during updates
- **Error Recovery**: Retry functionality on failures

### Visual Design
- **Status Cards**: Color-coded service status
- **Performance Metrics**: Live statistics dashboard
- **Incident History**: Recent incidents and maintenance
- **Dark Mode**: Toggle for user preference

## 🚀 Deployment Commands

### Local Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm run deploy:vercel
```

## 📋 Post-Deployment Checklist

- [ ] Deploy to Vercel
- [ ] Configure custom domain `status.licensechain.app`
- [ ] Test all service endpoints
- [ ] Verify auto-refresh functionality
- [ ] Test error handling
- [ ] Validate mobile responsiveness
- [ ] Check dark mode functionality
- [ ] Monitor performance metrics

## 🔧 Customization

### Adding New Services
1. Update `serviceChecks` array in `src/lib/status-monitor.ts`
2. Add service configuration in `getServiceConfig()`
3. Update icon mapping in the main component

### Modifying Check Intervals
- **Auto-refresh**: Change interval in `useEffect` (currently 30000ms)
- **Service Timeouts**: Modify `timeout` values in `serviceChecks`

## 📞 Support

For issues or questions:
- **Repository**: https://github.com/LicenseChain/Status
- **Documentation**: This deployment guide
- **Live Status**: https://status.licensechain.app

---

**Status**: ✅ **Ready for Production Deployment**
**Last Updated**: January 2024
**Version**: 2.0.0 (Real-time Monitoring)
