import { useEffect, useState } from "react";
import MascotasItem from "./MascotasItem";
import apiMascotas from "../api/apiMascotas";

function MascotasList() {
    const [listadoMascotas, setListadoMascotas] = useState([]);
    const [listadoComentarios, setListadoComentarios] = useState([]);

    const deleteMascotas = async (id) => {
        const confirmar = window.confirm(
            "¿Estás seguro de que deseas eliminar esta mascota?"
        );

        if (!confirmar) return;

        try {
            const response = await apiMascotas.delete(`mascotas/${id}/`);

            if (response.status === 204) {
                setListadoMascotas((prev) =>
                    prev.filter((mascota) => mascota.id !== id)
                );
                alert("Mascota eliminada correctamente.");
            }
        } catch (error) {
            console.log(error.response);
            alert("Ocurrió un error al eliminar la mascota.");
        }
    };

    const agregarComentario = async (mascota, autor, contenido) => {
        if (!contenido.trim()) {
            alert("El comentario no puede estar vacío");
            return;
        }

        try {
            const response = await apiMascotas.post("comentarios/", {
                mascota,
                autor,
                contenido,
            });

            if (response.status === 201) {
                setListadoComentarios((prev) => [...prev, response.data]);
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    const deleteComentario = async (id) => {
        const confirmar = window.confirm("¿Seguro que deseas eliminar este comentario?");

        if (!confirmar) return;

        try {
            const response = await apiMascotas.delete(`comentarios/${id}/`);

            if (response.status === 204) {
                setListadoComentarios((prev) =>
                    prev.filter((comentario) => comentario.id !== id)
                );
            }
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        const fetchMascotas = async () => {
            // Peticion api hacia mascotas
            try {
                // Peticion GET
                const response = await apiMascotas.get("mascotas/");
                console.log(response);
                if (response.status === 200) {
                    setListadoMascotas(response.data);
                }
            } catch (error) {
                console.log(error.response);
            }
        }

        const fetchComentarios = async () => {
            try {
                const response = await apiMascotas.get("comentarios/");
                console.log(response.data);
                if (response.status === 200) {
                    setListadoComentarios(response.data);
                }
            } catch (error) {
                console.log(error.response);
            }
        }

        fetchMascotas();
        fetchComentarios();
    }, []);

    return (
        <article className="container py-4">
            <h3 className="text-center mb-4">Listado de Mascotas</h3>

            <div className="bg-light border rounded p-3">
                <MascotasItem
                    listado={listadoMascotas}
                    listaCom={listadoComentarios}
                    deleteMascotas={deleteMascotas}
                    agregarComentario={agregarComentario}
                    deleteComentario={deleteComentario}
                />
            </div>
        </article>
    );
}

export default MascotasList;