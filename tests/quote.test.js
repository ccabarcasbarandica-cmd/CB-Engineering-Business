import test from 'node:test'
import assert from 'node:assert/strict'
import { buildQuoteMessage, normalizeInternationalPhone, normalizeQuote, submitQuote, validateQuote } from '../src/utils/quote.js'
import { countries, searchCountries } from '../src/data/countries.js'

const colombia = countries.find(({ iso }) => iso === 'CO')
const validQuote = { name: ' Carlos  Cabarcas ', company: ' Empresa XYZ ', country: colombia, email: 'carlos@example.com', phone: '+57 320 123 4567', type: 'Energía solar', description: 'Instalar paneles.\n\n\nNecesito asesoría.' }
const company = { phone: '573206418292', whatsappMessage: 'Hola' }

test('normaliza campos y conserva párrafos razonables', () => {
  const quote = normalizeQuote(validQuote)
  assert.equal(quote.name, 'Carlos Cabarcas')
  assert.equal(quote.description, 'Instalar paneles.\n\nNecesito asesoría.')
})

test('valida correo, teléfono y campos requeridos', () => {
  const result = validateQuote({ ...validQuote, email: 'correo-invalido', phone: 'abc' })
  assert.equal(result.isValid, false)
  assert.match(result.errors.email, /correo válido/)
  assert.match(result.errors.phone, /teléfono internacional válido/)
})

test('construye el mensaje profesional completo', () => {
  const message = buildQuoteMessage(validQuote)
  assert.match(message, /Hola, JC Cabarcas Ingeniería\./)
  assert.match(message, /Tipo de proyecto: Energía solar/)
  assert.match(message, /País: Colombia/)
  assert.match(message, /Teléfono: \+573201234567/)
  assert.match(message, /Quedo atento a su contacto\./)
})

test('abre WhatsApp solo cuando los datos son válidos', () => {
  let openedUrl = ''
  const result = submitQuote(validQuote, company, { openLink: (url) => { openedUrl = url; return {} } })
  assert.equal(result.ok, true)
  assert.equal(result.opened, true)
  assert.match(openedUrl, /^https:\/\/wa\.me\/573206418292\?text=/)
  assert.match(decodeURIComponent(openedUrl), /Carlos Cabarcas/)
})

test('normaliza números internacionales sin duplicar el prefijo', () => {
  const spain = countries.find(({ iso }) => iso === 'ES')
  assert.equal(normalizeInternationalPhone(spain, '612 345 678'), '+34612345678')
  assert.equal(normalizeInternationalPhone(spain, '+34 (612) 345-678'), '+34612345678')
  assert.equal(normalizeInternationalPhone(colombia, '320-641-8292'), '+573206418292')
})

test('encuentra países por nombre, ISO y prefijo', () => {
  assert.equal(searchCountries('Colombia')[0].iso, 'CO')
  assert.equal(searchCountries('CO').some(({ iso }) => iso === 'CO'), true)
  assert.equal(searchCountries('+57').some(({ iso }) => iso === 'CO'), true)
})

test('incluye los mercados solicitados con el prefijo esperado', () => {
  const expected = { CO: '+57', US: '+1', CA: '+1', ES: '+34', MX: '+52', GB: '+44', DE: '+49', FR: '+33', BR: '+55', AR: '+54' }
  for (const [iso, dialCode] of Object.entries(expected)) assert.equal(countries.find((country) => country.iso === iso)?.dialCode, dialCode)
})
