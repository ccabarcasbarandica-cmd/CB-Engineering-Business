import { countries, defaultCountry } from '../data/countries.js'

export const phoneCountryStorageKey = 'jc-cabarcas-phone-country'

export function countryByIso(value) {
  const iso = String(value || '').trim().toUpperCase()
  return countries.find(country => country.iso === iso) || null
}

export function regionFromLocale(locale = '') {
  try {
    return new Intl.Locale(locale).region || null
  } catch {
    const match = String(locale).match(/[-_]([A-Za-z]{2})(?:$|[-_])/)
    return match?.[1]?.toUpperCase() || null
  }
}

export function browserCountry(languages = []) {
  for (const locale of languages) {
    const country = countryByIso(regionFromLocale(locale))
    if (country) return country.iso
  }
  return null
}

export function hostingCountry() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return null
  // A future hosting/CDN edge may inject only the ISO country into any of these
  // same-origin values. No IP address or precise location reaches this application.
  return window.__JC_VISITOR_COUNTRY__
    || document.documentElement.dataset.visitorCountry
    || document.querySelector('meta[name="visitor-country"]')?.content
    || null
}

function storedCountry(storage) {
  try {
    return countryByIso(storage?.getItem(phoneCountryStorageKey))?.iso || null
  } catch {
    return null
  }
}

export function detectVisitorCountry({ storage, cdnCountry, languages } = {}) {
  const availableStorage = storage ?? (typeof window !== 'undefined' ? window.localStorage : null)
  const saved = storedCountry(availableStorage)
  if (saved) return saved
  const fromHosting = countryByIso(cdnCountry ?? hostingCountry())?.iso
  if (fromHosting) return fromHosting
  const browserLanguages = languages ?? (typeof navigator !== 'undefined' ? (navigator.languages?.length ? navigator.languages : [navigator.language]) : [])
  return browserCountry(browserLanguages) || defaultCountry.iso
}

export function rememberPhoneCountry(iso, storage = typeof window !== 'undefined' ? window.localStorage : null) {
  const country = countryByIso(iso)
  if (!country) return false
  try {
    storage?.setItem(phoneCountryStorageKey, country.iso)
    return true
  } catch {
    return false
  }
}
