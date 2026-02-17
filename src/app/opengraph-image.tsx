import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
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
            "linear-gradient(135deg, #0f172a 0%, #1e1b4b 45%, #0f172a 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            letterSpacing: "-0.02em",
          }}
        >
          wzzfny
        </div>
        <div
          style={{
            marginTop: 16,
            fontSize: 28,
            maxWidth: 820,
            lineHeight: 1.3,
            color: "rgba(255,255,255,0.88)",
          }}
        >
          Practice interviews with AI feedback and land your next job.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 18,
            textTransform: "uppercase",
            letterSpacing: "0.35em",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          AI interview practice
        </div>
      </div>
    ),
    size,
  );
}

