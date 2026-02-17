import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background:
            "linear-gradient(135deg, #111827 0%, #1d4ed8 55%, #0f172a 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 54,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          wzzfny
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 26,
            maxWidth: 820,
            lineHeight: 1.3,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          AI interview practice, feedback, and resume optimization.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 18,
            textTransform: "uppercase",
            letterSpacing: "0.3em",
            color: "rgba(255,255,255,0.65)",
          }}
        >
          wzzfny
        </div>
      </div>
    ),
    size,
  );
}

