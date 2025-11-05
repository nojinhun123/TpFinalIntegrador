import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { categories } from '../data/mockData'

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  filterCategory,
  setFilterCategory,
  filterDateFrom,
  setFilterDateFrom,
  filterDateTo,
  setFilterDateTo,
  filterAmountMin,
  setFilterAmountMin,
  filterAmountMax,
  setFilterAmountMax,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder
}) => {
  const { isDark } = useTheme()
  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleClearFilters = () => {
    setSearchTerm('')
    setFilterType('todos')
    setFilterCategory('todas')
    setFilterDateFrom('')
    setFilterDateTo('')
    setFilterAmountMin('')
    setFilterAmountMax('')
    setSortBy('fecha')
    setSortOrder('desc')
  }

  const inputClass = `w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
    isDark
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
  }`

  return (
    <div className={`p-6 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
      {/* Filtros básicos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            🔍 Buscar
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por descripción..."
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            📊 Tipo
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={inputClass}
          >
            <option value="todos">Todos</option>
            <option value="ingreso">Ingresos</option>
            <option value="gasto">Gastos</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
            🏷️ Categoría
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={inputClass}
          >
            <option value="todas">Todas</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Botón para mostrar/ocultar filtros avanzados */}
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            isDark
              ? 'bg-gray-700 text-white hover:bg-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {showAdvanced ? '⬆️ Ocultar filtros avanzados' : '⬇️ Mostrar filtros avanzados'}
        </button>
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 rounded-lg font-medium bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 transition-all"
        >
          🗑️ Limpiar filtros
        </button>
      </div>

      {/* Filtros avanzados */}
      {showAdvanced && (
        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                📅 Fecha desde
              </label>
              <input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                📅 Fecha hasta
              </label>
              <input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                💰 Monto mínimo
              </label>
              <input
                type="number"
                value={filterAmountMin}
                onChange={(e) => setFilterAmountMin(e.target.value)}
                placeholder="0"
                min="0"
                step="0.01"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                💰 Monto máximo
              </label>
              <input
                type="number"
                value={filterAmountMax}
                onChange={(e) => setFilterAmountMax(e.target.value)}
                placeholder="Sin límite"
                min="0"
                step="0.01"
                className={inputClass}
              />
            </div>
          </div>

          {/* Ordenamiento */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                🔄 Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={inputClass}
              >
                <option value="fecha">Fecha</option>
                <option value="monto">Monto</option>
                <option value="descripcion">Descripción</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                📈 Orden
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={inputClass}
              >
                <option value="desc">Descendente</option>
                <option value="asc">Ascendente</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchFilters
