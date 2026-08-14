import { whatsappUrl } from './contact.js'

const cleanLine = (value = '') => String(value).trim().replace(/\s+/g, ' ')
const cleanDescription = (value = '') => String(value).trim().replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n')

export function normalizeInternationalPhone(country, value = '') {
  const dialDigits = String(country?.dialCode || '').replace(/\D/g, '')
  let numberDigits = String(value).replace(/\D/g, '')
  if (numberDigits.startsWith('00')) numberDigits = numberDigits.slice(2)
  if (dialDigits && !numberDigits.startsWith(dialDigits)) numberDigits = `${dialDigits}${numberDigits}`
  return numberDigits ? `+${numberDigits}` : ''
}

export function normalizeQuote(formValues) {
  return {
    name: cleanLine(formValues.name).slice(0, 100),
    company: cleanLine(formValues.company).slice(0, 120),
    email: cleanLine(formValues.email).slice(0, 160),
    country: formValues.country ? { name: cleanLine(formValues.country.name), iso: cleanLine(formValues.country.iso), dialCode: cleanLine(formValues.country.dialCode) } : null,
    phone: normalizeInternationalPhone(formValues.country, formValues.phone).slice(0, 30),
    type: cleanLine(formValues.type).slice(0, 80),
    description: cleanDescription(formValues.description).slice(0, 1500),
  }
}

const defaultErrors = { name: 'Por favor ingresa tu nombre.', company: 'Por favor ingresa el nombre de la empresa.', emailRequired: 'Por favor ingresa tu correo.', emailInvalid: 'Por favor ingresa un correo válido.', phoneRequired: 'Por favor ingresa un teléfono de contacto.', phoneInvalid: 'Por favor ingresa un teléfono internacional válido.', country: 'Por favor selecciona tu país.', type: 'Por favor selecciona un tipo de proyecto.', description: 'Por favor describe brevemente tu proyecto.' }
const defaultMessage = { greeting: 'Hola, JC Cabarcas Ingeniería.', request: 'Quiero solicitar asesoría para un proyecto.', name: 'Nombre', company: 'Empresa', country: 'País', phone: 'Teléfono', email: 'Correo', type: 'Tipo de proyecto', description: 'Descripción', closing: 'Quedo atento a su contacto.' }

export function validateQuote(formValues, messages = defaultErrors) {
  const quote = normalizeQuote(formValues)
  const errors = {}
  if (!quote.name) errors.name = messages.name
  if (!quote.company) errors.company = messages.company
  if (!quote.email) errors.email = messages.emailRequired
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(quote.email)) errors.email = messages.emailInvalid
  if (!quote.phone) errors.phone = messages.phoneRequired
  else if (!/^\+[0-9]{7,15}$/.test(quote.phone)) errors.phone = messages.phoneInvalid
  if (!quote.country?.name) errors.country = messages.country
  if (!quote.type) errors.type = messages.type
  if (!quote.description) errors.description = messages.description
  return { quote, errors, isValid: Object.keys(errors).length === 0 }
}

export function buildQuoteMessage(formValues, messages = defaultMessage, localizedCountryName) {
  const quote = normalizeQuote(formValues)
  return [
    messages.greeting,
    '',
    messages.request,
    '',
    `${messages.name}: ${quote.name}`,
    `${messages.company}: ${quote.company}`,
    `${messages.country}: ${localizedCountryName || quote.country.name}`,
    `${messages.phone}: ${quote.phone}`,
    `${messages.email}: ${quote.email}`,
    `${messages.type}: ${quote.type}`,
    '',
    `${messages.description}:`,
    quote.description,
    '',
    messages.closing,
  ].join('\n')
}

const openWhatsApp = (url) => {
  const tab = window.open(url, '_blank')
  if (tab) tab.opener = null
  return tab
}

export function submitQuote(formValues, company, options = {}) {
  const { errors = defaultErrors, message = defaultMessage, countryName, openLink = openWhatsApp } = options
  const validation = validateQuote(formValues, errors)
  if (!validation.isValid) return { ok: false, ...validation }
  const quoteMessage = buildQuoteMessage(validation.quote, message, countryName)
  const url = whatsappUrl(company, quoteMessage)
  const opened = Boolean(openLink(url))
  return { ok: true, opened, quote: validation.quote, message: quoteMessage, url, errors: {} }
}

export function requestQuoteType(type) {
  window.dispatchEvent(new CustomEvent('jc:quote-type', { detail: type }))
}
