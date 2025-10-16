import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Navigation = () => {
  const location = useLocation()
  const { isDark } = useTheme()

  const navItems = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/nuevo', label: 'Nuevo', icon: '➕' },
    { path: '/resumen', label: 'Resumen', icon: '📊' },
    { path: '/ajustes', label: 'Ajustes', icon: '⚙️' }
  ]

  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${isDark ? 'bg-gray-800' : 'bg-white'} border-t border-gray-200`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? isDark
                    ? 'bg-blue-600 text-white'
                    : 'bg-blue-100 text-blue-600'
                  : isDark
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
