import app from './app.js';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';

await connectDB();
app.listen(env.port, () => console.log(`IP-SAKTI backend listening on http://localhost:${env.port}`));
