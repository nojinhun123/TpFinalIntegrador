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
    <nav className={`fixed bottom-0 left-0 right-0 z-50 backdrop-blur-md ${
      isDark 
        ? 'bg-gray-800/95 border-t border-gray-700' 
        : 'bg-white/95 border-t border-gray-200'
    } shadow-2xl`}>
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-around py-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all duration-200 transform hover:scale-110 ${
                location.pathname === item.path
                  ? isDark
                    ? 'bg-gradient-to-b from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-lg'
                  : isDark
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <span className="text-xl mb-1">{item.icon}</span>
              <span className="text-xs font-semibold">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
