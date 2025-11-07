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


  return (
    <div className={`p-6 sm:p-8 lg:p-10 rounded-2xl backdrop-blur-sm shadow-xl animate-fade-in ${
      isDark 
        ? 'bg-gray-800/60 border border-gray-700/50' 
        : 'bg-white/80 border border-gray-200/50'
    }`}>
      {/* Filtros básicos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div>
          <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
            Buscar
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por descripción..."
            className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
              isDark
                ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                : 'bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
          />
        </div>

        <div>
          <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
            Tipo
          </label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer ${
              isDark
                ? 'bg-gray-700/50 border-gray-600 text-white'
                : 'bg-white/90 border-gray-300 text-gray-900'
            }`}
          >
            <option value="todos">Todos</option>
            <option value="ingreso">Ingresos</option>
            <option value="gasto">Gastos</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
            Categoría
          </label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer ${
              isDark
                ? 'bg-gray-700/50 border-gray-600 text-white'
                : 'bg-white/90 border-gray-300 text-gray-900'
            }`}
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
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`px-6 py-4 rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95 shadow-md ${
            isDark
              ? 'bg-gray-700/60 text-white hover:bg-gray-600/80 border border-gray-600'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
          }`}
        >
          {showAdvanced ? 'Ocultar filtros avanzados' : 'Mostrar filtros avanzados'}
        </button>
        <button
          onClick={handleClearFilters}
          className="px-6 py-4 rounded-xl font-bold bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all transform hover:scale-105 active:scale-95 shadow-md shadow-red-500/30"
        >
          Limpiar filtros
        </button>
      </div>

      {/* Filtros avanzados */}
      {showAdvanced && (
        <div className={`mt-6 pt-6 border-t-2 space-y-6 animate-slide-in ${
          isDark ? 'border-gray-700' : 'border-gray-300'
        }`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
                Fecha desde
              </label>
              <input
                type="date"
                value={filterDateFrom}
                onChange={(e) => setFilterDateFrom(e.target.value)}
                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  isDark
                    ? 'bg-gray-700/50 border-gray-600 text-white'
                    : 'bg-white/90 border-gray-300 text-gray-900'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
                Fecha hasta
              </label>
              <input
                type="date"
                value={filterDateTo}
                onChange={(e) => setFilterDateTo(e.target.value)}
                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  isDark
                    ? 'bg-gray-700/50 border-gray-600 text-white'
                    : 'bg-white/90 border-gray-300 text-gray-900'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
                Monto mínimo
              </label>
              <input
                type="number"
                value={filterAmountMin}
                onChange={(e) => setFilterAmountMin(e.target.value)}
                placeholder="0"
                min="0"
                step="0.01"
                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  isDark
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
                Monto máximo
              </label>
              <input
                type="number"
                value={filterAmountMax}
                onChange={(e) => setFilterAmountMax(e.target.value)}
                placeholder="Sin límite"
                min="0"
                step="0.01"
                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
                  isDark
                    ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white/90 border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>

          {/* Ordenamiento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
                Ordenar por
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer ${
                  isDark
                    ? 'bg-gray-700/50 border-gray-600 text-white'
                    : 'bg-white/90 border-gray-300 text-gray-900'
                }`}
              >
                <option value="fecha">Fecha</option>
                <option value="monto">Monto</option>
                <option value="descripcion">Descripción</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-3 text-gray-700 dark:text-gray-300">
                Orden
              </label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className={`w-full px-5 py-4 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer ${
                  isDark
                    ? 'bg-gray-700/50 border-gray-600 text-white'
                    : 'bg-white/90 border-gray-300 text-gray-900'
                }`}
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
