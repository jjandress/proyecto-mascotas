import { NavLink } from 'react-router-dom'

function Navbar() {
    const linkClase = ({ isActive }) =>
        `nav-link ${isActive ? "active fw-bold" : ""}`;

    return (
        <nav className="navbar navbar-expand navbar-light bg-light border-bottom shadow-sm">
            <div className="container">
                <span className="navbar-brand">🐾 Mascotas App</span>
                <ul className="navbar-nav flex-row gap-3">
                    <li className="nav-item">
                        <NavLink to="/" className={linkClase} end>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/mascotas" className={linkClase}>
                            Mascotas
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;