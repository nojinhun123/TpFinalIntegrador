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
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⏳</div>
        <h3 className="text-xl font-semibold mb-2">Cargando...</h3>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Editar Movimiento</h2>
        <p className="text-gray-600">Modifica los datos del movimiento</p>
      </div>

      <div className={`p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
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
                <label className="block text-sm font-medium mb-2">Descripción</label>
                <Field
                  name="description"
                  type="text"
                  placeholder="Ej: Compra en supermercado"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tipo</label>
                <Field
                  name="type"
                  as="select"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="gasto">Gasto</option>
                  <option value="ingreso">Ingreso</option>
                </Field>
                <ErrorMessage name="type" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Categoría</label>
                <Field
                  name="category"
                  as="select"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="">Selecciona una categoría</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Monto</label>
                <Field
                  name="amount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                />
                <ErrorMessage name="amount" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Fecha</label>
                <Field
                  name="date"
                  type="date"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300'
                  }`}
                />
                <ErrorMessage name="date" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {isSubmitting ? 'Guardando...' : 'Actualizar Movimiento'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
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
