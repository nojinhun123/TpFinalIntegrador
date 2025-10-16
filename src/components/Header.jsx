import { useTheme } from '../context/ThemeContext'

const Header = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <header className={`border-b transition-colors duration-300 ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Mi Presupuesto</h1>
        <button
          onClick={toggleTheme}
          className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
            isDark 
              ? 'bg-gray-700 hover:bg-gray-600 text-white' 
              : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
          }`}
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default Header
