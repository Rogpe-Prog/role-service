import { FastifyInstance } from 'fastify';

export default async function (app: FastifyInstance) {
  app.get('/', async () => ({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'role-service'
  }));

  app.get('/readiness', async () => ({
    ready: true,
    timestamp: new Date().toISOString()
  }));
}
