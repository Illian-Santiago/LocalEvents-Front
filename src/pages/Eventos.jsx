import "../css/Eventos.css";
import { Evento } from "../components/Evento";
import VentanaDerecha from "../components/VentanaDerecha";
import useLlamadaApi from "../providers/useLlamadaApi";

export function Eventos() {
    const { datosApi, loading } = useLlamadaApi('events');

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="eventos-main-container">
            <div className="eventos-container">
                {datosApi.data.map((evento) => {
                    console.log("Evento imagen:", evento.image);
                    console.log("URL completa:", `https://yeray.informaticamajada.es/${evento.image}`);

                    return (
                        <Evento
                            key={evento.id}
                            id={evento.id}
                            nombre={evento.title}
                            bio={evento.description}
                            imagen={evento.image}
                            estado={evento.state}
                            tipo={evento.type}
                        />
                    );
                })}
            </div>

            <VentanaDerecha />
        </div>
    );
}


export default Eventos;
