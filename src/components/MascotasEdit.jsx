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

        try {
            const response =  await apiMascotas.patch(`mascotas/${id}/`, datos);
            console.log(response);
            navigate("/mascotas/listado");

        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="nombre" value={mascota.nombre || ""} onChange={handleChange} />
            <input name="descripcion" value={mascota.descripcion || ""} onChange={handleChange} />
            <input name="raza" value={mascota.raza || ""} onChange={handleChange} />
            <input name="edad" value={mascota.edad || ""} onChange={handleChange} />
            <select name="estado" value={mascota.estado || ""} onChange={handleChange}>
                {estadoChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                        {choice.label}
                    </option>
                ))}
            </select>
            <select name="tipo_animal" value={mascota.tipo_animal || ""} onChange={handleChange}>
                {tipoAnimalChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                        {choice.label}
                    </option>
                ))}
            </select>
            <select name="tamano" value={mascota.tamano || ""} onChange={handleChange}>
                {tamanoChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                        {choice.label}
                    </option>
                ))}
            </select>
            <select name="sexo" value={mascota.sexo || ""} onChange={handleChange}>
                {sexoChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                        {choice.label}
                    </option>
                ))}
            </select>

            <button type="submit">Actualizar</button>
        </form>
    )
}


export default MascotasEdit;