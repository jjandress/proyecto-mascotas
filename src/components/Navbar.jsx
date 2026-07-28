import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav className="navbar bg-light border-bottom shadow-sm">
            <div className="container d-flex gap-3">
                <span className="navbar-brand mb-0">🐾 Mascotas App</span>
                <NavLink to="/" end className={({ isActive }) => isActive ? "fw-bold" : ""}>
                    Home
                </NavLink>
                <NavLink to="/mascotas" className={({ isActive }) => isActive ? "fw-bold" : ""}>
                    Mascotas
                </NavLink>
            </div>
        </nav>
    )
}

export default Navbar;