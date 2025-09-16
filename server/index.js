import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const GOOEY_API_KEY = "sk-if3sS8dhvzZKK0pVaQrWTVnFsH6ihzqcr8gBsMo9d1XkIsrn";

app.post("/api/generate-qr", async (req, res) => {
  const { qr_code_data, text_prompt } = req.body;

  if (!qr_code_data || !text_prompt) {
    return res.status(400).json({ error: "qr_code_data and text_prompt required" });
  }

  try {
    const payload = { qr_code_data, text_prompt };
    const response = await fetch("https://api.gooey.ai/v2/art-qr-code", {
      method: "POST",
      headers: {
        "Authorization": `bearer ${GOOEY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`Gooey API error: ${response.status}`);

    const data = await response.json();

    // Return the main stylized QR image
    const qrImage = data.output?.output_images?.[0];
    if (qrImage) {
      res.json({ qrImage });
    } else {
      res.status(500).json({ error: "No QR image returned from Gooey AI" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
