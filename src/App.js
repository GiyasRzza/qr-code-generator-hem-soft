import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";

export default function App() {
    const [url, setUrl] = useState("https://example.com");
    const ref = useRef();

    const [qrCode] = useState(() =>
        new QRCodeStyling({
            width: 500,
            height: 500,
            data: url,
            image: "/logo.png",
            dotsOptions: {
                color: "#000000",
                type: "rounded",
            },
            cornersSquareOptions: {
                color: "#0055ff",
                type: "rounded",
            },
            cornersDotOptions: {
                color: "#000000",
                type: "rounded",
            },
            imageOptions: {
                src: "/logo.png",
                crossOrigin: "anonymous",
                imageSize: 0.5,
                margin: 10,
                hideBackgroundDots: true,
                saveAsBlob: true
            }

        })
    );

    useEffect(() => {
        qrCode.update({ data: url });
    }, [url, qrCode]);

    useEffect(() => {
        qrCode.append(ref.current);
    }, [qrCode]);

    const downloadQr = () => {
        qrCode.getRawData("png").then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "qr-code.png";
            link.click();
            window.URL.revokeObjectURL(url);
        });
    };

    return (
        <div style={{ textAlign: "center", marginTop: 40, fontFamily: "Arial, sans-serif" }}>
            <h1>QR Kod Generator</h1>
            <input
                style={{
                    padding: 10,
                    fontSize: 16,
                    width: 300,
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    marginBottom: 20,
                    outline: "none",
                }}
                placeholder="URL daxil edin..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <div ref={ref} style={{ margin: "auto", width: 500, height: 500 }} />
            <button
                onClick={downloadQr}
                style={{
                    marginTop: 20,
                    padding: "12px 25px",
                    fontSize: 25,
                    borderRadius: 6,
                    border: "none",
                    backgroundColor: "#0055ff",
                    color: "#fff",
                    cursor: "pointer",
                }}
            >
                Şəkli Yüklə (PNG)
            </button>
        </div>
    );
}
