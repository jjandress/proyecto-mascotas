import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiMascotas from "../api/apiMascotas";

function MascotasEdit() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [mascota, setMascota] = useState({});
    const [estadoChoices, setEstadoChoices] = useState([]);
    const [tipoAnimalChoices, setTipoAnimalChoices] = useState([]);
    const [tamanoChoices, setTamanoChoices] = useState([]);
    const [sexoChoices, setSexoChoices] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchMascota = async () => {
            try {
                const response = await apiMascotas.get(`mascotas/${id}/`);
                if (response.status === 200) {
                    setMascota(response.data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchChoices = async () => {
            try {
                const response = await apiMascotas.get('choices/');
                if (response.status === 200) {
                    setEstadoChoices(response.data.estado);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchTipoAnimalChoices = async () => {
            try {
                const response = await apiMascotas.get('choices/');
                if (response.status === 200) {
                    setTipoAnimalChoices(response.data.tipo_animal);
                    console.log(response.data.tipo_animal);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchTamanoChoices = async () => {
            try {
                const response = await apiMascotas.get('choices/');
                if (response.status === 200) {
                    setTamanoChoices(response.data.tamano);
                    console.log(response.data.tamano);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const fetchSexoChoices = async () => {
            try {
                const response = await apiMascotas.get('choices/');
                if (response.status === 200) {
                    setSexoChoices(response.data.sexo);
                    console.log(response.data.sexo);
                }
            } catch (error) {
                console.log(error);
            }
        };

        Promise.all([
            fetchMascota(),
            fetchChoices(),
            fetchTipoAnimalChoices(),
            fetchTamanoChoices(),
            fetchSexoChoices()
        ]);
    }, [id]);

    const handleChange = (e) => {
        setMascota({
            ...mascota,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const mostrarError = (mensaje) => {
            setError(mensaje);

            setTimeout(() => {
                setError("");
            }, 3000);
        };

        // Validaciones
        if (!mascota.nombre || mascota.nombre.trim() === "") {
            mostrarError("Escriba el nombre de su mascota")
            return;
        }

        if (mascota.nombre.length > 100) {
            mostrarError("El nombre de la mascota no puede superar los 100 caracteres.");
            return;
        }

        const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        if (!regexNombre.test(mascota.nombre)) {
            mostrarError("El nombre solo puede contener letras y espacios.");
            return;
        }

        if (!mascota.descripcion || mascota.descripcion.trim() === "") {
            mostrarError("Describa a su mascota.")
            return;
        }

        if (mascota.raza && mascota.raza.length > 100) {
            mostrarError("La raza de la mascota no puede superar los 100 caracteres.");
            return;
        }

        const edadNum = Number(mascota.edad);

        if (!Number.isInteger(edadNum)) {
            mostrarError("Digite la edad sin decimales.")
            return;
        }

        if (edadNum < 0) {
            mostrarError("Digite una edad real.");
            return;
        }        

        const datos = {
            nombre: mascota.nombre,
            descripcion: mascota.descripcion,
            raza: mascota.raza,
            edad: mascota.edad,
            estado: mascota.estado,
            tipo_animal: mascota.tipo_animal,
            tamano: mascota.tamano,
            sexo: mascota.sexo
        }

        setLoading(true);

        try {
            const response =  await apiMascotas.patch(`mascotas/${id}/`, datos);
            console.log(response);
            if (response.status === 200) {
                alert("Mascota actualizada");
            }
            navigate("/mascotas/listado");

        } catch (error) {
            console.log(error.response.data);
            const status = error.response?.status;
            const data = error.response?.data;
            switch (status) {
                case 400:
                    if (data?.nombre || data?.descripcion || data?.imagen) {
                        setError("Debes completar nombre, descripción e imagen.");
                    } else {
                        setError("Error en los datos enviados.");
                    }
                    break;
                case 404:
                    setError("Recurso no encontrado.");
                    break;
                default:
                setError("Error al guardar la mascota.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-4" style={{ maxWidth: "600px" }}>
            <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
                <h3 className="text-center mb-4">
                    Editar Mascota
                </h3>
                <input className="form-control mb-3" type="text" name="nombre" placeholder="Nombre" value={mascota.nombre || ""} onChange={handleChange} />
                <input className="form-control mb-3" type="text" name="descripcion" placeholder="Descripción" value={mascota.descripcion || ""} onChange={handleChange} />
                <input className="form-control mb-3" type="text" name="raza" placeholder="Raza" value={mascota.raza || ""} onChange={handleChange} />
                <input className="form-control mb-3" type="number" name="edad" placeholder="Edad" value={mascota.edad || ""} onChange={handleChange} />
                <select className="form-select mb-3" name="estado" value={mascota.estado || ""} onChange={handleChange}>
                    {estadoChoices.map((choice) => (
                        <option key={choice.value} value={choice.value}>
                            {choice.label}
                        </option>
                    ))}
                </select>
                <select className="form-select mb-3" name="tipo_animal" value={mascota.tipo_animal || ""} onChange={handleChange}>
                    {tipoAnimalChoices.map((choice) => (
                        <option key={choice.value} value={choice.value}>
                            {choice.label}
                        </option>
                    ))}
                </select>
                <select className="form-select mb-3" name="tamano" value={mascota.tamano || ""} onChange={handleChange}>
                    {tamanoChoices.map((choice) => (
                        <option key={choice.value} value={choice.value}>
                            {choice.label}
                        </option>
                    ))}
                </select>
                <select className="form-select mb-4" name="sexo" value={mascota.sexo || ""} onChange={handleChange}>
                    {sexoChoices.map((choice) => (
                        <option key={choice.value} value={choice.value}>
                            {choice.label}
                        </option>
                    ))}
                </select>

                <button type="submit" className="btn btn-warning w-100" disabled={loading}>
                    {loading?(
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Actualizando...
                        </>
                    ):(
                        <>Actualizar</>
                    )}
                </button>
                <p> {error} </p>
            </form>
        </div>
    )
}


export default MascotasEdit;