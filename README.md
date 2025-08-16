# Background Removal Demo

This project is a simple Node.js site inspired by [remove.bg](https://www.remove.bg/). Users can upload an image, and the server forwards it to the [fal.ai](https://fal.ai) API to strip the background.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with your fal.ai key:
   ```
   FAL_KEY=your_api_key
   ```
3. Start the server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) and upload an image to process.

## Notes
- The API endpoint in `server.js` may need adjustment to match the exact fal.ai background removal model.
- Uploaded files are stored temporarily and deleted after processing.

