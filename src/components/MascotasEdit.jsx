import {useEffect, useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiMascotas from "../api/apiMascotas";

function MascotasEdit() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [mascota, setMascota] = useState({});

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

        fetchMascota();
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
            edad: mascota.edad
        }

        try {
            const response =  await apiMascotas.patch(`mascotas/${id}/`, datos);
            console.log(response);
            navigate("/Mascotas/listado");

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

            <button type="submit">Actualizar</button>
        </form>
    )
}


export default MascotasEdit;