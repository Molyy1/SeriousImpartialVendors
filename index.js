// index.js

const express = require("express"); const fileUpload = require("express-fileupload"); const fs = require("fs"); const path = require("path"); const fetch = require("node-fetch");

const app = express(); const PORT = process.env.PORT || 3000;

app.use(express.json()); app.use(fileUpload());

// Endpoint to upload .js file to Pastebin app.post("/upload", async (req, res) => { if (!req.files || !req.files.command) { return res.status(400).send("No .js file uploaded. Use 'command' field."); }

const cmdFile = req.files.command; if (!cmdFile.name.endsWith(".js")) { return res.status(400).send("Only .js files are allowed."); }

const codeText = cmdFile.data.toString();

try { const params = new URLSearchParams(); params.append("api_dev_key", "mg28nLxTW_EsFZ_lo1vUu-GDswol__iK"); params.append("api_option", "paste"); params.append("api_paste_code", codeText); params.append("api_paste_name", cmdFile.name); params.append("api_paste_private", "0"); params.append("api_paste_expire_date", "N"); params.append("api_paste_format", "javascript");

const response = await fetch("https://pastebin.com/api/api_post.php", {
  method: "POST",
  body: params,
});

const pasteUrl = await response.text();

if (!pasteUrl.startsWith("http")) {
  return res.status(500).send(`Upload failed: ${pasteUrl}`);
}

const rawLink = pasteUrl.replace("pastebin.com/", "pastebin.com/raw/");
return res.send({ success: true, link: rawLink });

} catch (err) { console.error("Upload error:", err); return res.status(500).send("Error uploading to Pastebin."); } });

app.listen(PORT, () => { console.log(Server running on http://localhost:${PORT}); });

