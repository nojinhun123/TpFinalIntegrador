import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { categories } from '../data/mockData'
import { useTheme } from '../context/ThemeContext'

const EditTransaction = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [transactions, setTransactions] = useLocalStorage('transactions', [])
  const [transaction, setTransaction] = useState(null)
  const { isDark } = useTheme()

  useEffect(() => {
    const foundTransaction = transactions.find(t => t.id === id)
    if (foundTransaction) {
      setTransaction(foundTransaction)
    } else {
      navigate('/')
    }
  }, [id, transactions, navigate])

  const validationSchema = Yup.object({
    description: Yup.string()
      .min(3, 'La descripción debe tener al menos 3 caracteres')
      .required('La descripción es requerida'),
    category: Yup.string()
      .required('La categoría es requerida'),
    type: Yup.string()
      .oneOf(['ingreso', 'gasto'], 'Tipo inválido')
      .required('El tipo es requerido'),
    amount: Yup.number()
      .positive('El monto debe ser positivo')
      .required('El monto es requerido'),
    date: Yup.date()
      .max(new Date(), 'La fecha no puede ser futura')
      .required('La fecha es requerida')
  })

  const handleSubmit = (values, { setSubmitting }) => {
    const updatedTransactions = transactions.map(t => 
      t.id === id ? { ...t, ...values, amount: parseFloat(values.amount) } : t
    )
    
    setTransactions(updatedTransactions)
    setSubmitting(false)
    navigate('/')
  }

  if (!transaction) {
    return (
      <div className={`text-center py-16 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
        <div className="text-7xl mb-6 animate-spin">⏳</div>
        <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Cargando...</h3>
        <p className="text-gray-600 dark:text-gray-400">Espera un momento</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Editar Movimiento
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">Modifica los datos del movimiento seleccionado</p>
      </div>

      <div className={`p-8 rounded-xl shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
        <Formik
          initialValues={{
            description: transaction.description,
            category: transaction.category,
            type: transaction.type,
            amount: transaction.amount.toString(),
            date: transaction.date
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  📝 Descripción
                </label>
                <Field
                  name="description"
                  type="text"
                  placeholder="Ej: Compra en supermercado"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <ErrorMessage name="description" component="div" className="text-red-500 dark:text-red-400 text-sm mt-2 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  📊 Tipo
                </label>
                <Field
                  name="type"
                  as="select"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="gasto">💸 Gasto</option>
                  <option value="ingreso">💰 Ingreso</option>
                </Field>
                <ErrorMessage name="type" component="div" className="text-red-500 dark:text-red-400 text-sm mt-2 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  🏷️ Categoría
                </label>
                <Field
                  name="category"
                  as="select"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 dark:text-red-400 text-sm mt-2 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  💵 Monto
                </label>
                <Field
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
                <ErrorMessage name="amount" component="div" className="text-red-500 dark:text-red-400 text-sm mt-2 font-medium" />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  📅 Fecha
                </label>
                <Field
                  name="date"
                  type="date"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                />
                <ErrorMessage name="date" component="div" className="text-red-500 dark:text-red-400 text-sm mt-2 font-medium" />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all transform hover:scale-105 shadow-lg font-semibold"
                >
                  {isSubmitting ? '⏳ Guardando...' : '✅ Actualizar Movimiento'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-xl hover:bg-gray-600 transition-all transform hover:scale-105 shadow-lg font-semibold"
                >
                  ❌ Cancelar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default EditTransaction
