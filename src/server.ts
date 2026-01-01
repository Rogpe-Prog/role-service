import Fastify, { FastifyInstance } from 'fastify';
import { v4 as uuidv4 } from 'uuid';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import healthRoutes from './health/health.route.js';

export default async function buildServer(opts = {}): Promise<FastifyInstance> {
  const app = Fastify({ logger: true });

  // Plugins
  await app.register(fastifyCors, { origin: true });
  await app.register(fastifySwagger, { mode: 'dynamic' });

  // Correlation + tenant middleware: garante `x-correlation-id` e `x-tenant-id` no request
  app.addHook('onRequest', async (req, _reply) => {
    const headers = req.headers as Record<string, any>;
    const correlation = (headers['x-correlation-id'] as string) || process.env.CORRELATION_ID || `cid-${Date.now()}`;
    headers['x-correlation-id'] = correlation;
    const tenant = (headers['x-tenant-id'] as string) || 'default';
    (req as any).correlationId = correlation;
    (req as any).tenantId = tenant;
    try {
      const child = (req.log as any).child ? (req.log as any).child({ correlationId: correlation, tenantId: tenant }) : req.log;
      (req as any).requestLogger = child;
    } catch (e) {
      // ignore logger decoration errors
    }
  });

  // Health routes
  await app.register(healthRoutes, { prefix: '/health' });

  app.get('/', async () => ({
    service: 'role-service',
    status: 'running',
    version: '1.0.0'
  }));

  return app;
}
