import { Routes, Route, NavLink } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import MascotasPage from './pages/MascotasPage'
import MasctotasForm from './components/MascotasForm'
import MascotasList from './components/MascotasList'


function App() {
  return (
    <>
      <header>
        <Navbar />
      </header>

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Mascotas" element={<MascotasPage />}>
            <Route path="formulario" element={<MasctotasForm />} />
            <Route path="listado" element={<MascotasList />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
