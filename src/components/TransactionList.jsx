import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useState } from 'react'

const TransactionList = ({ transactions, onDelete }) => {
  const { isDark } = useTheme()
  const [deletingId, setDeletingId] = useState(null)

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getCategoryLabel = (category) => {
    const categories = {
      alimentacion: 'Alimentación',
      transporte: 'Transporte',
      ocio: 'Ocio',
      trabajo: 'Trabajo',
      salud: 'Salud',
      educacion: 'Educación',
      hogar: 'Hogar',
      otros: 'Otros'
    }
    return categories[category] || category
  }

  const getCategoryColor = (category) => {
    const colors = {
      alimentacion: isDark ? 'bg-orange-900/30 text-orange-300 border-orange-700' : 'bg-orange-100 text-orange-700 border-orange-200',
      transporte: isDark ? 'bg-blue-900/30 text-blue-300 border-blue-700' : 'bg-blue-100 text-blue-700 border-blue-200',
      ocio: isDark ? 'bg-pink-900/30 text-pink-300 border-pink-700' : 'bg-pink-100 text-pink-700 border-pink-200',
      trabajo: isDark ? 'bg-green-900/30 text-green-300 border-green-700' : 'bg-green-100 text-green-700 border-green-200',
      salud: isDark ? 'bg-red-900/30 text-red-300 border-red-700' : 'bg-red-100 text-red-700 border-red-200',
      educacion: isDark ? 'bg-purple-900/30 text-purple-300 border-purple-700' : 'bg-purple-100 text-purple-700 border-purple-200',
      hogar: isDark ? 'bg-indigo-900/30 text-indigo-300 border-indigo-700' : 'bg-indigo-100 text-indigo-700 border-indigo-200',
      otros: isDark ? 'bg-gray-700/30 text-gray-300 border-gray-600' : 'bg-gray-100 text-gray-700 border-gray-200',
    }
    return colors[category] || colors.otros
  }

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este movimiento?')) {
      setDeletingId(id)
      setTimeout(() => {
        onDelete(id)
        setDeletingId(null)
      }, 300)
    }
  }

  if (transactions.length === 0) {
    return (
      <div className={`text-center py-24 sm:py-32 rounded-2xl backdrop-blur-sm animate-scale-in ${
        isDark 
          ? 'bg-gray-800/50 border border-gray-700/50' 
          : 'bg-white/70 border border-gray-200/50'
      } shadow-xl`}>
        <h3 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          No hay movimientos
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-10 text-lg sm:text-xl">
          Comienza agregando tu primer ingreso o gasto
        </p>
        <Link
          to="/nuevo"
          className="inline-flex items-center gap-2 px-10 py-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-purple-500/30 font-bold text-lg"
        >
          Agregar Movimiento
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-5 sm:space-y-6">
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          className={`group relative p-6 sm:p-8 lg:p-10 rounded-2xl border backdrop-blur-sm transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl animate-fade-in ${
            deletingId === transaction.id ? 'opacity-0 scale-95' : ''
          } ${
            isDark
              ? 'bg-gray-800/60 border-gray-700/50 hover:border-gray-600 shadow-lg shadow-black/20'
              : 'bg-white/80 border-gray-200/50 hover:border-gray-300 shadow-lg shadow-gray-200/20'
          }`}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          {/* Gradient border on hover */}
          <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            transaction.type === 'ingreso'
              ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10'
              : 'bg-gradient-to-r from-red-500/10 to-rose-500/10'
          }`}></div>
          
          <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex-1 min-w-0 w-full sm:w-auto">
              <h3 className="font-extrabold text-xl sm:text-2xl mb-4 text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {transaction.description}
              </h3>
              <div className="flex items-center flex-wrap gap-3 sm:gap-4">
                <span className={`px-3 py-1.5 rounded-full font-semibold text-xs sm:text-sm border transition-all ${
                  getCategoryColor(transaction.category)
                }`}>
                  {getCategoryLabel(transaction.category)}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(transaction.date)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 w-full sm:w-auto justify-between sm:justify-end">
              <div className="text-right">
                <span
                  className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold transition-all ${
                    transaction.type === 'ingreso' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.type === 'ingreso' ? '+' : '-'}{formatAmount(transaction.amount)}
                </span>
              </div>
              <div className="flex space-x-3">
                <Link
                  to={`/editar/${transaction.id}`}
                  className={`px-5 py-3 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-md text-sm font-semibold ${
                    isDark
                      ? 'bg-blue-900/40 text-blue-400 hover:bg-blue-800/60 hover:shadow-blue-500/30'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200 hover:shadow-blue-500/30'
                  }`}
                  title="Editar"
                  aria-label="Editar transacción"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(transaction.id)}
                  className={`px-5 py-3 rounded-xl transition-all transform hover:scale-110 active:scale-95 shadow-md text-sm font-semibold ${
                    isDark
                      ? 'bg-red-900/40 text-red-400 hover:bg-red-800/60 hover:shadow-red-500/30'
                      : 'bg-red-100 text-red-600 hover:bg-red-200 hover:shadow-red-500/30'
                  }`}
                  title="Eliminar"
                  aria-label="Eliminar transacción"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default TransactionList
