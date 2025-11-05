import { useTheme } from '../context/ThemeContext'
import Header from './Header'
import Navigation from './Navigation'

const Layout = ({ children }) => {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900'
    }`}>
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
      <Navigation />
    </div>
  )
}

export default Layout
