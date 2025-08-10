import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./db.js";
import schoolsRouter from "./routes/schools.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" })); 
app.use(express.urlencoded({ extended: true })); 

await testConnection();


app.use("/api", schoolsRouter);

app.get("/", (req, res) => {
    res.json({
        message: "School Management API is running!",
        version: "1.0.0",
        endpoints: {
            "POST /api/addSchool": "Add a new school",
            "GET /api/listSchools":
                "Get all schools sorted by distance from user location",
        },
    });
});

app.use("*", (req, res) => {
    res.status(404).json({
        error: "Route not found",
        message: "The requested endpoint does not exist",
    });
});

app.use((error, req, res, next) => {
    console.error("Unhandled error:", error);
    res.status(500).json({
        error: "Internal server error",
        message: "Something went wrong on the server",
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}`);
    console.log(`� Add School: POST http://localhost:${PORT}/api/addSchool`);
    console.log(
        `📋 List Schools: GET http://localhost:${PORT}/api/listSchools?latitude=LAT&longitude=LON`
    );
});
