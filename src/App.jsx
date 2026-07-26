import { Routes, Route, NavLink } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import MascotasPage from './pages/MascotasPage'
import MascotasForm from './components/MascotasForm'
import MascotasList from './components/MascotasList'
import MascotasEdit from './components/MascotasEdit'


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
            <Route path="formulario" element={<MascotasForm />} />
            <Route path="listado" element={<MascotasList />} />
            <Route path="editar/:id" element={<MascotasEdit />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}

export default App
