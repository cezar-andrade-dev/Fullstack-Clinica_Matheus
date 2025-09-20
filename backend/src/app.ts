import express from "express";
import cors from "cors";
import cursosRoutes from "./routes/cursos";
import matriculaRoutes from "./routes/matricula";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/cursos", cursosRoutes);
app.use("/api/matricula", matriculaRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "API funcionando" });
});

export default app;
