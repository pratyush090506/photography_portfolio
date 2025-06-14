// backend/index.js
console.log("🚀 Starting backend...");
const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
require('dotenv').config();
const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));

// Google Drive setup
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/drive.readonly']
});

app.get('/api/images', async (req, res) => {
  console.log("🔍 /api/images endpoint hit");

  try {
    const authClient = await auth.getClient();
    console.log("✅ Authenticated with Google API");

    const drive = google.drive({ version: 'v3', auth: authClient });

    // List files in specified folder
    const folderId = process.env.GDRIVE_FOLDER_ID;
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
      // We still get webContentLink here for completeness, but will primarily use the new proxy endpoint
      fields: 'files(id, name, webContentLink, mimeType)',
    });

    console.log("📁 Files fetched:", response.data.files);

    // Transform to viewable URLs, now pointing to our new proxy endpoint
    const files = response.data.files.map(file => ({
      id: file.id,
      name: file.name,
      // Change this to point to our new proxy endpoint for images
      url: `http://localhost:5050/api/image/${file.id}`,
      mimeType: file.mimeType // Include mimeType for the proxy endpoint
    }));

    res.json(files);
  } catch (err) {
    console.error('❌ Failed to fetch images!', err);
    res.status(500).json({ error: 'Failed to fetch images' });
  }
});

// NEW ENDPOINT: Proxy for individual image files
app.get('/api/image/:id', async (req, res) => {
  const fileId = req.params.id;
  console.log(`🖼️ /api/image/${fileId} endpoint hit for image proxy`);

  try {
    const authClient = await auth.getClient();
    const drive = google.drive({ version: 'v3', auth: authClient });

    // Get file metadata to determine mimeType
    const fileMetadata = await drive.files.get({
      fileId: fileId,
      fields: 'mimeType, name'
    });
    const mimeType = fileMetadata.data.mimeType;

    // Fetch the actual image content
    const response = await drive.files.get({
      fileId: fileId,
      alt: 'media' // This is crucial for getting the raw file content
    }, {
      responseType: 'stream' // Stream the response to avoid large memory usage
    });

    // Set the appropriate Content-Type header
    res.setHeader('Content-Type', mimeType);
    // Optionally set a Content-Disposition header if you want to suggest a filename for download
    // res.setHeader('Content-Disposition', `inline; filename="${fileMetadata.data.name}"`);

    // Pipe the Google Drive stream directly to the response
    response.data
      .on('end', () => console.log(`✅ Stream for ${fileId} ended.`))
      .on('error', err => {
        console.error(`❌ Error streaming file ${fileId}:`, err);
        if (!res.headersSent) {
          res.status(500).send('Error streaming file');
        }
      })
      .pipe(res);

  } catch (err) {
    console.error(`❌ Failed to proxy image ${fileId}:`, err);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to proxy image' });
    }
  }
});


app.get('/ping', (req, res) => {
  console.log("✅ Ping received.");
  res.send("pong.");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Backend server running on http://localhost:${PORT}`));
