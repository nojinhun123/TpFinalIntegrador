import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const Navigation = () => {
  const location = useLocation()
  const { isDark } = useTheme()

  const navItems = [
    { path: '/', label: 'Inicio' },
    { path: '/nuevo', label: 'Nuevo' },
    { path: '/resumen', label: 'Resumen' },
    { path: '/ajustes', label: 'Ajustes' }
  ]

  return (
    <nav className={`fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900/90 border-t border-gray-800/50 shadow-2xl shadow-black/30' 
        : 'bg-white/90 border-t border-gray-200/50 shadow-2xl shadow-gray-300/30'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around py-6 sm:py-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex flex-col items-center justify-center py-4 px-6 sm:px-8 rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 min-w-[100px] sm:min-w-[120px] ${
                  isActive
                    ? isDark
                      ? 'bg-gradient-to-b from-blue-600 via-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50 scale-105'
                      : 'bg-gradient-to-b from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/50 scale-105'
                    : isDark
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800/60'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/80'
                }`}
              >
                {isActive && (
                  <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${
                    isDark ? 'bg-blue-400' : 'bg-blue-300'
                  } animate-pulse`}></div>
                )}
                <span className={`text-base sm:text-lg font-bold transition-all duration-300 ${
                  isActive ? 'scale-110' : ''
                }`}>
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute inset-0 rounded-2xl bg-white/10 animate-pulse"></div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
