import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const TransactionList = ({ transactions, onDelete }) => {
  const { isDark } = useTheme()

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-AR')
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

  if (transactions.length === 0) {
    return (
      <div className={`text-center py-16 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
        <div className="text-7xl mb-6 animate-bounce">📝</div>
        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">No hay movimientos</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">Comienza agregando tu primer ingreso o gasto</p>
        <Link
          to="/nuevo"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg font-semibold"
        >
          ➕ Agregar Movimiento
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className={`p-5 rounded-xl border shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] ${
            isDark
              ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
              : 'bg-white border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-xl mb-2 text-gray-900 dark:text-white truncate">
                {transaction.description}
              </h3>
              <div className="flex items-center flex-wrap gap-3 text-sm">
                <span className={`px-3 py-1 rounded-full font-medium ${
                  isDark
                    ? 'bg-blue-900/30 text-blue-300 border border-blue-700'
                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                }`}>
                  🏷️ {getCategoryLabel(transaction.category)}
                </span>
                <span className="text-gray-500 dark:text-gray-400">📅 {formatDate(transaction.date)}</span>
              </div>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-right">
                <span
                  className={`text-2xl font-bold ${
                    transaction.type === 'ingreso' 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.type === 'ingreso' ? '+' : '-'}{formatAmount(transaction.amount)}
                </span>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/editar/${transaction.id}`}
                  className={`p-2.5 rounded-lg transition-all transform hover:scale-110 ${
                    isDark
                      ? 'bg-blue-900/30 text-blue-400 hover:bg-blue-800/50'
                      : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                  }`}
                  title="Editar"
                >
                  ✏️
                </Link>
                <button
                  onClick={() => {
                    if (window.confirm('¿Estás seguro de que deseas eliminar este movimiento?')) {
                      onDelete(transaction.id)
                    }
                  }}
                  className={`p-2.5 rounded-lg transition-all transform hover:scale-110 ${
                    isDark
                      ? 'bg-red-900/30 text-red-400 hover:bg-red-800/50'
                      : 'bg-red-100 text-red-600 hover:bg-red-200'
                  }`}
                  title="Eliminar"
                >
                  🗑️
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
