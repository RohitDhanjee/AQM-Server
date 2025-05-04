// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(express.json());
// app.use(cors());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => console.log("MongoDB Connected"))
// .catch(err => console.log(err));

// // Define Schema & Model
// const SensorDataSchema = new mongoose.Schema({
//     temperature: Number,
//     humidity: Number,
//     air_quality: Number,
//     timestamp: { type: Date, default: Date.now }
// });
// const SensorData = mongoose.model("SensorData", SensorDataSchema);

// // Route to receive data from ESP32
// app.post("/api/sensors", async (req, res) => {
//     try {
//         const { temperature, humidity, air_quality } = req.body;
//         const newData = new SensorData({ temperature, humidity, air_quality });
//         await newData.save();
//         res.status(201).json({ message: "Data saved successfully!" });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// // Route to fetch sensor data for frontend
// app.get("/api/sensors", async (req, res) => {
//     try {
//         const data = await SensorData.find().sort({ timestamp: -1 }).limit(20);
//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// app.get("/api/sensors/all", async (req, res) => {
//     try {
//         const allData = await SensorData.find(); // Fetch all records
//         res.json(allData);
//     } catch (error) {
//         res.status(500).json({ error: "Error fetching sensor data" });
//     }
// });



// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// // app.listen(PORT, () => console.log(`Server running on http://iot-server.local:${PORT}`));



// const express = require("express");
// const nodemailer = require("nodemailer");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");
// const multer = require("multer");
// require("dotenv").config();
// // const Sensor = require("./models/Sensor");  // Ensure the correct path




// const app = express();
// const PORT = process.env.PORT || 5000;

// // ✅ Middleware
// app.use(express.json());
// // app.use(cors({ origin: "*" })); // Allow all origins (modify for security)
// // Enable CORS for all routes
// app.use(cors({
//   origin: '*', // During development, you can use * to allow all origins
//   // For production, specify allowed origins:
//   // origin: ['https://yourfrontend.com', 'http://localhost:8080']
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// // ✅ Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB Connected"))
// .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1); // Stop server if DB connection fails
// });

// // ✅ Define Schema & Model
// const SensorDataSchema = new mongoose.Schema({
//     temperature: { type: Number, required: true },
//     humidity: { type: Number, required: true },
//     air_quality: { type: Number, required: true },
//     timestamp: { type: Date, default: Date.now }
// });

// const SensorData = mongoose.model("SensorData", SensorDataSchema);

// // ✅ Route to Receive Data from ESP32 (POST request)
// app.post("/api/sensors", async (req, res) => {
//     try {
//         const { temperature, humidity, air_quality } = req.body;

//         if (temperature == null || humidity == null || air_quality == null) {
//             return res.status(400).json({ error: "Missing sensor data fields" });
//         }

//         const newData = new SensorData({ temperature, humidity, air_quality });
//         await newData.save();

//         res.status(201).json({ message: "✅ Data saved successfully!" });
//     } catch (error) {
//         console.error("❌ Error saving sensor data:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // ✅ Route to Fetch Latest 20 Sensor Records for Frontend
// app.get("/api/sensors", async (req, res) => {
//     try {
//         const data = await SensorData.find().sort({ timestamp: -1 }).limit(1);
//         if (!data.length) return res.status(404).json({ error: "No sensor data found" });

//         res.json(data);

//         // const { start, end } = req.query;
//         // let query = {};
    
//         // if (start && end) {
//         //     query.timestamp = { $gte: new Date(start), $lte: new Date(end) };
//         // }
    
//         // const data = await SensorData.find(query).sort({ timestamp: -1 });
//         // res.json(data);
//     } catch (error) {
//         console.error("❌ Error fetching latest sensor data:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// app.get("/api/sensors/filter", async (req, res) => {
//     try {
//         const { start, end } = req.query;

//         if (!start || !end) {
//             return res.status(400).json({ error: "Start and end dates are required" });
//         }

//         // ✅ Ensure Date objects are correctly parsed
//         const startDate = new Date(start);
//         const endDate = new Date(end);

//         // ✅ Extend end date to include full day (23:59:59.999)
//         endDate.setHours(23, 59, 59, 999);

//         // ✅ Use the correctly parsed date range
//         const data = await SensorData.find({
//             timestamp: {
//                 $gte: startDate,
//                 $lte: endDate
//             }
//         }).sort({ timestamp: -1 });

//         res.json(data);
//     } catch (error) {
//         console.error("❌ Error fetching filtered sensor data:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });


// // ✅ Route to Fetch **All** Sensor Records
// app.get("/api/sensors/all", async (req, res) => {
//     try {
//         const allData = await SensorData.find().sort({ timestamp: -1 });
//         if (!allData.length) return res.status(404).json({ error: "No sensor data found" });

//         res.json(allData);
//     } catch (error) {
//         console.error("❌ Error fetching all sensor data:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// // Storage config for firmware files
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         const uploadPath = path.join(__dirname, "firmware");
//         if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
//         cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//         cb(null, "firmware.bin"); // Always overwrite with latest firmware
//     }
// });
// const upload = multer({ storage });

// // Upload route (Dashboard -> Backend)
// app.post("/api/firmware/upload", upload.single("firmware"), (req, res) => {
//     if (!req.file) {
//         return res.status(400).json({ error: "No firmware file uploaded" });
//     }
//     res.status(200).json({ message: "✅ Firmware uploaded successfully" });
// });

// // // Serve firmware for ESP32 OTA download
// // app.get("/api/firmware/latest", (req, res) => {
// //     const firmwarePath = path.join(__dirname, "firmware", "firmware.bin");
// //     if (!fs.existsSync(firmwarePath)) {
// //         return res.status(404).json({ error: "No firmware available" });
// //     }
// //     res.sendFile(firmwarePath);
// // });

// // Serve firmware and delete it 1 minute after it's downloaded
// app.get("/api/firmware/latest", (req, res) => {
//     const firmwarePath = path.join(__dirname, "firmware", "firmware.bin");

//     if (!fs.existsSync(firmwarePath)) {
//         return res.status(404).json({ error: "No firmware available" });
//     }

//     res.download(firmwarePath, "firmware.bin", (err) => {
//         if (err) {
//             console.error("❌ Error sending firmware:", err);
//             return;
//         }

//         console.log("✅ Firmware sent. Scheduling deletion in 1 seconds...");

//         setTimeout(() => {
//             fs.unlink(firmwarePath, (unlinkErr) => {
//                 if (unlinkErr) {
//                     console.error("❌ Error deleting firmware:", unlinkErr);
//                 } else {
//                     console.log("🗑️ Firmware deleted after 1 seconds.");
//                 }
//             });
//         }, 1000); // 1 seconds
//     });
// });


// // / Email Transporter
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: "rohitdhanjee25@gmail.com",  // 🔹 Use your email
//         pass: "medp vafp ivoq vdyz"      // 🔹 Use an App Password (not your main password)
//     }
// });

// // Email Alert Route
// app.post("/api/alerts", async (req, res) => {
//     const { type, value, message } = req.body;

//     const mailOptions = {
//         from: "rohitdhanjee25@gmail.com",
//         to: "mr.gadgets25@gmail.com",
//         subject: `🚨 Alert: High ${type} Level Detected!`,
//         text: `Warning! ${message}\n\nCurrent Level: ${value}`
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         res.status(200).json({ success: true, message: "Email alert sent!" });
//     } catch (error) {
//         console.error("Error sending email:", error);
//         res.status(500).json({ success: false, error: "Failed to send email" });
//     }
// });

// // ✅ Start the Server
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));


const express = require("express");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Firmware update password (should be in .env file)
const FIRMWARE_PASSWORD = process.env.FIRMWARE_PASSWORD || "admin123";

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: '*', // During development, you can use * to allow all origins
  // For production, specify allowed origins:
  // origin: ['https://yourfrontend.com', 'http://localhost:8080']
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Firmware-Password']
}));

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop server if DB connection fails
});

// ✅ Define Schema & Model
const SensorDataSchema = new mongoose.Schema({
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    air_quality: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
});

const SensorData = mongoose.model("SensorData", SensorDataSchema);

// ✅ Route to Receive Data from ESP32 (POST request)
app.post("/api/sensors", async (req, res) => {
    try {
        const { temperature, humidity, air_quality } = req.body;

        if (temperature == null || humidity == null || air_quality == null) {
            return res.status(400).json({ error: "Missing sensor data fields" });
        }

        const newData = new SensorData({ temperature, humidity, air_quality });
        await newData.save();

        res.status(201).json({ message: "✅ Data saved successfully!" });
    } catch (error) {
        console.error("❌ Error saving sensor data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Route to Fetch Latest 20 Sensor Records for Frontend
app.get("/api/sensors", async (req, res) => {
    try {
        const data = await SensorData.find().sort({ timestamp: -1 }).limit(1);
        if (!data.length) return res.status(404).json({ error: "No sensor data found" });

        res.json(data);
    } catch (error) {
        console.error("❌ Error fetching latest sensor data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/api/sensors/filter", async (req, res) => {
    try {
        const { start, end } = req.query;

        if (!start || !end) {
            return res.status(400).json({ error: "Start and end dates are required" });
        }

        // ✅ Ensure Date objects are correctly parsed
        const startDate = new Date(start);
        const endDate = new Date(end);

        // ✅ Extend end date to include full day (23:59:59.999)
        endDate.setHours(23, 59, 59, 999);

        // ✅ Use the correctly parsed date range
        const data = await SensorData.find({
            timestamp: {
                $gte: startDate,
                $lte: endDate
            }
        }).sort({ timestamp: -1 });

        res.json(data);
    } catch (error) {
        console.error("❌ Error fetching filtered sensor data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ Route to Fetch **All** Sensor Records
app.get("/api/sensors/all", async (req, res) => {
    try {
        const allData = await SensorData.find().sort({ timestamp: -1 });
        if (!allData.length) return res.status(404).json({ error: "No sensor data found" });

        res.json(allData);
    } catch (error) {
        console.error("❌ Error fetching all sensor data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Middleware to verify firmware upload password
const verifyFirmwarePassword = (req, res, next) => {
    const submittedPassword = req.headers['x-firmware-password'];
    
    if (!submittedPassword) {
        return res.status(401).json({ error: "Authentication required" });
    }
    
    if (submittedPassword !== FIRMWARE_PASSWORD) {
        console.log("❌ Invalid firmware password attempt");
        return res.status(403).json({ error: "Invalid credentials" });
    }
    
    console.log("✅ Firmware password authenticated");
    next();
};

// Storage config for firmware files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "firmware");
        if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, "firmware.bin"); // Always overwrite with latest firmware
    }
});
const upload = multer({ storage });

// Upload route (Dashboard -> Backend) with password verification
app.post("/api/firmware/upload", verifyFirmwarePassword, upload.single("firmware"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No firmware file uploaded" });
    }
    res.status(200).json({ message: "✅ Firmware uploaded successfully" });
});

// Serve firmware and delete it 1 minute after it's downloaded
app.get("/api/firmware/latest", (req, res) => {
    const firmwarePath = path.join(__dirname, "firmware", "firmware.bin");

    if (!fs.existsSync(firmwarePath)) {
        return res.status(404).json({ error: "No firmware available" });
    }

    res.download(firmwarePath, "firmware.bin", (err) => {
        if (err) {
            console.error("❌ Error sending firmware:", err);
            return;
        }

        console.log("✅ Firmware sent. Scheduling deletion in 1 seconds...");

        setTimeout(() => {
            fs.unlink(firmwarePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error("❌ Error deleting firmware:", unlinkErr);
                } else {
                    console.log("🗑️ Firmware deleted after 1 seconds.");
                }
            });
        }, 1000); // 1 seconds
    });
});

// / Email Transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rohitdhanjee25@gmail.com",  // 🔹 Use your email
        pass: "medp vafp ivoq vdyz"      // 🔹 Use an App Password (not your main password)
    }
});

// Email Alert Route
app.post("/api/alerts", async (req, res) => {
    const { type, value, message } = req.body;

    const mailOptions = {
        from: "rohitdhanjee25@gmail.com",
        to: "mr.gadgets25@gmail.com",
        subject: `🚨 Alert: High ${type} Level Detected!`,
        text: `Warning! ${message}\n\nCurrent Level: ${value}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ success: true, message: "Email alert sent!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ success: false, error: "Failed to send email" });
    }
});

// ✅ Start the Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
