import "dotenv/config";
import cors from 'cors';
import express from 'express';

import { extractHostFromOrigin, getTenantIdForDomain } from "./controllers/auth/TenantCache.js";
import authRoutes from './routes/authRoutes.js'
import tenantRoutes from './routes/tenantRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import videoRoutes from './routes/videoRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import saveVideoRoutes from './routes/saveVideoRoutes.js';
import userRoutes from './routes/userRoutes.js';
import payment from './routes/payment.js';
import liveMeeting from './routes/liveMeeting.js'
import './worker/PdfWorker.js';


const app = express();


const DEV_ORIGINS = new Set([
    process.env.FRONTEND_URL as string,
    process.env.FRONTEND_URL_WWW as string,
    process.env.VERCEL_FRONTEND_URL as string,
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]);

/** Browsers treat *.localhost as a secure context — used for multi-tenant local testing. */
function isDevLocalhostOrigin(origin: string): boolean {
  try {
    const { hostname } = new URL(origin);
    return hostname === "localhost" || hostname.endsWith(".localhost");
  } catch {
    return false;
  }
}

export const tenantCors = cors({
  origin: async (origin, callback) => {
    // same-origin requests / server-to-server (curl, Postman) have no Origin header
    if (!origin) return callback(null, true);

    if (process.env.NODE_ENV !== "production") {
      if (DEV_ORIGINS.has(origin) || isDevLocalhostOrigin(origin)) {
        return callback(null, true);
      }
    }

    const host = extractHostFromOrigin(origin);
    if (!host) return callback(new Error("Not allowed by CORS"));

    const tenantId = await getTenantIdForDomain(host);
    if (!tenantId) return callback(new Error("Not allowed by CORS"));

    return callback(null, true);
  },
  credentials: false, // we use Bearer tokens, not cookies -> no need for credentials
  exposedHeaders: ["Content-Type"],
});

app.use(tenantCors);

// webhook needs raw body — mount payment before the global JSON parser
app.use('/api/payment', payment);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/tenants", tenantRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/video', videoRoutes);
app.use('/api/saveVideo', saveVideoRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/user', userRoutes);
app.use("/api/live", liveMeeting);


app.get('/health', (req, res) => {
    console.log('Server is healthy.');
    res.json({ message: 'Server is healthy.' });
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
