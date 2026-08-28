// Ordnet eine PLZ anhand des 2-stelligen Präfixes einem Bundesland zu.
// Basiert auf den üblichen PLZ-Leitzonen; da Zonen an Grenzen leicht
// überlappen können, ist die Zuordnung eine Näherung.
const PLZ_PREFIX_TO_BUNDESLAND = {
  '01': 'Sachsen', '02': 'Sachsen', '03': 'Brandenburg', '04': 'Sachsen',
  '05': 'Sachsen', '06': 'Sachsen-Anhalt', '07': 'Thüringen', '08': 'Sachsen',
  '09': 'Sachsen', '10': 'Berlin', '11': 'Berlin', '12': 'Berlin',
  '13': 'Berlin', '14': 'Brandenburg', '15': 'Brandenburg', '16': 'Brandenburg',
  '17': 'Mecklenburg-Vorpommern', '18': 'Mecklenburg-Vorpommern', '19': 'Mecklenburg-Vorpommern',
  '20': 'Hamburg', '21': 'Niedersachsen', '22': 'Hamburg', '23': 'Schleswig-Holstein',
  '24': 'Schleswig-Holstein', '25': 'Schleswig-Holstein', '26': 'Niedersachsen',
  '27': 'Niedersachsen', '28': 'Bremen', '29': 'Niedersachsen', '30': 'Niedersachsen',
  '31': 'Niedersachsen', '32': 'Nordrhein-Westfalen', '33': 'Nordrhein-Westfalen',
  '34': 'Hessen', '35': 'Hessen', '36': 'Hessen', '37': 'Niedersachsen',
  '38': 'Niedersachsen', '39': 'Sachsen-Anhalt', '40': 'Nordrhein-Westfalen',
  '41': 'Nordrhein-Westfalen', '42': 'Nordrhein-Westfalen', '43': 'Nordrhein-Westfalen',
  '44': 'Nordrhein-Westfalen', '45': 'Nordrhein-Westfalen', '46': 'Nordrhein-Westfalen',
  '47': 'Nordrhein-Westfalen', '48': 'Nordrhein-Westfalen', '49': 'Niedersachsen',
  '50': 'Nordrhein-Westfalen', '51': 'Nordrhein-Westfalen', '52': 'Nordrhein-Westfalen',
  '53': 'Nordrhein-Westfalen', '54': 'Rheinland-Pfalz', '55': 'Rheinland-Pfalz',
  '56': 'Rheinland-Pfalz', '57': 'Nordrhein-Westfalen', '58': 'Nordrhein-Westfalen',
  '59': 'Nordrhein-Westfalen', '60': 'Hessen', '61': 'Hessen', '62': 'Hessen',
  '63': 'Hessen', '64': 'Hessen', '65': 'Hessen', '66': 'Saarland',
  '67': 'Rheinland-Pfalz', '68': 'Baden-Württemberg', '69': 'Baden-Württemberg',
  '70': 'Baden-Württemberg', '71': 'Baden-Württemberg', '72': 'Baden-Württemberg',
  '73': 'Baden-Württemberg', '74': 'Baden-Württemberg', '75': 'Baden-Württemberg',
  '76': 'Baden-Württemberg', '77': 'Baden-Württemberg', '78': 'Baden-Württemberg',
  '79': 'Baden-Württemberg', '80': 'Bayern', '81': 'Bayern', '82': 'Bayern',
  '83': 'Bayern', '84': 'Bayern', '85': 'Bayern', '86': 'Bayern', '87': 'Bayern',
  '88': 'Baden-Württemberg', '89': 'Bayern', '90': 'Bayern', '91': 'Bayern',
  '92': 'Bayern', '93': 'Bayern', '94': 'Bayern', '95': 'Bayern', '96': 'Bayern',
  '97': 'Bayern', '98': 'Thüringen', '99': 'Thüringen'
}

export const BUNDESLAENDER = [
  'Baden-Württemberg', 'Bayern', 'Berlin', 'Brandenburg', 'Bremen', 'Hamburg',
  'Hessen', 'Mecklenburg-Vorpommern', 'Niedersachsen', 'Nordrhein-Westfalen',
  'Rheinland-Pfalz', 'Saarland', 'Sachsen', 'Sachsen-Anhalt', 'Schleswig-Holstein',
  'Thüringen'
]

export function getBundeslandFromPlz(plz) {
  if (!plz || plz.length < 2) return null
  return PLZ_PREFIX_TO_BUNDESLAND[plz.slice(0, 2)] || null
}
