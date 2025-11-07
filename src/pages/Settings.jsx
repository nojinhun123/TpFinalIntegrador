import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useLocalStorage } from '../hooks/useLocalStorage'

const Settings = () => {
  const { isDark, toggleTheme } = useTheme()
  const [, setTransactions] = useLocalStorage('transactions', [])
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const handleClearData = () => {
    setTransactions([])
    setShowConfirmDialog(false)
    alert('Todos los datos han sido eliminados correctamente.')
  }

  return (
    <div className="w-full pb-24 animate-fade-in">
      <div className="space-y-8 sm:space-y-10">
        <div className="mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Ajustes
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg sm:text-xl">
            Personaliza tu experiencia y gestiona tus datos
          </p>
        </div>

        {/* Sección de Tema */}
        <div className={`p-8 sm:p-10 lg:p-12 rounded-2xl backdrop-blur-sm shadow-xl animate-scale-in ${isDark ? 'bg-gray-800/70 border border-gray-700/50' : 'bg-white/80 border border-gray-200/50'}`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold">Tema</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Cambia entre tema claro y oscuro
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className={`px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-md ${
              isDark
                ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600'
                : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black'
            }`}
          >
            {isDark ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
        </div>
        <div className="mt-6 p-5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            El tema se guarda automáticamente y se aplicará la próxima vez que ingreses.
          </p>
        </div>
      </div>

        {/* Sección de Datos */}
        <div className={`p-8 sm:p-10 lg:p-12 rounded-2xl backdrop-blur-sm shadow-xl animate-scale-in ${isDark ? 'bg-gray-800/70 border border-gray-700/50' : 'bg-white/80 border border-gray-200/50'}`} style={{ animationDelay: '100ms' }}>
        <div className="mb-6">
          <h3 className="text-xl font-bold">Gestión de Datos</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Elimina todos tus movimientos guardados
          </p>
        </div>

        <div className="mt-6 p-5 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 mb-6">
          <p className="text-sm text-red-800 dark:text-red-200 font-medium">
            Esta acción no se puede deshacer. Se eliminarán todos tus movimientos y datos guardados.
          </p>
        </div>

        {!showConfirmDialog ? (
          <button
            onClick={() => setShowConfirmDialog(true)}
            className="px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 shadow-md"
          >
            Eliminar Todos los Datos
          </button>
        ) : (
          <div className="space-y-5">
            <div className="p-5 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                ¿Estás seguro de que deseas eliminar todos los datos? Esta acción es irreversible.
              </p>
            </div>
            <div className="flex space-x-5">
              <button
                onClick={handleClearData}
                className="flex-1 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all shadow-md"
              >
                Confirmar Eliminación
              </button>
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 px-8 py-4 rounded-xl font-semibold bg-gray-500 text-white hover:bg-gray-600 transition-all shadow-md"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>

        {/* Información de la App */}
        <div className={`p-8 sm:p-10 lg:p-12 rounded-2xl backdrop-blur-sm shadow-xl animate-scale-in ${isDark ? 'bg-gray-800/70 border border-gray-700/50' : 'bg-white/80 border border-gray-200/50'}`} style={{ animationDelay: '200ms' }}>
        <div className="mb-6">
          <h3 className="text-xl font-bold">Acerca de Mi Presupuesto</h3>
        </div>
        <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <p>
            <strong className="text-gray-900 dark:text-white">Versión:</strong> 1.0.0
          </p>
          <p>
            <strong className="text-gray-900 dark:text-white">Descripción:</strong> Aplicación para gestionar tus ingresos y gastos personales de manera sencilla y eficiente.
          </p>
          <p>
            <strong className="text-gray-900 dark:text-white">Características:</strong>
          </p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>Registro de ingresos y gastos</li>
            <li>Filtros y búsqueda avanzada</li>
            <li>Gráficos y resúmenes financieros</li>
            <li>Persistencia de datos en localStorage</li>
            <li>Tema claro y oscuro</li>
          </ul>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Settings

