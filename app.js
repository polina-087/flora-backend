import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { apiDocsConfig } from "./docs/swaggerDef.js";

import bouquetsRoutes from "./routes/api/bouquets.routes.js";
import orderRoutes from "./routes/api/orders.routes.js";
import feedbackRoutes from "./routes/api/feedbacks.routes.js";

const app = express();
const apiDocumentation = swaggerJsdoc(apiDocsConfig);

app.set("trust proxy", true);
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDocumentation));
app.use("/api/bouquets", bouquetsRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/feedbacks", feedbackRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Requested resource not found" });
});

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  const errorMessage = error.message || "Internal Server Error";
  res.status(statusCode).json({ message: errorMessage });
});

export default app;