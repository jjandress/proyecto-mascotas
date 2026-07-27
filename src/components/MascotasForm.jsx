import { useEffect, useState } from "react";
import apiMascotas from "../api/apiMascotas";
import { useNavigate } from "react-router-dom";

function MascotasForm() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [tipoAnimal, setTipoAnimal] = useState('');
    const [estado, setEstado] = useState('');
    const [imagen, setImagen] = useState('');
    const [tamano, setTamano] = useState('desconocido');
    const [edad, setEdad] = useState('');
    const [raza, setRaza] = useState('');
    const [sexo, setSexo] = useState('desconocido');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [estadoChoices, setEstadoChoices] = useState([]);
    const [tipoAnimalChoices, setTipoAnimalChoices] = useState([]);
    const [tamanoChoices, setTamanoChoices] = useState([]);
    const [sexoChoices, setSexoChoices] = useState([]);

    useEffect(() => {
        const fetchChoices = async () => {
            try {
                const response = await apiMascotas.get('choices/');
                if (response.status === 200) {
                    setEstadoChoices(response.data.estado);
                    console.log(response.data.estado);
                }
            } catch (error) {
                console.error("Error fetching choices:", error);
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
                console.error("Error fetching tipo animal choices:", error);
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
                console.error("Error fetching tamano choices:", error);
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
                console.error("Error fetching sexo choices:", error);
            }
        };
        {/**PROMISEALL por si quieren investigar */ }
        Promise.all([
            fetchChoices(),
            fetchTipoAnimalChoices(),
            fetchTamanoChoices(),
            fetchSexoChoices()

        ]);
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario, por ejemplo, enviar los datos a un servidor o actualizar el estado de la aplicación.
        console.log("Formulario enviado");

        // Validaciones
        const mostrarError = (mensaje) => {
            setError(mensaje);

            setTimeout(() => {
                setError("");
            }, 3000);
        };

        // Validaciones
        if (nombre.trim() === "") {
            mostrarError("Escriba el nombre de su mascota")
            return;
        }

        if (nombre.length > 100) {
            mostrarError("El nombre de la mascota no puede superar los 100 caracteres.");
            return;
        }

        const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
        if (!regexNombre.test(nombre)) {
            mostrarError("El nombre solo puede contener letras y espacios.");
            return;
        }

        if (descripcion.trim() === "") {
            mostrarError("Describa a su mascota.")
            return;
        }

        if (raza.length > 100) {
            mostrarError("La raza de la mascota no puede superar los 100 caracteres.");
            return;
        }

        const edadNum = Number(edad);

        if (!Number.isInteger(edadNum)) {
            mostrarError("Digite la edad sin decimales.")
            return;
        }

        if (edadNum < 0) {
            mostrarError("Digite una edad real.");
            return;
        }

        // Crear FormData para enviar la imagen y los demás datos
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('descripcion', descripcion);
        formData.append('tipo_animal', tipoAnimal);
        formData.append('estado', estado);
        formData.append('imagen', imagen);
        formData.append('tamano', tamano);
        formData.append('edad', edad);
        formData.append('raza', raza);
        formData.append('sexo', sexo);

        setLoading(true);

        try {
            const response = await apiMascotas.post('/mascotas/', formData);
            console.log(response);
            if (response.status === 201) {
                alert("Mascota creada exitosamente");
            }
            navigate('/mascotas/listado'); // Redirige a la página de listado después de enviar el formulario
        } catch (error) {
            console.log(error.response)
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
            <form onSubmit={e => handleSubmit(e)} encType="multipart/form-data" className="card p-4 shadow-sm">
                <h3 className="text-center mb-4">Registrar Mascota</h3>

                <input type="text" className="form-control mb-3" placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
                <input type="text" className="form-control mb-3" placeholder="Descripción" onChange={e => setDescripcion(e.target.value)} />
                <input type="text" className="form-control mb-3" placeholder="Raza" onChange={e => setRaza(e.target.value)} />
                <input type="number" className="form-control mb-3" placeholder="Edad" onChange={e => setEdad(e.target.value)} />

                <select className="form-select mb-3" onChange={e => setEstado(e.target.value)}>
                    {estadoChoices.map(choice => <option key={choice.value} value={choice.value}>{choice.label}</option>)}
                </select>

                <select className="form-select mb-3" onChange={e => setTipoAnimal(e.target.value)}>
                    {tipoAnimalChoices.map(choice => <option key={choice.value} value={choice.value}>{choice.label}</option>)}
                </select>

                <select className="form-select mb-3" onChange={e => setTamano(e.target.value)}>
                    {tamanoChoices.map(choice => <option key={choice.value} value={choice.value}>{choice.label}</option>)}
                </select>

                <select className="form-select mb-3" onChange={e => setSexo(e.target.value)}>
                    {sexoChoices.map(choice => <option key={choice.value} value={choice.value}>{choice.label}</option>)}
                </select>

                <input type="file" className="form-control mb-4" onChange={e => setImagen(e.target.files[0])} />

                <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading?(
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Guardando...
                        </>
                    ):(
                        <>Guardar</>
                    )}
                </button>
                <p> {error} </p>
            </form>
        </div>
    );
}

export default MascotasForm;