import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, 'public')));

app.post('/remove-bg', upload.single('image'), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const response = await fetch('https://api.fal.ai/remove-background', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${process.env.FAL_KEY}`
      },
      body: fs.createReadStream(imagePath)
    });

    if (!response.ok) {
      throw new Error(`Fal.ai API error: ${response.statusText}`);
    }

    const buffer = await response.arrayBuffer();
    fs.unlinkSync(imagePath);
    res.set('Content-Type', 'image/png');
    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error(err);
    res.status(500).send('Background removal failed');
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
