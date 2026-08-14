/* eslint-disable react-refresh/only-export-components */
import { useEffect, useRef, useState } from 'react'
import { languageOptions } from '../../config/i18n.js'
import { useI18n } from '../../context/I18nContext.jsx'

const SCRIPT_ID = 'google-translate-script'
const ELEMENT_ID = 'google_translate_element'
const READY_EVENT = 'jc-google-translate-ready'

function initializeWidget() {
  const container = document.getElementById(ELEMENT_ID)
  if (!container || container.dataset.initialized === 'true' || !window.google?.translate?.TranslateElement) return
  container.dataset.initialized = 'true'
  new window.google.translate.TranslateElement({ pageLanguage: 'es', autoDisplay: false }, ELEMENT_ID)
  window.dispatchEvent(new Event(READY_EVENT))
}

function loadGoogleTranslate() {
  window.googleTranslateElementInit = initializeWidget
  if (window.google?.translate?.TranslateElement) return initializeWidget()
  if (document.getElementById(SCRIPT_ID)) return
  const script = document.createElement('script')
  script.id = SCRIPT_ID
  script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
  script.async = true
  document.head.appendChild(script)
}

function expireGoogleCookie(domain = '') {
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;${domain ? ` domain=${domain};` : ''} SameSite=Lax`
}

export function clearGoogleTranslation() {
  const select = document.querySelector(`#${ELEMENT_ID} select.goog-te-combo`)
  const wasActive = Boolean(select?.value || document.cookie.includes('googtrans=') || document.documentElement.className.includes('translated-'))
  if (select?.value) {
    select.value = ''
    select.dispatchEvent(new Event('change', { bubbles: true }))
  }
  expireGoogleCookie()
  expireGoogleCookie(window.location.hostname)
  expireGoogleCookie(`.${window.location.hostname}`)
  return wasActive
}

function applyGoogleLanguage(locale) {
  const select = document.querySelector(`#${ELEMENT_ID} select.goog-te-combo`)
  if (!select || ![...select.options].some(option => option.value === locale)) return false
  if (select.value !== locale) {
    select.value = locale
    select.dispatchEvent(new Event('change', { bubbles: true }))
  }
  return true
}

function TranslateIcon() {
  return <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true"><path d="M4 5h10M9 3v2c0 4.4-2.2 7.9-5.5 10M6.5 9.5c1.2 2 3 3.8 5.5 5M14 21l4-10 4 10M15.5 17h5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>
}

export function GoogleTranslate() {
  const { selectedLanguage, selectLanguage, copy } = useI18n()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    loadGoogleTranslate()
  }, [])

  useEffect(() => {
    if (selectedLanguage === 'es' || selectedLanguage === 'en') {
      clearGoogleTranslation()
      return
    }
    let attempts = 0
    let timer
    const apply = () => {
      attempts += 1
      if (applyGoogleLanguage(selectedLanguage) || attempts >= 40) window.clearInterval(timer)
    }
    apply()
    timer = window.setInterval(apply, 250)
    window.addEventListener(READY_EVENT, apply)
    return () => { window.clearInterval(timer); window.removeEventListener(READY_EVENT, apply) }
  }, [selectedLanguage])

  useEffect(() => {
    const close = event => {
      if (event.key === 'Escape') { setOpen(false); triggerRef.current?.focus() }
      if (event.type === 'pointerdown' && !rootRef.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('keydown', close)
    document.addEventListener('pointerdown', close)
    return () => { document.removeEventListener('keydown', close); document.removeEventListener('pointerdown', close) }
  }, [])

  const chooseLanguage = locale => {
    if (locale === 'es' || locale === 'en') {
      const wasTranslated = clearGoogleTranslation()
      selectLanguage(locale)
      if (wasTranslated) window.setTimeout(() => window.location.reload(), 80)
    } else {
      clearGoogleTranslation()
      selectLanguage(locale)
    }
    setOpen(false)
  }

  return <div className="google-translate notranslate" translate="no" ref={rootRef}>
    <button ref={triggerRef} className="google-translate-trigger" type="button" aria-label={copy.language.otherLabel} aria-expanded={open} aria-controls="google-translate-panel" onClick={() => setOpen(current => !current)}><TranslateIcon/></button>
    <div id="google-translate-panel" className={open ? 'google-translate-panel is-open' : 'google-translate-panel'} aria-hidden={!open}>
      <strong>{copy.language.menuTitle}</strong>
      <div className="translation-options" role="menu" aria-label={copy.language.otherLabel}>
        {languageOptions.map(option => <button type="button" role="menuitemradio" aria-checked={selectedLanguage === option.code} className={selectedLanguage === option.code ? 'is-active' : ''} key={option.code} onClick={() => chooseLanguage(option.code)}>{option.label}{option.official && <small>{copy.language.official}</small>}</button>)}
      </div>
      <div id={ELEMENT_ID} aria-hidden="true"/>
    </div>
  </div>
}
