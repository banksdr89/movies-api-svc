import 'dotenv/config';
import { createServer } from './server';

if (require.main === module) {
  (async () => {
    try {
      await createServer();
    } catch {
      process.exit(1);
    }
  })();
}
