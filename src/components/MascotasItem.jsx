import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MascotasItem({
    listado,
    listaCom,
    deleteMascotas,
    agregarComentario,
    deleteComentario,
}) {
    const [detalleId, setDetalleId] = useState(null);
    const [autor, setAutor] = useState("");
    const [contenido, setContenido] = useState("");

    const navigate = useNavigate();

    return (
        <>
            {listado.map((mascota) => (
                <div
                    key={mascota.id}
                    className="card shadow-sm mb-4 mx-auto"
                    style={{ maxWidth: "700px" }}
                >
                    <img
                        src={mascota.imagen}
                        alt={mascota.nombre}
                        className="card-img-top"
                        style={{
                            maxHeight: "420px",
                            objectFit: "contain",
                            background: "#f8f9fa"
                        }}
                    />

                    <div className="card-body">
                        <h4 className="card-title">{mascota.nombre}</h4>

                        <p className="card-text mb-1">{mascota.descripcion}</p>
                        <p className="text-muted mb-3">
                            {mascota.tipo_animal} • {mascota.estado}
                        </p>

                        <button
                            className="btn btn-outline-primary btn-sm me-2"
                            onClick={() =>
                                setDetalleId(
                                    detalleId === mascota.id ? null : mascota.id
                                )
                            }
                        >
                            {detalleId === mascota.id
                                ? "Ocultar"
                                : "Ver detalles"}
                        </button>

                        <button
                            className="btn btn-outline-warning btn-sm me-2"
                            onClick={() =>
                                navigate(`/mascotas/editar/${mascota.id}`)
                            }
                        >
                            Editar
                        </button>

                        <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => deleteMascotas(mascota.id)}
                        >
                            Eliminar
                        </button>

                        {detalleId === mascota.id && (
                            <div className="mt-4 border-top pt-3">
                                <p className="mb-1">
                                    <strong>Edad:</strong> {mascota.edad}
                                </p>
                                <p className="mb-1">
                                    <strong>Raza:</strong> {mascota.raza}
                                </p>
                                <p className="mb-1">
                                    <strong>Sexo:</strong> {mascota.sexo}
                                </p>
                                <p className="mb-3">
                                    <strong>Tamaño:</strong> {mascota.tamano}
                                </p>

                                <h6>Comentarios</h6>

                                {listaCom
                                    .filter(
                                        (comentario) =>
                                            comentario.mascota === mascota.id
                                    )
                                    .map((comentario) => (
                                        <div
                                            key={comentario.id}
                                            className="border rounded p-2 mb-2"
                                        >
                                            <p className="mb-2">
                                                <strong>
                                                    {comentario.autor}
                                                </strong>
                                                : {comentario.contenido}
                                            </p>

                                            <button
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() =>
                                                    deleteComentario(
                                                        comentario.id
                                                    )
                                                }
                                            >
                                                Eliminar comentario
                                            </button>
                                        </div>
                                    ))}

                                <h6 className="mt-4">Agregar comentario</h6>

                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Autor"
                                    value={autor}
                                    onChange={(e) =>
                                        setAutor(e.target.value)
                                    }
                                />

                                <input
                                    type="text"
                                    className="form-control mb-3"
                                    placeholder="Comentario"
                                    value={contenido}
                                    onChange={(e) =>
                                        setContenido(e.target.value)
                                    }
                                />

                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                        if (
                                            !autor.trim() ||
                                            !contenido.trim()
                                        ) {
                                            alert(
                                                "Completa autor y comentario"
                                            );
                                            return;
                                        }

                                        agregarComentario(
                                            mascota.id,
                                            autor,
                                            contenido
                                        );

                                        setAutor("");
                                        setContenido("");
                                    }}
                                >
                                    Comentar
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}

export default MascotasItem;