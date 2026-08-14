import test from 'node:test'
import assert from 'node:assert/strict'
import es from '../src/locales/es.js'
import en from '../src/locales/en.js'
import { buildQuoteMessage, validateQuote } from '../src/utils/quote.js'
import { countries, countryName, searchCountries } from '../src/data/countries.js'
import { detectBrowserLanguage, resolveLanguagePreference } from '../src/utils/language.js'
import { browserCountry, detectVisitorCountry, phoneCountryStorageKey, rememberPhoneCountry } from '../src/utils/location.js'
import { internationalization } from '../src/config/i18n.js'

const colombia = countries.find(({ iso }) => iso === 'CO')
const quote = { name: 'John Smith', company: 'ABC Energy', country: colombia, email: 'john@abc.com', phone: '320 555 1234', type: 'Solar Energy', description: 'Solar feasibility study.' }

function objectKeys(value, prefix = '') {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return []
  return Object.entries(value).flatMap(([key, child]) => [`${prefix}${key}`, ...objectKeys(child, `${prefix}${key}.`)])
}

test('los diccionarios ES y EN conservan la misma estructura', () => {
  assert.deepEqual(objectKeys(en).sort(), objectKeys(es).sort())
})

test('genera el lead de WhatsApp completamente en inglés', () => {
  const message = buildQuoteMessage(quote, en.quote.message, 'Colombia')
  assert.match(message, /^Hello, JC Cabarcas Ingeniería\./)
  assert.match(message, /Country: Colombia/)
  assert.match(message, /Project type: Solar Energy/)
  assert.doesNotMatch(message, /Quiero|Nombre|Descripción/)
})

test('usa errores ingleses al validar el formulario inglés', () => {
  const result = validateQuote({ ...quote, email: 'invalid' }, en.quote.errors)
  assert.equal(result.errors.email, 'Please enter a valid email address.')
})

test('muestra y busca países en inglés mediante ISO', () => {
  const germany = countries.find(({ iso }) => iso === 'DE')
  assert.equal(countryName(germany, 'en'), 'Germany')
  assert.equal(searchCountries('Germany', 'en').some(({ iso }) => iso === 'DE'), true)
})

test('detecta los idiomas oficiales y adicionales desde navigator.languages', () => {
  assert.equal(detectBrowserLanguage(['es-CO']), 'es')
  assert.equal(detectBrowserLanguage(['en-US']), 'en')
  assert.equal(detectBrowserLanguage(['pt-BR']), 'pt')
  assert.equal(detectBrowserLanguage(['fr-FR']), 'fr')
})

test('una selección explícita o guardada tiene prioridad sobre el navegador', () => {
  assert.equal(resolveLanguagePreference({ requested: 'en', saved: 'pt', languages: ['es-CO'] }), 'en')
  assert.equal(resolveLanguagePreference({ requested: null, saved: 'fr', languages: ['es-CO'] }), 'fr')
  assert.equal(resolveLanguagePreference({ requested: null, saved: null, languages: ['pt-BR'] }), 'pt')
})

test('detecta el país telefónico desde las regiones del navegador', () => {
  assert.equal(browserCountry(['pt-BR']), 'BR')
  assert.equal(browserCountry(['es-CO']), 'CO')
  assert.equal(browserCountry(['en-US']), 'US')
  for (const [locale, iso] of [['es-ES', 'ES'], ['es-MX', 'MX'], ['en-GB', 'GB'], ['fr-FR', 'FR'], ['de-DE', 'DE']]) assert.equal(browserCountry([locale]), iso)
})

test('prioriza país manual, luego hosting, navegador y finalmente Colombia', () => {
  const storage = { getItem: key => key === phoneCountryStorageKey ? 'CO' : null }
  assert.equal(detectVisitorCountry({ storage, cdnCountry: 'BR', languages: ['en-US'] }), 'CO')
  assert.equal(detectVisitorCountry({ storage: null, cdnCountry: 'BR', languages: ['en-US'] }), 'BR')
  assert.equal(detectVisitorCountry({ storage: null, cdnCountry: null, languages: ['en-US'] }), 'US')
  assert.equal(detectVisitorCountry({ storage: null, cdnCountry: null, languages: ['xx'] }), 'CO')
})

test('recuerda el cambio manual de BR a CO sin compartir estado con el idioma', () => {
  const values = new Map([[phoneCountryStorageKey, 'BR']])
  const storage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) }
  assert.equal(detectVisitorCountry({ storage, languages: ['pt-BR'] }), 'BR')
  assert.equal(rememberPhoneCountry('CO', storage), true)
  assert.equal(detectVisitorCountry({ storage, languages: ['pt-BR'] }), 'CO')
  assert.notEqual(phoneCountryStorageKey, internationalization.storageKey)
})
