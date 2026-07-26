import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <nav>
            <NavLink to="/">Home</NavLink> |
            <NavLink to="/Mascotas">Mascotas</NavLink>
        </nav>
    )
}

export default Navbar;