import 'dotenv/config';
import buildServer from './server.js';
const PORT = Number(process.env.PORT ?? 3000);
async function start() {
    const server = await buildServer({});
    try {
        await server.listen({ port: PORT, host: '0.0.0.0' });
        console.log(`✅ role-service running on port ${PORT}`);
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
}
start();
//# sourceMappingURL=main.js.map