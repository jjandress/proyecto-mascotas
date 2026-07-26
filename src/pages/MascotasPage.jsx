import { Link, Outlet } from "react-router-dom";

function MascotasPage() {
    return (
        <section>
            <h2>Página mascotas</h2>

            <ul>
                <li>
                    <Link to="formulario">Formulario</Link>
                </li>
                <li>
                    <Link to="listado">Listado</Link>
                </li>
            </ul>

            <Outlet /> {/* Renderiza el componente hijo correspondiente a la ruta anidada */}
        </section>
    );
}

export default MascotasPage;