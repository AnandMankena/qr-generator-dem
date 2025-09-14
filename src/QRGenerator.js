import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRGenerator() {
  const [url, setUrl] = useState("");
  const [prompt, setPrompt] = useState("");
  const [finalText, setFinalText] = useState("");

  const handleSubmit = () => {
    if (!url && !prompt) {
      alert("Please enter URL or prompt");
      return;
    }
    setFinalText(url || prompt);
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#111" }}>
          QR Code Generator
        </h2>

        <input
          type="text"
          placeholder="Enter website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "12px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <input
          type="text"
          placeholder="Enter prompt/text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "16px",
            border: "1px solid #ccc",
            borderRadius: "8px",
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            background: "#2563eb",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            width: "100%",
            marginBottom: "20px",
          }}
        >
          Generate QR
        </button>

        {finalText && (
          <div>
            <div style={{ marginBottom: "20px" }}>
              <QRCodeCanvas value={finalText} size={200} />
            </div>
            <p
              style={{
                wordBreak: "break-word",
                fontSize: "14px",
                color: "#555",
                marginBottom: "16px",
              }}
            >
              {finalText}
            </p>
            <button
              onClick={handleDownload}
              style={{
                background: "#10b981",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Download PNG
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QRGenerator;
