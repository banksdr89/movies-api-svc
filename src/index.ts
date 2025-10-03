import 'dotenv/config';
import { createServer } from './server';

if (require.main === module) {
  (async () => {
    try {
      await createServer();
    } catch (err) {
      console.error(`Error starting server ${err}`);
      process.exit(1);
    }
  })();
}
