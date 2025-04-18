const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Your ImgBB API key
const API_KEY = '874584284ba25a8c99be0ece456f77e8';

app.get('/imgbb', async (req, res) => {
    const { image } = req.query;

    if (!image) {
        return res.status(400).json({ error: 'Image (base64 or URL) is required in query ?image=' });
    }

    try {
        const response = await axios.post('https://api.imgbb.com/1/upload', null, {
            params: {
                key: API_KEY,
                image: image,
            },
        });

        res.json({
            success: true,
            data: response.data.data,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

app.listen(PORT, () => {
    console.log(`ImgBB API server running at http://localhost:${PORT}`);
});
