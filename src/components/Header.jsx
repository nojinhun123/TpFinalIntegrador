import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
      isDark 
        ? 'bg-gray-900/80 border-b border-gray-800/50 shadow-xl shadow-black/20' 
        : 'bg-white/80 border-b border-gray-200/50 shadow-lg shadow-gray-200/20'
    }`}>
      <div className="w-full px-6 sm:px-8 lg:px-12 py-5 sm:py-6 flex justify-between items-center">
        <div className="flex items-center space-x-3 group cursor-pointer">
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient">
            Mi Presupuesto
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className={`relative px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg ${
            isDark 
              ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-gray-900 hover:from-yellow-500 hover:via-yellow-600 hover:to-yellow-700 shadow-yellow-500/30' 
              : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 shadow-purple-500/30'
          }`}
          title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          <span className="text-xl transition-transform duration-300 inline-block">
            {isDark ? '☀' : '🌙'}
          </span>
          <span className="absolute inset-0 rounded-xl bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
    </header>
  )
}

export default Header