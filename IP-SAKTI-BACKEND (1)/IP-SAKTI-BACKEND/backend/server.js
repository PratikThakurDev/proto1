import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import alertRoutes from "./routes/alertRoutes.js";
import { notFound, errorHandler } from "./middleware/error.js";
import { ragHealth } from "./services/ragClient.js";

const app = express();

app.use(helmet());
app.use(cors({
  origin: env.clientUrl,
  credentials: true
}));
app.use(express.json({ limit: "1mb" }));

app.get("/", (req, res) => {
  res.json({
    name: "IP-SAKTI Sahayak Backend",
    status: "running",
    api: "/api"
  });
});

app.get("/health", async (req, res) => {
  let rag = { status: "unreachable" };

  try {
    rag = await ragHealth();
  } catch (error) {
    rag = { status: "unreachable", message: error.message };
  }

  res.json({
    status: "ok",
    backend: "node-express",
    rag
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/chats", chatRoutes);
app.use("/api/alerts", alertRoutes);

app.use(notFound);
app.use(errorHandler);

async function start() {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`IP-SAKTI backend running on http://127.0.0.1:${env.port}`);
  });
}

start().catch((error) => {
  console.error("Server startup failed:", error);
  process.exit(1);
});
