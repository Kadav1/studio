
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Alex Zewebrand - A måsstaden Portfolio'; // From layout.tsx openGraph.title
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  const siteName = "måsstaden";
  // Description consistent with src/app/layout.tsx openGraph.description
  const siteDescription = "Explore måsstaden, a brutalist-inspired portfolio by Alex Zewebrand featuring innovative web projects.";

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#23282b', // Theme background color
          fontFamily: '"Inter", "Helvetica Neue", "Helvetica", "Arial", sans-serif', // Prioritize Inter, then system fonts
          padding: '60px',
        }}
      >
        <div
          style={{
            fontSize: '96px',
            fontWeight: 900, // Corresponds to font-black
            color: '#ceda4a', // Theme accent color (using projects accent as a default for OG)
            marginBottom: '40px',
            textAlign: 'center',
            textTransform: 'uppercase', // Matches logo style in TopNavbar
            letterSpacing: '-0.05em', // Matches tracking-tighter
          }}
        >
          {siteName}
        </div>
        <div
          style={{
            fontSize: '36px',
            color: '#FFFFFF', // Theme foreground color
            textAlign: 'center',
            lineHeight: '1.5',
            maxWidth: '900px',
            fontWeight: 400, // Normal font weight
          }}
        >
          {siteDescription}
        </div>
      </div>
    ),
    {
      ...size,
      // Note: For custom fonts like Inter to render reliably,
      // font files (.ttf, .otf, .woff) would need to be explicitly loaded here.
      // This example relies on system-available fonts or fallbacks.
    }
  );
}
