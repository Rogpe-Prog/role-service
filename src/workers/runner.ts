import { SampleWorker } from './sample.worker.js';

(async function main() {
  const w = new SampleWorker();
  try {
    await w.start();
  } catch (err) {
    console.error('Worker error', err);
    process.exit(1);
  }
})();
