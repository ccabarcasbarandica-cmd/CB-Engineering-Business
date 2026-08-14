import { Footer, Navbar, WhatsApp } from '../components/corporate/Chrome.jsx'
import { About, Engineering, GlobalVision, Hero, Pillars, Projects, QuoteContact, Sectors, SmartEnergy, Solar, Technology } from '../components/corporate/LocalizedSections.jsx'
import { I18nProvider } from '../context/I18nContext.jsx'
export function CorporateTemplate() { return <I18nProvider><div className="corporate-site"><Navbar/><main><Hero/><Pillars/><Engineering/><Solar/><Technology/><SmartEnergy/><Sectors/><About/><GlobalVision/><Projects/><QuoteContact/></main><Footer/><WhatsApp/></div></I18nProvider> }
