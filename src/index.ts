import 'dotenv/config';
import { createServer } from './server';

if (require.main === module) {
  (async () => {
    try {
      await createServer();
    } catch (err) {
      process.exit(1);
    }
  })();
}
