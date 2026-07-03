import logo from '../assets/logo.png'

export const siteConfig = {
  name: 'Mojito Bar',
  brand: 'Mojito',
  brandSuffix: 'BAR',

  logo,

  tagline: 'El sabor que te mueve',
  description: 'Mojitos artesanales preparados con ingredientes frescos y de calidad.',
  phone: import.meta.env.VITE_WHATSAPP_NUMBER || '56987073838',
  email: 'contacto@mojitobar.cl',
  address: 'Gabriela Mistral 1782, Coronel',
  mapUrl: 'https://maps.google.com/?q=Gabriela+Mistral+1782,+Coronel',
  hours: 'Lunes a Domingo 17:00 a 02:00 hrs',
  happyHour: 'Lunes a Jueves 17:00 a 20:00 hrs',
  isOpen: true,

  social: {
    instagram: 'https://instagram.com/mojitobar',
    facebook: 'https://facebook.com/mojitobar',
    whatsapp: 'https://wa.me/56987073838',
  },
}