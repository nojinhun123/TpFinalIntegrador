export const mockTransactions = [
  {
    id: '1',
    description: 'Compra en supermercado',
    category: 'alimentacion',
    type: 'gasto',
    amount: 15000,
    date: '2024-01-15'
  },
  {
    id: '2',
    description: 'Salario enero',
    category: 'trabajo',
    type: 'ingreso',
    amount: 120000,
    date: '2024-01-01'
  },
  {
    id: '3',
    description: 'Transporte público',
    category: 'transporte',
    type: 'gasto',
    amount: 2500,
    date: '2024-01-14'
  },
  {
    id: '4',
    description: 'Cine con amigos',
    category: 'ocio',
    type: 'gasto',
    amount: 8000,
    date: '2024-01-13'
  },
  {
    id: '5',
    description: 'Freelance diseño',
    category: 'trabajo',
    type: 'ingreso',
    amount: 45000,
    date: '2024-01-10'
  },
  {
    id: '6',
    description: 'Medicamentos',
    category: 'salud',
    type: 'gasto',
    amount: 12000,
    date: '2024-01-12'
  }
]

export const categories = [
  { value: 'alimentacion', label: 'Alimentación' },
  { value: 'transporte', label: 'Transporte' },
  { value: 'ocio', label: 'Ocio' },
  { value: 'trabajo', label: 'Trabajo' },
  { value: 'salud', label: 'Salud' },
  { value: 'educacion', label: 'Educación' },
  { value: 'hogar', label: 'Hogar' },
  { value: 'otros', label: 'Otros' }
]
