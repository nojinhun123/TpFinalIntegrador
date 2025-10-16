import { useTheme } from '../context/ThemeContext'
import Header from './Header'
import Navigation from './Navigation'

const Layout = ({ children }) => {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header />
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <Navigation />
    </div>
  )
}

export default Layout
