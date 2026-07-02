export const menuCategories = [
  { id: 'all', name: 'Todos', icon: 'grid' },
  { id: 'clasicos', name: 'Clásicos', icon: 'leaf' },
  { id: 'frutales', name: 'Frutales', icon: 'cherry' },
  { id: 'tropicales', name: 'Tropicales', icon: 'palm' },
  { id: 'premium', name: 'Premium', icon: 'star' },
  { id: 'sin-alcohol', name: 'Sin Alcohol', icon: 'drop' },
]

export const navLinks = [
  { id: 'inicio', label: 'Inicio', href: '#inicio', icon: 'home' },
  { id: 'carta', label: 'Ver carta', href: '#catalogo', icon: 'book' },
]

export const features = [
  { id: 'fresh', label: 'Ingredientes frescos', icon: 'leaf' },
  { id: 'craft', label: 'Recetas artesanales', icon: 'flask' },
  { id: 'unique', label: 'Sabores únicos', icon: 'star' },
  { id: 'experience', label: 'Experiencia inolvidable', icon: 'heart' },
]

export const menuItems = [
  {
    id: 1,
    name: 'Mojito Clásico',
    description: 'Ron blanco, menta fresca, lima, azúcar y soda.',
    price: 4500,
    category: 'clasicos',
    discountLabel: '2X1 HH',
    image:
      'https://images.unsplash.com/photo-1551538826-ba0e4b3e0f52?w=400&h=400&fit=crop&auto=format&q=75',
  },
  {
    id: 2,
    name: 'Mojito de Fresa',
    description: 'Ron blanco, fresas frescas, menta y lima.',
    price: 4800,
    category: 'frutales',
    discountLabel: '-10%',
    image:
      'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&h=400&fit=crop&auto=format&q=75',
  },
  {
    id: 3,
    name: 'Mojito Tropical',
    description: 'Ron blanco, piña, coco, menta y lima.',
    price: 4500,
    category: 'tropicales',
    image:
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=400&fit=crop&auto=format&q=75',
  },
  {
    id: 4,
    name: 'Mojito Blue',
    description: 'Ron blanco, curaçao blue, menta y lima.',
    price: 5000,
    category: 'premium',
    discountLabel: '15% OFF',
    image:
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&h=400&fit=crop&auto=format&q=75',
  },
  {
    id: 5,
    name: 'Mojito Coco',
    description: 'Ron blanco, crema de coco, menta y lima.',
    price: 5200,
    category: 'tropicales',
    image:
      'https://images.unsplash.com/photo-1546171753-97d0d3b8e3f4?w=400&h=400&fit=crop&auto=format&q=75',
  },
  {
    id: 6,
    name: 'Mojito Maracuyá',
    description: 'Ron blanco, maracuyá, menta y lima.',
    price: 4700,
    category: 'frutales',
    discountLabel: 'NUEVO',
    image:
      'https://images.unsplash.com/photo-1569058242567-93de6f36f8eb?w=400&h=400&fit=crop&auto=format&q=75',
  },
  {
    id: 7,
    name: 'Pitcher Clásico',
    description: 'Ron blanco, menta, lima, azúcar y soda. 1 litro.',
    price: 15000,
    category: 'clasicos',
    discountLabel: 'AHORRA 20%',
    image:
      'https://images.unsplash.com/photo-1569529465841-df988c29e152?w=400&h=400&fit=crop&auto=format&q=75',
  },
  {
    id: 8,
    name: 'Mojito Sin Alcohol',
    description: 'Menta, lima, azúcar y soda. Refrescante y ligero.',
    price: 3800,
    category: 'sin-alcohol',
    image:
      'https://images.unsplash.com/photo-1622483767298-d75344bde9e0?w=400&h=400&fit=crop&auto=format&q=75',
  },
]
