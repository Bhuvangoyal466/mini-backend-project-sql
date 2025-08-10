import express from "express";
import { pool } from "../db.js";

const router = express.Router();

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return Math.round(distance * 100) / 100;
};

const isValidCoordinate = (lat, lon) => {
    return (
        !isNaN(lat) &&
        !isNaN(lon) &&
        lat >= -90 &&
        lat <= 90 &&
        lon >= -180 &&
        lon <= 180
    );
};

router.post("/addSchool", async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (
            !name ||
            !address ||
            latitude === undefined ||
            longitude === undefined
        ) {
            return res.status(400).json({
                error: "All fields are required: name, address, latitude, longitude",
            });
        }

        if (typeof name !== "string" || typeof address !== "string") {
            return res.status(400).json({
                error: "Name and address must be strings",
            });
        }

        const lat = parseFloat(latitude);
        const lon = parseFloat(longitude);

        if (!isValidCoordinate(lat, lon)) {
            return res.status(400).json({
                error: "Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180",
            });
        }

        if (name.trim() === "" || address.trim() === "") {
            return res.status(400).json({
                error: "Name and address cannot be empty",
            });
        }
        const query =
            "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
        const [result] = await pool.execute(query, [
            name.trim(),
            address.trim(),
            lat,
            lon,
        ]);

        res.status(201).json({
            message: "School added successfully",
            schoolId: result.insertId,
            school: {
                id: result.insertId,
                name: name.trim(),
                address: address.trim(),
                latitude: lat,
                longitude: lon,
            },
        });
    } catch (error) {
        console.error("Error adding school:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

router.get("/listSchools", async (req, res) => {
    try {
        const { latitude, longitude } = req.query;

        if (!latitude || !longitude) {
            return res.status(400).json({
                error: "Latitude and longitude query parameters are required",
            });
        }

        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);

        if (!isValidCoordinate(userLat, userLon)) {
            return res.status(400).json({
                error: "Invalid coordinates. Latitude must be between -90 and 90, longitude between -180 and 180",
            });
        }

        const query = "SELECT * FROM schools";
        const [schools] = await pool.execute(query);

        const schoolsWithDistance = schools.map((school) => {
            const distance = calculateDistance(
                userLat,
                userLon,
                school.latitude,
                school.longitude
            );
            return {
                ...school,
                distance: distance,
            };
        });

        schoolsWithDistance.sort((a, b) => a.distance - b.distance);

        res.json({
            message: "Schools retrieved successfully",
            userLocation: {
                latitude: userLat,
                longitude: userLon,
            },
            totalSchools: schoolsWithDistance.length,
            schools: schoolsWithDistance,
        });
    } catch (error) {
        console.error("Error fetching schools:", error);
        res.status(500).json({
            error: "Internal server error",
        });
    }
});

export default router;
