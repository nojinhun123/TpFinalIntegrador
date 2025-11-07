import { useTheme } from '../context/ThemeContext'
import Header from './Header'
import Navigation from './Navigation'

const Layout = ({ children }) => {
  const { isDark } = useTheme()

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDark 
        ? 'bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-gray-900'
    }`}>
      {/* Animated background pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'opacity-10' 
            : 'opacity-5'
        }`}>
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>
      
      <Header />
      <main className="w-full px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 animate-fade-in">
        {children}
      </main>
      <Navigation />
    </div>
  )
}

export default Layout
