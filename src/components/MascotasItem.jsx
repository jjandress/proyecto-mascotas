import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MascotasItem({listado, listaCom, deleteMascotas, agregarComentario, deleteComentario}) {
    const [detalleId, setDetalleId] = useState(null);
    const navigate = useNavigate();

    const [autor, setAutor] = useState("");
    const [contenido, setContenido] = useState("");

    
return (
        <>
            {listado.map((mascota) => (
                <div key={mascota.id}>
                    <img src={mascota.imagen} alt={mascota.nombre} />
                    <h4>{mascota.nombre}</h4>
                    <p>{mascota.descripcion}</p>
                    <p>{mascota.tipo_animal}</p>
                    <p>{mascota.estado}</p>

                    <button onClick={() => setDetalleId(mascota.id)}>
                        Ver detalles
                    </button>

                    <button onClick={() => navigate(`/mascotas/editar/${mascota.id}`)}>
                        Editar
                    </button>
                    <button onClick={() => deleteMascotas(mascota.id)}>
                        Eliminar
                    </button>

                    {detalleId === mascota.id && (
                        <div>
                            <p>Edad:{mascota.edad}</p>
                            <p>Raza:{mascota.raza}</p>
                            <p>Sexo:{mascota.sexo}</p>
                            <p>Tamaño:{mascota.tamano}</p>

                            <h5>Comentarios:</h5>
                            {listaCom
                                .filter(comentario => comentario.mascota === mascota.id)
                                .map(comentario => (
                                    <div key={comentario.id}>
                                        <p>
                                            <strong>{comentario.autor}:</strong> {comentario.contenido}
                                        </p>
                                        <button onClick={() => deleteComentario(comentario.id)}>
                                            Eliminar comentario
                                        </button>
                                    </div>
                                ))
                            }

                            <h5>Agregar comentario</h5>

                            <input
                                type="text"
                                placeholder="Autor"
                                value={autor}
                                onChange={(e) => setAutor(e.target.value)}
                            />

                            <input
                                type="text"
                                placeholder="Comentario"
                                value={contenido}
                                onChange={(e) => setContenido(e.target.value)}
                            />

                            <button
                                onClick={() => {
                                    if (!autor.trim() || !contenido.trim()) {
                                        alert("Completa autor y comentario");
                                        return;
                                    }
                                    agregarComentario(mascota.id, autor, contenido);
                                    setAutor("");
                                    setContenido("");
                                }}
                            >
                                Comentar
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export default MascotasItem;