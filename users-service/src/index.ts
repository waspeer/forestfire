import 'dotenv/config';

import './infra/type-orm/connect';
import './infra/http/start-server';

process.on('unhandledRejection', error => console.error(error));
