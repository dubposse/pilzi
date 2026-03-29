# Pilzi 🍄

Ein interaktiver Saisonkalender für Lebensmittel aus Deutschland.

## 🧠 Idee

Beim Einkaufen ist oft unklar, welche Lebensmittel gerade Saison haben und wirklich frisch sind.  
Pilzi hilft dabei, diese Entscheidung einfacher zu treffen.

Die Web-App zeigt dir, welche Lebensmittel in Deutschland saisonal verfügbar sind – übersichtlich, filterbar und direkt nutzbar.

---

## 💭 Warum ich Pilzi gebaut habe

Ich habe Pilzi entwickelt, weil mir im Alltag oft die Orientierung fehlt, welche Lebensmittel wirklich saisonal und frisch sind. Beim Einkaufen ist vieles verfügbar, aber nicht alles hat gerade Saison – und genau hier wollte ich eine einfache, klare Lösung schaffen.

Gleichzeitig war das Projekt für mich eine Möglichkeit, meine Kenntnisse in JavaScript und Next.js praktisch anzuwenden und ein eigenständiges Produkt umzusetzen – nicht nur ein Tutorial, sondern eine Anwendung mit echtem Nutzen.

Pilzi verbindet für mich zwei Dinge: den Einstieg in die Webentwicklung und ein Thema aus dem Alltag, das mich persönlich interessiert.

## 🚀 Features

- 🔍 Suche nach Lebensmitteln
- 📅 Filter nach Monat
- 🥕 Kategorien (Obst, Gemüse, Fisch, etc.)
- 📊 Detailinfos zu:
  - Haltbarkeit
  - Ballaststoffgehalt
  - Verbrauch pro Woche / Tag
  - weitere Eigenschaften
- ⚡ schnelle Darstellung durch statische Daten (keine Datenbank)

---

## 🧩 Tech Stack

- Next.js
- React
- JavaScript
- CSS

---

## 🧱 Architektur

Pilzi basiert auf einem **datengetriebenen Ansatz**:

- Alle Lebensmittel sind als statische Daten im Code hinterlegt
- Die UI wird dynamisch aus diesen Daten generiert
- Filter und Suche arbeiten direkt auf dieser Datenstruktur

Dieser Ansatz ermöglicht eine einfache, performante und wartbare Anwendung ohne Backend.

---

## 🎯 Ziel

Ziel von Pilzi ist es, ein leicht zugängliches Tool zu schaffen, das:

- Alltagsentscheidungen beim Einkauf unterstützt
- ein Bewusstsein für saisonale Lebensmittel fördert
- einfach und intuitiv bedienbar ist

---

## 💡 Ausblick

Mögliche Erweiterungen:

- Favoriten speichern
- personalisierte Empfehlungen
- Wochenplanung für Mahlzeiten
- Erweiterung der Datenbasis

---

## Getting Started

Projekt lokal starten:

```bash
npm install
npm run dev

---

## 🧑‍💻 Autor

Matthias Brehm

---

## 📄 Lizenz

Dieses Projekt ist unter der GNU Affero General Public License v3.0 (AGPL-3.0) lizenziert.