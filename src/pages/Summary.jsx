import { useMemo } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { mockTransactions } from '../data/mockData'
import { useTheme } from '../context/ThemeContext'
import { categories } from '../data/mockData'

const Summary = () => {
  const [transactions] = useLocalStorage('transactions', mockTransactions)
  const { isDark } = useTheme()

  // Calcular totales
  const summary = useMemo(() => {
    const totalIngresos = transactions
      .filter(t => t.type === 'ingreso')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalGastos = transactions
      .filter(t => t.type === 'gasto')
      .reduce((sum, t) => sum + t.amount, 0)

    const balance = totalIngresos - totalGastos

    return { totalIngresos, totalGastos, balance }
  }, [transactions])

  // Datos para gráfico circular (gastos por categoría)
  const gastosPorCategoria = useMemo(() => {
    const gastos = transactions.filter(t => t.type === 'gasto')
    const categoriasMap = {}

    gastos.forEach(trans => {
      const categoria = categories.find(c => c.value === trans.category)
      const label = categoria ? categoria.label : trans.category
      
      if (categoriasMap[label]) {
        categoriasMap[label] += trans.amount
      } else {
        categoriasMap[label] = trans.amount
      }
    })

    return Object.entries(categoriasMap).map(([name, value]) => ({
      name,
      value: Math.round(value)
    }))
  }, [transactions])

  // Datos para gráfico de barras (evolución mensual)
  const evolucionMensual = useMemo(() => {
    const meses = {}
    
    transactions.forEach(trans => {
      const fecha = new Date(trans.date)
      const mesAnio = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`
      const nombreMes = fecha.toLocaleDateString('es-AR', { month: 'short', year: 'numeric' })
      
      if (!meses[mesAnio]) {
        meses[mesAnio] = {
          mes: nombreMes,
          ingresos: 0,
          gastos: 0,
          balance: 0
        }
      }
      
      if (trans.type === 'ingreso') {
        meses[mesAnio].ingresos += trans.amount
      } else {
        meses[mesAnio].gastos += trans.amount
      }
      
      meses[mesAnio].balance = meses[mesAnio].ingresos - meses[mesAnio].gastos
    })

    return Object.values(meses).sort((a, b) => a.mes.localeCompare(b.mes))
  }, [transactions])

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#ff7c7c']

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0
    }).format(amount)
  }

  return (
    <div className="w-full space-y-10 sm:space-y-12 pb-24 animate-fade-in">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          Resumen Financiero
        </h2>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="group relative bg-gradient-to-br from-green-500 via-green-600 to-emerald-600 p-8 sm:p-10 lg:p-12 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden animate-scale-in">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-between mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Ingresos</h3>
          </div>
          <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            {formatCurrency(summary.totalIngresos)}
          </p>
        </div>

        <div className="group relative bg-gradient-to-br from-red-500 via-red-600 to-rose-600 p-8 sm:p-10 lg:p-12 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden animate-scale-in" style={{ animationDelay: '100ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-between mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Gastos</h3>
          </div>
          <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            {formatCurrency(summary.totalGastos)}
          </p>
        </div>

        <div className={`group relative p-8 sm:p-10 lg:p-12 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden animate-scale-in ${
          summary.balance >= 0
            ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600'
            : 'bg-gradient-to-br from-orange-500 via-orange-600 to-red-600'
        }`} style={{ animationDelay: '200ms' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative flex items-center justify-between mb-4">
            <h3 className="text-xl sm:text-2xl font-bold text-white">Balance</h3>
          </div>
          <p className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
            {formatCurrency(summary.balance)}
          </p>
          {summary.balance < 0 && (
            <p className="text-sm text-white/90 mt-3 font-semibold">
              Balance negativo
            </p>
          )}
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Gráfico circular - Gastos por categoría */}
        <div className={`p-8 sm:p-10 lg:p-12 rounded-2xl backdrop-blur-sm shadow-xl animate-scale-in ${
          isDark 
            ? 'bg-gray-800/70 border border-gray-700/50' 
            : 'bg-white/80 border border-gray-200/50'
        }`}>
          <h3 className="text-xl sm:text-2xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Gastos por Categoría
          </h3>
          {gastosPorCategoria.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gastosPorCategoria}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={800}
                >
                  {gastosPorCategoria.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#fff',
                    border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-500 dark:text-gray-400 font-semibold">No hay gastos registrados</p>
            </div>
          )}
        </div>

        {/* Gráfico de barras - Evolución mensual */}
        <div className={`p-8 sm:p-10 lg:p-12 rounded-2xl backdrop-blur-sm shadow-xl animate-scale-in ${
          isDark 
            ? 'bg-gray-800/70 border border-gray-700/50' 
            : 'bg-white/80 border border-gray-200/50'
        }`} style={{ animationDelay: '100ms' }}>
          <h3 className="text-xl sm:text-2xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Evolución Mensual
          </h3>
          {evolucionMensual.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={evolucionMensual}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} opacity={0.3} />
                <XAxis 
                  dataKey="mes" 
                  tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                  stroke={isDark ? '#4b5563' : '#d1d5db'}
                />
                <YAxis 
                  tick={{ fill: isDark ? '#9ca3af' : '#6b7280', fontSize: 12 }}
                  stroke={isDark ? '#4b5563' : '#d1d5db'}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#fff',
                    border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                    borderRadius: '12px',
                    padding: '12px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                />
                <Legend 
                  wrapperStyle={{ color: isDark ? '#fff' : '#000', fontSize: '14px' }}
                />
                <Bar dataKey="ingresos" fill="#10b981" name="Ingresos" radius={[8, 8, 0, 0]} animationDuration={800} />
                <Bar dataKey="gastos" fill="#ef4444" name="Gastos" radius={[8, 8, 0, 0]} animationDuration={800} />
                <Bar dataKey="balance" fill="#3b82f6" name="Balance" radius={[8, 8, 0, 0]} animationDuration={800} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-16">
              <p className="text-lg text-gray-500 dark:text-gray-400 font-semibold">No hay datos para mostrar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Summary

