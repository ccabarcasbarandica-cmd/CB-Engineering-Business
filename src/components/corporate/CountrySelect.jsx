import { useEffect, useRef, useState } from 'react'
import { countryName, searchCountries } from '../../data/countries.js'

export function CountrySelect({ value, onChange, language, labels }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const rootRef = useRef(null)
  const searchRef = useRef(null)
  const buttonRef = useRef(null)
  const results = searchCountries(query, language)
  const selectedName = countryName(value, language)

  useEffect(() => {
    if (open) searchRef.current?.focus()
  }, [open])

  const close = (returnFocus = false) => {
    setOpen(false)
    setQuery('')
    setActiveIndex(0)
    if (returnFocus) buttonRef.current?.focus()
  }

  const selectCountry = (country) => {
    onChange(country)
    close(true)
  }

  const handleKeys = (event) => {
    if (event.key === 'Escape') { event.preventDefault(); close(true) }
    if (event.key === 'ArrowDown') { event.preventDefault(); setActiveIndex((index) => Math.min(index + 1, results.length - 1)) }
    if (event.key === 'ArrowUp') { event.preventDefault(); setActiveIndex((index) => Math.max(index - 1, 0)) }
    if (event.key === 'Enter' && results[activeIndex]) { event.preventDefault(); selectCountry(results[activeIndex]) }
  }

  return <div className="country-select" ref={rootRef} onBlur={(event) => { if (!rootRef.current?.contains(event.relatedTarget)) close() }}>
    <button ref={buttonRef} className="country-trigger" type="button" aria-label={`${labels.trigger}: ${selectedName} ${value.dialCode}`} aria-haspopup="listbox" aria-expanded={open} aria-controls="country-listbox" onClick={() => setOpen((current) => !current)}>
      <span aria-hidden="true">{value.flag}</span><b>{value.dialCode}</b><i aria-hidden="true">⌄</i>
    </button>
    {open && <div className="country-popover">
      <label className="country-search-label" htmlFor="country-search">{labels.searchLabel}</label>
      <input ref={searchRef} id="country-search" className="country-search" type="search" value={query} placeholder={labels.searchPlaceholder} autoComplete="off" aria-controls="country-listbox" aria-activedescendant={results[activeIndex] ? `country-${results[activeIndex].iso}` : undefined} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }} onKeyDown={handleKeys}/>
      <div id="country-listbox" className="country-options" role="listbox" aria-label={labels.listLabel}>
        {results.map((country, index) => <button id={`country-${country.iso}`} type="button" role="option" aria-selected={country.iso === value.iso} className={index === activeIndex ? 'country-option is-active' : 'country-option'} key={country.iso} onMouseDown={(event) => event.preventDefault()} onMouseEnter={() => setActiveIndex(index)} onClick={() => selectCountry(country)}><span aria-hidden="true">{country.flag}</span><b>{countryName(country, language)}</b><small>{country.iso}</small><em>{country.dialCode}</em></button>)}
        {!results.length && <p className="country-empty">{labels.empty}</p>}
      </div>
    </div>}
  </div>
}
