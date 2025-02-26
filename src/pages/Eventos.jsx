import "../css/Eventos.css";
import { Evento } from "../components/Evento";
import VentanaDerecha from "../components/VentanaDerecha";
import useLlamadaApi from "../providers/useLlamadaApi";
import { useEstetico } from '../providers/ProviderEstetico';

export function Eventos() {
    const { datosApi, loading } = useLlamadaApi('events');
    const { searchQuery } = useEstetico();
    
    if (loading) {
        return <div>Loading...</div>;
    }
    
    // Filtrar eventos según el searchQuery 
    const eventosFiltrados = datosApi.data.filter(evento =>
        evento.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
        <div className="eventos-main-container">
            <div className="eventos-container">
                {eventosFiltrados.map(evento => (
                    <Evento
                        key={evento.id}
                        id={evento.id}
                        nombre={evento.title}
                        bio={evento.description}
                        imagen={evento.image}
                        estado={evento.state}
                        tipo={evento.type}
                    />
                ))}
            </div>
            <VentanaDerecha />
        </div>
    );
    
}


export default Eventos;
