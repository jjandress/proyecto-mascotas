import { NavLink, Outlet } from "react-router-dom";

function MascotasPage() {
    return (
        <section className="container py-4">
            <h2 className="mb-3">Página mascotas</h2>

            <div className="d-flex gap-3 mb-4">
                <NavLink to="formulario" className={({ isActive }) => isActive ? "fw-bold" : ""}>
                    Formulario
                </NavLink>
                <NavLink to="listado" className={({ isActive }) => isActive ? "fw-bold" : ""}>
                    Listado
                </NavLink>
            </div>

            <Outlet />
        </section>
    );
}

export default MascotasPage;