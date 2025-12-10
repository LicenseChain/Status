interface ServiceCheck {
  name: string
  url: string
  timeout: number
  expectedStatus?: number
}

interface ServiceStatus {
  name: string
  status: 'operational' | 'degraded' | 'outage' | 'maintenance'
  description: string
  lastChecked: string
  responseTime?: number
  icon: React.ComponentType<{ className?: string }>
  uptime: string
  category: 'core' | 'infrastructure' | 'payment'
  url?: string
}

// Service endpoints to monitor
const serviceChecks: ServiceCheck[] = [
  {
    name: 'API Service',
    url: 'https://api.licensechain.app/health',
    timeout: 5000,
    expectedStatus: 200
  },
  {
    name: 'Website',
    url: 'https://licensechain.app',
    timeout: 10000,
    expectedStatus: 200
  },
  {
    name: 'Documentation',
    url: 'https://docs.licensechain.app',
    timeout: 10000,
    expectedStatus: 200
  },
  {
    name: 'Dashboard',
    url: 'https://dashboard.licensechain.app',
    timeout: 10000,
    expectedStatus: 200
  }
]

// Mock services for services that don't have health endpoints
const mockServices = [
  {
    name: 'Authentication',
    status: 'operational' as const,
    description: 'User authentication and authorization services',
    lastChecked: '1 minute ago',
    responseTime: 67,
    uptime: '99.9%',
    category: 'core' as const
  },
  {
    name: 'Payment Processing',
    status: 'operational' as const,
    description: 'Stripe payment processing and webhooks',
    lastChecked: '2 minutes ago',
    responseTime: 234,
    uptime: '99.5%',
    category: 'payment' as const
  }
]

export async function checkServiceStatus(service: ServiceCheck): Promise<Partial<ServiceStatus>> {
  const startTime = Date.now()
  
  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), service.timeout)
    
    const response = await fetch(service.url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'LicenseChain-Status-Monitor/1.0'
      }
    })
    
    clearTimeout(timeoutId)
    const responseTime = Date.now() - startTime
    
    if (response.ok) {
      return {
        status: 'operational',
        responseTime,
        lastChecked: 'Just now'
      }
    } else if (response.status >= 500) {
      return {
        status: 'outage',
        responseTime,
        lastChecked: 'Just now'
      }
    } else {
      return {
        status: 'degraded',
        responseTime,
        lastChecked: 'Just now'
      }
    }
  } catch (error) {
    const responseTime = Date.now() - startTime
    
    if (error instanceof Error && error.name === 'AbortError') {
      return {
        status: 'outage',
        responseTime,
        lastChecked: 'Just now'
      }
    }
    
    return {
      status: 'outage',
      responseTime,
      lastChecked: 'Just now'
    }
  }
}

export async function getAllServiceStatuses(): Promise<ServiceStatus[]> {
  const results: ServiceStatus[] = []
  
  // Check real services
  for (const service of serviceChecks) {
    const status = await checkServiceStatus(service)
    const serviceConfig = getServiceConfig(service.name)
    
    results.push({
      ...serviceConfig,
      ...status,
      lastChecked: status.lastChecked || 'Just now',
      icon: () => null // Will be set by the component
    } as ServiceStatus)
  }
  
  // Add mock services
  for (const mockService of mockServices) {
    const serviceConfig = getServiceConfig(mockService.name)
    results.push({
      ...serviceConfig,
      ...mockService,
      icon: () => null // Will be set by the component
    } as ServiceStatus)
  }
  
  return results
}

function getServiceConfig(name: string): Omit<ServiceStatus, 'icon'> {
  const configs: Record<string, Omit<ServiceStatus, 'icon'>> = {
    'API Service': {
      name: 'API Service',
      description: 'Core API endpoints for license management and verification',
      category: 'core',
      uptime: '99.9%',
      status: 'operational',
      lastChecked: 'Just now'
    },
    'Website': {
      name: 'Website',
      description: 'LicenseChain website and marketing pages',
      category: 'infrastructure',
      uptime: '99.8%',
      status: 'operational',
      lastChecked: 'Just now'
    },
    'Documentation': {
      name: 'Documentation',
      description: 'API documentation and developer guides',
      category: 'infrastructure',
      uptime: '99.7%',
      status: 'operational',
      lastChecked: 'Just now'
    },
    'Dashboard': {
      name: 'Dashboard',
      description: 'User dashboard for license management',
      category: 'core',
      uptime: '99.6%',
      status: 'operational',
      lastChecked: 'Just now'
    },
    'Authentication': {
      name: 'Authentication',
      description: 'User authentication and authorization services',
      category: 'core',
      uptime: '99.9%',
      status: 'operational',
      lastChecked: 'Just now'
    },
    'Payment Processing': {
      name: 'Payment Processing',
      description: 'Stripe payment processing and webhooks',
      category: 'payment',
      uptime: '99.5%',
      status: 'operational',
      lastChecked: 'Just now'
    }
  }
  
  return configs[name] || {
    name,
    description: 'Service monitoring',
    category: 'core',
    uptime: '99.0%',
    status: 'operational',
    lastChecked: 'Just now'
  }
}

export function calculateUptime(serviceName: string): string {
  // In a real implementation, this would calculate from historical data
  // For now, return mock uptime percentages
  const uptimes: Record<string, string> = {
    'API Service': '99.9%',
    'Website': '99.8%',
    'Documentation': '99.7%',
    'Dashboard': '99.6%',
    'Authentication': '99.9%',
    'Payment Processing': '99.5%'
  }
  
  return uptimes[serviceName] || '99.0%'
}
