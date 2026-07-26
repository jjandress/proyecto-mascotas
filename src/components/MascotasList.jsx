import { useEffect, useState } from "react";
import MascotasItem from "./MascotasItem";
import apiMascotas from "../api/apiMascotas";

function MascotasList() {
    const [listadoMascotas, setListadoMascotas] = useState([]);

    useEffect(() => {
        const fetchMascotas = async () => {
            // Peticion api hacia mascotas
            try{
                // Peticion GET
                const response = await apiMascotas.get("mascotas/");
                console.log(response);
                if (response.status === 200) {
                    setListadoMascotas(response.data);
                }
            }catch(error){
                console.log(error.response);
            }
        }

        fetchMascotas();
    }, []);

    return (
        <article>
            <h3>Mascotas List</h3>
            <div>
                <MascotasItem listado={listadoMascotas} />
            </div>
        </article>
    )
}

export default MascotasList;