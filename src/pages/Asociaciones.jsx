import "../css/Asociaciones.css";
import { Asociacion } from "../components/Asociacion";
import VentanaDerecha from "../components/VentanaDerecha";
import useLlamadaApi from "../providers/useLlamadaApi";
import { useEstetico } from '../providers/ProviderEstetico';

export function Asociaciones() {
    const { datosApi, loading } = useLlamadaApi('associations');
    const { searchQuery } = useEstetico();

    if (loading) {
        return <div>Loading...</div>;
    }

        // Filtrar eventos según el searchQuery 
        const asociacionesFiltradas = datosApi.data.filter(asociacion =>
            asociacion.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        console.log('asociacionesFiltradas', asociacionesFiltradas);

    return (
        <div className="_asociaciones_main_container">
            <div className="_asociaciones_list">
                {asociacionesFiltradas.map((asociacion) => (
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