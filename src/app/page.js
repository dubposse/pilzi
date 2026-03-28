import { foods } from '../data/foods'

export default function Page() {
  return (
    <main className="page">
      <div className="design-hintergrund">
        <div className="fix-top-menu">
          <div className="hero-content">
            <h1>Hallo! Ich bin Pilzi.</h1>

            <img
              src="/Objekt.png"
              id="pilzi-image"
              alt="Pilzi, dein Guide für saisonale Lebensmittel"
            />

            <p id="slogan">Dein Guide für alles, was jetzt reif ist.</p>
          </div>
        </div>
      </div>

      <section className="intro-box">
        <h2>Alle Artikel</h2>
        <p>
          Hier siehst du alle Lebensmittel aus deiner Pilzi-Datenbasis.
        </p>
      </section>

      <section>
        <table id="lebensmittelliste">
          <thead>
            <tr>
              <th>Name</th>
              <th>Kategorie</th>
              <th>kg-Preis</th>
              <th>Haltbarkeit</th>
              <th>Saison</th>
              <th>Ballaststoffgehalt</th>
              <th>Menge / Woche</th>
              <th>Menge / Tag</th>
              <th>Merkmal</th>
              <th>Gratis-Vitamine</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food.id}>
                <td>{food.name}</td>
                <td>{food.kategorie || '—'}</td>
                <td>{food.kgPreis || '—'}</td>
                <td>{food.haltbarkeit || '—'}</td>
                <td>{food.saison || '—'}</td>
                <td>{food.Ballaststoffgehalt || '—'}</td>
                <td>{food.verbrauchWoche || '—'}</td>
                <td>{food.verbrauchTag || '—'}</td>
                <td>{food.merkmal || '—'}</td>
                <td>{food.info || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <footer>
        <details>
          <summary>
            <strong>Impressum</strong>
          </summary>
          <p id="impressum">
            Matthias Brehm | Nordwestring 89 | 90419 Nürnberg
            <br />
            matthiasbrehm1@gmx.de
          </p>
        </details>
      </footer>
    </main>
  )
}