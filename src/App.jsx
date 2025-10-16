import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import NewTransaction from './pages/NewTransaction'
import EditTransaction from './pages/EditTransaction'
import Summary from './pages/Summary'
import Settings from './pages/Settings'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nuevo" element={<NewTransaction />} />
            <Route path="/editar/:id" element={<EditTransaction />} />
            <Route path="/resumen" element={<Summary />} />
            <Route path="/ajustes" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App
