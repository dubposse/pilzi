import './globals.css'

export const metadata = {
  title: 'Pilzi – Saisonkalender für Lebensmittel aus Deutschland',
  description:
    'Finde heraus, welche Lebensmittel in Deutschland Saison haben. Pilzi zeigt dir frische Optionen nach Monat und Kategorie – einfach und übersichtlich.',
  keywords: ['Lebensmittel', 'Frische', 'Saisonalität', 'Obst', 'Gemüse', 'Fisch'],
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: 'https://pilzi.vercel.app/',
  },
  openGraph: {
    title: 'Pilzi',
    description:
      'Pilzi zeigt dir, was gerade Saison hat – damit du im Supermarkt nicht im Dunkeln tappst und frische Optionen für deinen Einkauf findest.',
    url: 'https://pilzi.vercel.app/',
    siteName: 'Pilzi',
    locale: 'de_DE',
    type: 'website',
    images: [
      {
        url: 'https://pilzi.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pilzi – Saisonale Lebensmittel entdecken',
      },
    ],
  },
}

export default function RootLayout({ children }) {
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Pilzi',
    url: 'https://pilzi.vercel.app/',
    description:
      'Finde heraus, welche Lebensmittel in Deutschland Saison haben. Pilzi zeigt dir frische Optionen nach Monat und Kategorie – einfach und übersichtlich.',
    inLanguage: 'de',
  }

  return (
    <html lang="de">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {children}
      </body>
    </html>
  )
}