import { useState } from 'react'
import { sites, templateOptions } from './config/sites.js'
import { BarberTemplate, ClinicTemplate, RestaurantTemplate } from './templates/Templates.jsx'

const templates = { restaurant: RestaurantTemplate, clinic: ClinicTemplate, barber: BarberTemplate }

function initialTemplate() {
  const value = new URLSearchParams(window.location.search).get('template')
  return templates[value] ? value : 'restaurant'
}

export default function App() {
  const [selected, setSelected] = useState(initialTemplate)
  const Template = templates[selected]
  const changeTemplate = (value) => {
    setSelected(value)
    const url = new URL(window.location)
    url.searchParams.set('template', value)
    window.history.replaceState({}, '', url)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  return <><aside className="template-switcher"><label htmlFor="template">Vista previa</label><select id="template" value={selected} onChange={(event) => changeTemplate(event.target.value)}>{templateOptions.map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></aside><Template site={sites[selected]}/></>
}
