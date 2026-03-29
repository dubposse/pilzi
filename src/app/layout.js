import './globals.css'

export const metadata = {
  title: 'Pilzi – Saisonkalender für Lebensmittel aus Deutschland',
  description:
    'Finde heraus, welche Lebensmittel in Deutschland Saison haben. Pilzi zeigt dir frische Optionen nach Monat und Kategorie – einfach und übersichtlich.',
  keywords: ['Lebensmittel', 'Frische', 'Saisonalität', 'Obst', 'Gemüse', 'Fisch'],

  
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
        width: 1194,
        height: 1190,
        alt: 'Pilzi – Saisonale Lebensmittel entdecken',
      },
    ],
  },

}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <head>
        <link rel="canonical" href="https://pilzi.vercel.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Pilzi',
              url: 'https://pilzi.vercel.app/',
              description:
                'Finde heraus, welche Lebensmittel in Deutschland Saison haben. Pilzi zeigt dir frische Optionen nach Monat und Kategorie – einfach und übersichtlich.',
              inLanguage: 'de',
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}