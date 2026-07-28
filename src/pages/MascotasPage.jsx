import { NavLink, Outlet } from "react-router-dom";

function MascotasPage() {
    const linkClase = ({ isActive }) =>
        `nav-link ${isActive ? "active fw-bold" : ""}`;

    return (
        <section className="container py-4">
            <h2 className="mb-3">Página mascotas</h2>

            <ul className="nav mb-4">
                <li className="nav-item">
                    <NavLink to="formulario" className={linkClase}>
                        Formulario
                    </NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="listado" className={linkClase}>
                        Listado
                    </NavLink>
                </li>
            </ul>

            <Outlet />
        </section>
    );
}

export default MascotasPage;