/**
 * Database connection and utilities
 * This file provides a singleton Prisma client instance
 * 
 * IMPORTANT: This database is shared with Dashboard, API, and Website
 * All repos use the same DATABASE_URL and unified schema
 */

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Configure DATABASE_URL for Supabase Session Pooler (pgBouncer)
// pgBouncer doesn't support prepared statements, so we need to disable them
function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL || '';
  
  // If using Supabase Session Pooler (port 5432 or 6543), ensure pgbouncer=true is set
  if (url.includes('pooler.supabase.com') || url.includes(':6543')) {
    // Check if pgbouncer parameter is already present
    if (!url.includes('pgbouncer=true') && !url.includes('?')) {
      return `${url}?pgbouncer=true`;
    }
    if (!url.includes('pgbouncer=true') && url.includes('?')) {
      return `${url}&pgbouncer=true`;
    }
  }
  
  return url;
}

const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
export const db = prisma;
