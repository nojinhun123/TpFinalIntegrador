import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Settings = () => {
  const { isDark, toggleTheme } = useTheme()
  const [transactions, setTransactions] = useLocalStorage('transactions', [])
  const [showConfirm, setShowConfirm] = useState(false)

  const handleClearData = () => {
    setTransactions([])
    setShowConfirm(false)
  }

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount)
  }

  const totalIngresos = transactions
    .filter(t => t.type === 'ingreso')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalGastos = transactions
    .filter(t => t.type === 'gasto')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIngresos - totalGastos

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Configuración</h2>
        <p className="text-gray-600">Personaliza tu experiencia</p>
      </div>

      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className="text-xl font-semibold mb-4">Apariencia</h3>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Tema Oscuro</h4>
            <p className="text-sm text-gray-600">Activa el modo oscuro para una mejor experiencia nocturna</p>
          </div>
          <button
            onClick={toggleTheme}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              isDark ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                isDark ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className="text-xl font-semibold mb-4">Resumen de Datos</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm text-gray-600">Total Movimientos</p>
            <p className="text-lg font-semibold">{transactions.length}</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">💰</div>
            <p className="text-sm text-gray-600">Total Ingresos</p>
            <p className="text-lg font-semibold text-green-600">{formatAmount(totalIngresos)}</p>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-2">💸</div>
            <p className="text-sm text-gray-600">Total Gastos</p>
            <p className="text-lg font-semibold text-red-600">{formatAmount(totalGastos)}</p>
          </div>
        </div>

        <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Balance Actual</p>
          <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatAmount(balance)}
          </p>
        </div>
      </div>

      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className="text-xl font-semibold mb-4">Gestión de Datos</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Limpiar Todos los Datos</h4>
            <p className="text-sm text-gray-600 mb-4">
              Esta acción eliminará permanentemente todos tus movimientos. Esta acción no se puede deshacer.
            </p>
            
            {!showConfirm ? (
              <button
                onClick={() => setShowConfirm(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                🗑️ Limpiar Datos
              </button>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-red-600 font-medium">¿Estás seguro? Esta acción no se puede deshacer.</p>
                <div className="flex space-x-2">
                  <button
                    onClick={handleClearData}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Sí, eliminar todo
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <h3 className="text-xl font-semibold mb-4">Información de la App</h3>
        
        <div className="space-y-2 text-sm text-gray-600">
          <p><strong>Versión:</strong> 1.0.0</p>
          <p><strong>Desarrollado con:</strong> React + Vite</p>
          <p><strong>Persistencia:</strong> LocalStorage</p>
          <p><strong>Gráficos:</strong> Recharts</p>
        </div>
      </div>
    </div>
  )
}

export default Settings
