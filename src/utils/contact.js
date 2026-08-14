export const whatsappUrl = (site, message = site.whatsappMessage) => `https://wa.me/${site.phone}?text=${encodeURIComponent(message)}`
