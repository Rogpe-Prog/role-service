import { FastifyInstance } from 'fastify';
import { SampleController } from '@controllers/sample.controller';

export default async function (app: FastifyInstance) {
  const controller = new SampleController();

  app.post('/sample', async (request, reply) => controller.handle(request, reply));
}
