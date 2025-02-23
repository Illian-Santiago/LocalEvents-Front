import "../css/Asociaciones.css";
import { Asociacion } from "../components/Asociacion";
import VentanaDerecha from "../components/VentanaDerecha";
import useLlamadaApi from "../providers/useLlamadaApi";

export function Asociaciones() {
    const { datosApi, loading } = useLlamadaApi('associations');

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="_asociaciones_main_container">
            <div className="_asociaciones_list">
                {datosApi.data.map((asociacion) => (
                    <Asociacion 
                        key={asociacion.id} 
                        id={asociacion.id}
                        name={asociacion.name} 
                        description={asociacion.description} 
                        image={asociacion.image} 
                        email={asociacion.email} 
                        phone_number={asociacion.phone_number} 
                        level={asociacion.level}
                    />
                ))}
            </div>

            <VentanaDerecha />
        </div>
    );
}

export default Asociaciones;