import './globals.css'

export const metadata = {
  title: 'Pilzi',
  description:
    'Pilzi Web-App für interessierte Neulinge im Food Bereich für saisonale Lebensmittel und deren Haltbarkeit, Ballaststoffgehalt, Verbrauch pro Woche und Tag, sowie Merkmale für die Auswahl von frischen Lebensmitteln.',
  keywords: ['Lebensmittel', 'Frische', 'Saisonalität', 'Obst', 'Gemüse', 'Fisch'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  )
}