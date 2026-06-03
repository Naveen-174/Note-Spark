import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware

app.use(
  cors({
    
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


app.use(express.json());
app.use(rateLimiter);

const __dirname=path.resolve()

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
if(process.env.NODE_ENV==="production")
{
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("*",(req,res)=>{
  res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
})
}
// Health Check Route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "NoteSpark Backend API Running",
  });
});

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});