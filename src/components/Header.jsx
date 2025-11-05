import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className={`shadow-lg sticky top-0 z-50 backdrop-blur-sm ${
      isDark 
        ? 'bg-gray-800/95 border-b border-gray-700' 
        : 'bg-white/95 border-b border-gray-200'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center max-w-7xl">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">💰</span>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mi Presupuesto
          </h1>
        </div>
        <button
          onClick={toggleTheme}
          className={`px-5 py-2.5 rounded-xl font-medium transition-all transform hover:scale-110 shadow-md ${
            isDark 
              ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 hover:from-yellow-500 hover:to-yellow-600' 
              : 'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black'
          }`}
          title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default Header