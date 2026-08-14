import { internationalization } from '../config/i18n.js'

export function normalizeBrowserLanguage(value = '') {
  const locale = value.toLowerCase()
  if (locale.startsWith('es')) return 'es'
  if (locale.startsWith('en')) return 'en'
  if (locale.startsWith('pt')) return 'pt'
  if (locale.startsWith('fr')) return 'fr'
  if (locale.startsWith('de')) return 'de'
  if (locale.startsWith('it')) return 'it'
  if (locale.startsWith('zh')) return 'zh-CN'
  if (locale.startsWith('ja')) return 'ja'
  if (locale.startsWith('ko')) return 'ko'
  if (locale.startsWith('ar')) return 'ar'
  if (locale.startsWith('hi')) return 'hi'
  if (locale.startsWith('nl')) return 'nl'
  if (locale.startsWith('pl')) return 'pl'
  if (locale.startsWith('tr')) return 'tr'
  return null
}

export function detectBrowserLanguage(languages = []) {
  for (const value of languages) {
    const locale = normalizeBrowserLanguage(value)
    if (locale) return locale
  }
  return internationalization.defaultLocale
}

export function isSupportedLanguage(locale) {
  return [...internationalization.supportedLocales, ...internationalization.googleLocales].includes(locale)
}

export function resolveLanguagePreference({ requested, saved, languages = [] }) {
  if (isSupportedLanguage(requested)) return requested
  if (isSupportedLanguage(saved)) return saved
  return detectBrowserLanguage(languages)
}
