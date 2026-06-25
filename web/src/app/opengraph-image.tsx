import { ImageResponse } from "next/og";
export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          fontFamily: "Georgia, serif",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#FFFFFF",
          color: "#2D2814", // brand-dark
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 18, opacity: 0.7 }}>a.pirog.ru</div>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1 }}>
            Weddings & Events
          </div>
          <div style={{ fontSize: 26, opacity: 0.85, maxWidth: 900 }}>
            Organizer portfolio, stories, photos and short reels.
          </div>
        </div>

        <div style={{ fontSize: 18, opacity: 0.6 }}>
          Portfolio • Reels • Gallery
        </div>
      </div>
    ),
    size
  );
}
