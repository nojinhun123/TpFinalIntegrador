import { useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { mockTransactions } from '../data/mockData'
import TransactionList from '../components/TransactionList'
import SearchFilters from '../components/SearchFilters'
import { useTheme } from '../context/ThemeContext'

const Home = () => {
  const { isDark } = useTheme()
  const [transactions, setTransactions] = useLocalStorage('transactions', mockTransactions)
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('todos')
  const [filterCategory, setFilterCategory] = useState('todas')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')
  const [filterAmountMin, setFilterAmountMin] = useState('')
  const [filterAmountMax, setFilterAmountMax] = useState('')
  const [sortBy, setSortBy] = useState('fecha')
  const [sortOrder, setSortOrder] = useState('desc')

  useEffect(() => {
    let filtered = [...transactions]

    // Filtro por búsqueda de texto
    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filtro por tipo
    if (filterType !== 'todos') {
      filtered = filtered.filter(transaction => transaction.type === filterType)
    }

    // Filtro por categoría
    if (filterCategory !== 'todas') {
      filtered = filtered.filter(transaction => transaction.category === filterCategory)
    }

    // Filtro por rango de fechas
    if (filterDateFrom) {
      filtered = filtered.filter(transaction => {
        return new Date(transaction.date) >= new Date(filterDateFrom)
      })
    }

    if (filterDateTo) {
      filtered = filtered.filter(transaction => {
        return new Date(transaction.date) <= new Date(filterDateTo)
      })
    }

    // Filtro por rango de monto
    if (filterAmountMin) {
      const min = parseFloat(filterAmountMin)
      filtered = filtered.filter(transaction => transaction.amount >= min)
    }

    if (filterAmountMax) {
      const max = parseFloat(filterAmountMax)
      filtered = filtered.filter(transaction => transaction.amount <= max)
    }

    // Ordenamiento
    filtered.sort((a, b) => {
      let comparison = 0
      
      if (sortBy === 'fecha') {
        comparison = new Date(a.date) - new Date(b.date)
      } else if (sortBy === 'monto') {
        comparison = a.amount - b.amount
      } else if (sortBy === 'descripcion') {
        comparison = a.description.localeCompare(b.description)
      }
      
      return sortOrder === 'asc' ? comparison : -comparison
    })

    setFilteredTransactions(filtered)
  }, [transactions, searchTerm, filterType, filterCategory, filterDateFrom, filterDateTo, filterAmountMin, filterAmountMax, sortBy, sortOrder])

  const handleDelete = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id))
  }

  return (
    <div className="w-full space-y-8 sm:space-y-10 pb-24 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Mis Movimientos
        </h2>
        <div className={`px-5 py-2.5 rounded-xl font-bold shadow-md ${
          isDark 
            ? 'bg-blue-900/40 text-blue-300 border-2 border-blue-700/50' 
            : 'bg-blue-100 text-blue-700 border-2 border-blue-200'
        }`}>
          {filteredTransactions.length} {filteredTransactions.length === 1 ? 'movimiento' : 'movimientos'}
        </div>
      </div>

      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        filterDateFrom={filterDateFrom}
        setFilterDateFrom={setFilterDateFrom}
        filterDateTo={filterDateTo}
        setFilterDateTo={setFilterDateTo}
        filterAmountMin={filterAmountMin}
        setFilterAmountMin={setFilterAmountMin}
        filterAmountMax={filterAmountMax}
        setFilterAmountMax={setFilterAmountMax}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <TransactionList
        transactions={filteredTransactions}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Home
