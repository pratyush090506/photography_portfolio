console.log("🚀 Starting backend...");

const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://pratyush-photography.netlify.app",
];

// Enable CORS
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Google Drive Auth setup
const auth = new google.auth.GoogleAuth({
  keyFile: "credentials.json",
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

// Load ENV variables
const PORT = process.env.PORT || 5050;
const BASE_API = process.env.BASE_API;

if (!BASE_API) {
  throw new Error("BASE_API environment variable is not set.");
}

const folders = {
  Nature: process.env.NATURE_FOLDER_ID,
  Portraits: process.env.PORTRAIT_FOLDER_ID,
  Events: process.env.EVENTS_FOLDER_ID,
};

// API to get sectioned images
app.get("/api/images", async (req, res) => {
  console.log("🔍 /api/images endpoint hit");

  try {
    const authClient = await auth.getClient();
    const drive = google.drive({ version: "v3", auth: authClient });

    const sectionedImages = {};

    for (const [section, folderId] of Object.entries(folders)) {
      const response = await drive.files.list({
        q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
        fields: "files(id, name, mimeType)",
      });

      sectionedImages[section] = response.data.files.map((file) => ({
        id: file.id,
        name: file.name,
        url: `${BASE_API}/api/image/${file.id}`,
        mimeType: file.mimeType,
      }));

      console.log(`📂 ${section}: ${sectionedImages[section].length} files`);
    }

    res.json(sectionedImages);
  } catch (err) {
    console.error("❌ Failed to fetch sectioned images!", err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// Proxy endpoint to stream each image file
app.get("/api/image/:id", async (req, res) => {
  const fileId = req.params.id;
  console.log(`🖼️ /api/image/${fileId} endpoint hit`);

  try {
    const authClient = await auth.getClient();
    const drive = google.drive({ version: "v3", auth: authClient });

    // Get the file's MIME type
    const fileMetadata = await drive.files.get({
      fileId,
      fields: "mimeType, name",
    });

    const mimeType = fileMetadata.data.mimeType;

    // Stream the file contents
    const response = await drive.files.get(
      { fileId, alt: "media" },
      { responseType: "stream" }
    );

    res.setHeader("Content-Type", mimeType);

    response.data
      .on("end", () => console.log(`✅ Finished streaming ${fileId}`))
      .on("error", (err) => {
        console.error(`❌ Stream error for ${fileId}:`, err);
        if (!res.headersSent) res.status(500).send("Stream error");
      })
      .pipe(res);
  } catch (err) {
    console.error(`❌ Failed to proxy image ${fileId}:`, err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to proxy image" });
    }
  }
});

// Health check
app.get("/ping", (req, res) => {
  console.log("✅ Ping received");
  res.send("pong");
});

// Start the server
app.listen(PORT, () =>
  console.log(`🚀 Backend server running on port ${PORT}`)
);
