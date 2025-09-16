import React, { useState } from "react";

function RichQRGenerator() {
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);

  // ⚠️ For demo only; in production, hide API key in backend
  const GOOEY_API_KEY = "sk-rCfC08UD14xTXKv85Knfe6lSAbmjXHLuEzOiuPkP9CYlfRbw";

  const handleGenerate = async () => {
    if (!url || !prompt) return alert("Enter URL and prompt");
    setLoading(true);
    setQrImage("");

    try {
      const payload = { qr_code_data: url, text_prompt: prompt };

      const response = await fetch("https://api.gooey.ai/v2/art-qr-code", {
        method: "POST",
        headers: {
          Authorization: `bearer ${GOOEY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`Gooey API error: ${response.status}`);

      const data = await response.json();
      const qr = data.output?.output_images?.[0];
      if (qr) setQrImage(qr);
      else alert("No QR image returned from Gooey AI");
    } catch (err) {
      console.error(err);
      alert("Failed to generate QR: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 20,
          padding: 40,
          maxWidth: 500,
          width: "100%",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center",
        }}
      >
        <h1 style={{ marginBottom: 20, color: "#333" }}>🎨 AI QR Generator</h1>

        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 15px",
            marginBottom: 15,
            borderRadius: 10,
            border: "1px solid #ccc",
            fontSize: 16,
            outline: "none",
          }}
        />

        <input
          type="text"
          placeholder="Enter prompt (theme/style)"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 15px",
            marginBottom: 20,
            borderRadius: 10,
            border: "1px solid #ccc",
            fontSize: 16,
            outline: "none",
          }}
        />

        <button
          onClick={handleGenerate}
          style={{
            width: "100%",
            padding: 15,
            borderRadius: 12,
            border: "none",
            background: "#667eea",
            color: "#fff",
            fontSize: 18,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#5a67d8")}
          onMouseLeave={(e) => (e.target.style.background = "#667eea")}
        >
          {loading ? "Generating..." : "Generate AI QR"}
        </button>

        {loading && (
          <div style={{ marginTop: 20 }}>
            <div className="spinner" style={{ margin: "0 auto", width: 40, height: 40, border: "4px solid #ccc", borderTop: "4px solid #667eea", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
          </div>
        )}

        {qrImage && (
          <div style={{ marginTop: 30 }}>
            <img
              src={qrImage}
              alt="AI QR Code"
              style={{
                width: "100%",
                borderRadius: 20,
                boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg);}
          100% { transform: rotate(360deg);}
        }
      `}</style>
    </div>
  );
}

export default RichQRGenerator;
