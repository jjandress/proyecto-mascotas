import { useEffect, useState } from "react";
import MascotasItem from "./MascotasItem";
import apiMascotas from "../api/apiMascotas";

function MascotasList() {
    const [listadoMascotas, setListadoMascotas] = useState([]);
    const [listadoComentarios, setListadoComentarios] = useState([]);

    const manejarErrorApi = (error, contexto = "") => {
        if (!error.response) {
            alert("No se pudo conectar con el servidor.");
            return;
        }

        const { status, data } = error.response;
        console.log(status, data);

        switch (status) {
            case 400:
                if (data.detail) {
                    alert(data.detail);
                    break;
                }
                let mensaje = "";
                for (const campo in data) {
                    mensaje += `${campo}: ${data[campo]}\n`;
                }
                alert(mensaje);
                break;
            case 404:
                alert(data.detail || "El recurso solicitado no existe.");
                break;
            case 405:
                alert(data.detail || "Método no permitido en esta ruta.");
                break;
            case 415:
                alert(data.detail || "Tipo de contenido no soportado.");
                break;
            default:
                alert(`Ocurrió un error inesperado${contexto ? " al " + contexto : ""}.`);
        }
    };

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
            manejarErrorApi(error, "eliminar la mascota");
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
            manejarErrorApi(error, "agregar el comentario");
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
            manejarErrorApi(error, "eliminar el comentario");
        }
    };

    useEffect(() => {
        const fetchMascotas = async () => {
            try {
                const response = await apiMascotas.get("mascotas/");
                if (response.status === 200) {
                    setListadoMascotas(response.data);
                }
            } catch (error) {
                manejarErrorApi(error, "cargar las mascotas");
            }
        }

        const fetchComentarios = async () => {
            try {
                const response = await apiMascotas.get("comentarios/");
                if (response.status === 200) {
                    setListadoComentarios(response.data);
                }
            } catch (error) {
                manejarErrorApi(error, "cargar luogiguos comentarios");
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