import { SampleController } from '@controllers/sample.controller';
export default async function (app) {
    const controller = new SampleController();
    app.post('/sample', async (request, reply) => controller.handle(request, reply));
}
//# sourceMappingURL=sample.routes.js.map