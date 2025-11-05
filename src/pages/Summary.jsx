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
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Resumen Financiero
        </h2>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white">Ingresos</h3>
            <span className="text-2xl">💰</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {formatCurrency(summary.totalIngresos)}
          </p>
        </div>

        <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white">Gastos</h3>
            <span className="text-2xl">💸</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {formatCurrency(summary.totalGastos)}
          </p>
        </div>

        <div className={`p-6 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-200 ${
          summary.balance >= 0
            ? 'bg-gradient-to-br from-blue-500 to-blue-600'
            : 'bg-gradient-to-br from-orange-500 to-orange-600'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white">Balance</h3>
            <span className="text-2xl">{summary.balance >= 0 ? '📈' : '📉'}</span>
          </div>
          <p className="text-3xl font-bold text-white">
            {formatCurrency(summary.balance)}
          </p>
          {summary.balance < 0 && (
            <p className="text-sm text-white/90 mt-1">⚠️ Balance negativo</p>
          )}
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico circular - Gastos por categoría */}
        <div className={`p-6 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-xl font-bold mb-4 text-center">Gastos por Categoría</h3>
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
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No hay gastos registrados</p>
            </div>
          )}
        </div>

        {/* Gráfico de barras - Evolución mensual */}
        <div className={`p-6 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-xl font-bold mb-4 text-center">Evolución Mensual</h3>
          {evolucionMensual.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={evolucionMensual}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                <XAxis 
                  dataKey="mes" 
                  tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
                  stroke={isDark ? '#4b5563' : '#d1d5db'}
                />
                <YAxis 
                  tick={{ fill: isDark ? '#9ca3af' : '#6b7280' }}
                  stroke={isDark ? '#4b5563' : '#d1d5db'}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip 
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: isDark ? '#1f2937' : '#fff',
                    border: isDark ? '1px solid #374151' : '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }}
                />
                <Legend 
                  wrapperStyle={{ color: isDark ? '#fff' : '#000' }}
                />
                <Bar dataKey="ingresos" fill="#10b981" name="Ingresos" radius={[8, 8, 0, 0]} />
                <Bar dataKey="gastos" fill="#ef4444" name="Gastos" radius={[8, 8, 0, 0]} />
                <Bar dataKey="balance" fill="#3b82f6" name="Balance" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">No hay datos para mostrar</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Summary

