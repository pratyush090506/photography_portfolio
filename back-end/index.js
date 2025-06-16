console.log("🚀 Starting backend...");
const express = require("express");
const { google } = require("googleapis");
const cors = require("cors");
require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://pratyush-photography.netlify.app",
];

// CORS configuration
app.use(
  cors({ 
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  })
);

// Google Drive setup
const auth = new google.auth.GoogleAuth({ 
  keyFile: "credentials.json", 
  scopes: ["https://www.googleapis.com/auth/drive.readonly"] 
});

// Define port and base API once at startup
const PORT = process.env.PORT || 5050;
const BASE_API = process.env.BASE_API || `http://localhost:${PORT}`;

app.get("/api/images", async (req, res) => {
  console.log("🔍 /api/images endpoint hit");

  try {
    const authClient = await auth.getClient();
    console.log("✅ Authenticated with Google API");

    const drive = google.drive({ version: "v3", auth: authClient });

    // List files in specified folder
    const folderId = process.env.GDRIVE_FOLDER_ID;
    const response = await drive.files.list({ 
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      fields: "files(id, name, webContentLink, mimeType)" 
    });

    console.log("📁 Files fetched:", response.data.files);

    const files = response.data.files.map((file) => ({
      id: file.id,
      name: file.name,
      url: `${BASE_API}/api/image/${file.id}`,
      mimeType: file.mimeType,
    }));

    res.json(files);
  } catch (err) {
    console.error("❌ Failed to fetch images!", err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// NEW ENDPOINT: Proxy for individual image files
app.get("/api/image/:id", async (req, res) => {
  const fileId = req.params.id;
  console.log(`🖼️ /api/image/${fileId} endpoint hit for image proxy`);

  try {
    const authClient = await auth.getClient();
    const drive = google.drive({ version: "v3", auth: authClient });

    // Get file metadata to determine mimeType
    const fileMetadata = await drive.files.get({ 
      fileId: fileId, fields: "mimeType, name" 
    });
    const mimeType = fileMetadata.data.mimeType;

    // Fetch the actual image content
    const response = await drive.files.get(
      { fileId: fileId, alt: "media" },
      { responseType: "stream" }
    );

    res.setHeader("Content-Type", mimeType);
    response.data
      .on("end", () => console.log(`✅ Stream for ${fileId} ended.`))
      .on("error", (err) => {
        console.error(`❌ Error streaming file ${fileId}:`, err);
        if (!res.headersSent) {
          res.status(500).send("Error streaming file.");
        }
      })
      .pipe(res);
  } catch (err) {
    console.error(`❌ Failed to proxy image ${fileId}:`, err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Failed to proxy image" });
    }
  }
});

app.get("/ping", (req, res) => {
  console.log("✅ Ping received.");
  res.send("pong.");
});

// Start the server
app.listen(PORT, () =>
  console.log(`Backend server running on http://localhost:${PORT}`)
);
