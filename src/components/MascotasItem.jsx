import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MascotasItem({listado, listaCom}) {
    const [detalleId, setDetalleId] = useState(null);
    const navigate = useNavigate();

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

                    {detalleId === mascota.id && (
                        <div>
                            <p>Edad:{mascota.edad}</p>
                            <p>Raza:{mascota.raza}</p>
                            <p>Sexo:{mascota.sexo}</p>
                            <p>Tamaño:{mascota.tamano}</p>

                            <h5>Comentarios:</h5>
                            {listaCom.filter(comentario => comentario.mascota === mascota.id).map(comentario => (
                                    <p key={comentario.id}>{comentario.contenido}</p>
                                ))
                            }
                        </div>
                    )}
                </div>
            ))}
        </>
    );
}

export default MascotasItem;