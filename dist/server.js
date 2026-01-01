import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import healthRoutes from './health/health.route.js';
export default async function buildServer(opts = {}) {
    const app = Fastify({ logger: true });
    // Plugins
    await app.register(fastifyCors, { origin: true });
    await app.register(fastifySwagger, { mode: 'dynamic' });
    // Correlation + tenant middleware: garante `x-correlation-id` e `x-tenant-id` no request
    app.addHook('onRequest', async (req, _reply) => {
        const headers = req.headers;
        const correlation = headers['x-correlation-id'] || process.env.CORRELATION_ID || `cid-${Date.now()}`;
        headers['x-correlation-id'] = correlation;
        const tenant = headers['x-tenant-id'] || 'default';
        req.correlationId = correlation;
        req.tenantId = tenant;
        try {
            const child = req.log.child ? req.log.child({ correlationId: correlation, tenantId: tenant }) : req.log;
            req.requestLogger = child;
        }
        catch (e) {
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
//# sourceMappingURL=server.js.map