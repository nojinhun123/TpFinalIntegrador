import { useState, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { mockTransactions } from '../data/mockData'
import TransactionList from '../components/TransactionList'
import SearchFilters from '../components/SearchFilters'

const Home = () => {
  const [transactions, setTransactions] = useLocalStorage('transactions', mockTransactions)
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('todos')
  const [filterCategory, setFilterCategory] = useState('todas')

  useEffect(() => {
    let filtered = transactions

    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterType !== 'todos') {
      filtered = filtered.filter(transaction => transaction.type === filterType)
    }

    if (filterCategory !== 'todas') {
      filtered = filtered.filter(transaction => transaction.category === filterCategory)
    }

    setFilteredTransactions(filtered)
  }, [transactions, searchTerm, filterType, filterCategory])

  const handleDelete = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Mis Movimientos</h2>
        <div className="text-sm text-gray-600">
          {filteredTransactions.length} movimientos
        </div>
      </div>

      <SearchFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterType={filterType}
        setFilterType={setFilterType}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
      />

      <TransactionList
        transactions={filteredTransactions}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Home
