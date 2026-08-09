export const whatsappUrl = (site) => `https://wa.me/${site.phone}?text=${encodeURIComponent(site.whatsappMessage)}`
