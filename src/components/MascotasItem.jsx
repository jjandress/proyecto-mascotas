function MascotasItem({listado}) {
    return (
        <>
        {listado.map((mascota) => (
            <div key={mascota.id}>
                <img src={mascota.imagen} alt={mascota.nombre} />
                <h4>{mascota.nombre}</h4>
                <p>{mascota.descripcion}</p>
                <p>{mascota.tipo_animal}</p>
                <p>{mascota.estado}</p>
            </div>
        ))}
            {/** Aca deberian estar todos los datos de mascota */ }
        </>
    )
}

export default MascotasItem;