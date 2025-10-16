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
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-semibold mb-2">No hay movimientos</h3>
        <p className="text-gray-600 mb-4">Comienza agregando tu primer ingreso o gasto</p>
        <Link
          to="/nuevo"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          ➕ Agregar Movimiento
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className={`p-4 rounded-lg border ${
            isDark
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{transaction.description}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <span>{getCategoryLabel(transaction.category)}</span>
                <span>•</span>
                <span>{formatDate(transaction.date)}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`text-lg font-bold ${
                  transaction.type === 'ingreso' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {transaction.type === 'ingreso' ? '+' : '-'}{formatAmount(transaction.amount)}
              </span>
              <div className="flex space-x-1">
                <Link
                  to={`/editar/${transaction.id}`}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded"
                >
                  ✏️
                </Link>
                <button
                  onClick={() => onDelete(transaction.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded"
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
