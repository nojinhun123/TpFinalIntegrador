import { useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useTheme } from '../context/ThemeContext'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const Summary = () => {
  const [transactions] = useLocalStorage('transactions', [])
  const { isDark } = useTheme()

  const summary = useMemo(() => {
    const totalIngresos = transactions
      .filter(t => t.type === 'ingreso')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalGastos = transactions
      .filter(t => t.type === 'gasto')
      .reduce((sum, t) => sum + t.amount, 0)

    const balance = totalIngresos - totalGastos

    const gastosPorCategoria = transactions
      .filter(t => t.type === 'gasto')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount
        return acc
      }, {})

    const gastosData = Object.entries(gastosPorCategoria).map(([category, amount]) => ({
      name: category,
      value: amount
    }))

    const evolucionMensual = transactions.reduce((acc, t) => {
      const month = new Date(t.date).toLocaleDateString('es-AR', { month: 'short', year: 'numeric' })
      if (!acc[month]) {
        acc[month] = { ingresos: 0, gastos: 0 }
      }
      if (t.type === 'ingreso') {
        acc[month].ingresos += t.amount
      } else {
        acc[month].gastos += t.amount
      }
      return acc
    }, {})

    const evolucionData = Object.entries(evolucionMensual).map(([month, data]) => ({
      mes: month,
      ingresos: data.ingresos,
      gastos: data.gastos,
      balance: data.ingresos - data.gastos
    }))

    return {
      totalIngresos,
      totalGastos,
      balance,
      gastosData,
      evolucionData
    }
  }, [transactions])

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(amount)
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C']

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📊</div>
        <h3 className="text-xl font-semibold mb-2">No hay datos para mostrar</h3>
        <p className="text-gray-600">Agrega algunos movimientos para ver el resumen</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Resumen Financiero</h2>
        <p className="text-gray-600">Análisis de tus ingresos y gastos</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="text-center">
            <div className="text-3xl mb-2">💰</div>
            <h3 className="text-lg font-semibold mb-2">Total Ingresos</h3>
            <p className="text-2xl font-bold text-green-600">{formatAmount(summary.totalIngresos)}</p>
          </div>
        </div>

        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="text-center">
            <div className="text-3xl mb-2">💸</div>
            <h3 className="text-lg font-semibold mb-2">Total Gastos</h3>
            <p className="text-2xl font-bold text-red-600">{formatAmount(summary.totalGastos)}</p>
          </div>
        </div>

        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="text-center">
            <div className="text-3xl mb-2">⚖️</div>
            <h3 className="text-lg font-semibold mb-2">Balance</h3>
            <p className={`text-2xl font-bold ${summary.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatAmount(summary.balance)}
            </p>
          </div>
        </div>
      </div>

      {summary.gastosData.length > 0 && (
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-xl font-semibold mb-4">Distribución de Gastos por Categoría</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={summary.gastosData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${getCategoryLabel(name)} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {summary.gastosData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatAmount(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {summary.evolucionData.length > 0 && (
        <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className="text-xl font-semibold mb-4">Evolución Mensual</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={summary.evolucionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip formatter={(value) => formatAmount(value)} />
                <Bar dataKey="ingresos" fill="#00C49F" name="Ingresos" />
                <Bar dataKey="gastos" fill="#FF8042" name="Gastos" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  )
}

export default Summary
