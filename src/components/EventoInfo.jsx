import { useParams } from "react-router-dom";
// import { NavLink } from 'react-router-dom';
import { events } from "../data/Events";  
import "../css/EventoInfo.css";

export function EventoInfo() {
    const { id } = useParams();
    const evento = events.find(event => event.id === parseInt(id));

    if (!evento) {
        return <p className="evento-info-error">Evento no encontrado.</p>;
    }

    return (
        <div className="evento-info-container">
            <div className="evento-info-header">
                <img src={evento.image} alt="Evento" className="evento-info-img" />
                <h1 className="evento-info-title">{evento.title}</h1>
            </div>

            <p className="evento-info-description">{evento.description}</p>

            <div className="evento-info-details">
                <div className="evento-info-item">
                    <strong>Estado:</strong>
                    <span className={`evento-info-estado ${evento.state.toLowerCase()}`}>
                        {evento.state}
                    </span>
                </div>
                <div className="evento-info-item"><strong>Tipo:</strong> {evento.type}</div>
                <div className="evento-info-item"><strong>Fecha de inicio:</strong> {evento.start_date}</div>
                <div className="evento-info-item"><strong>Fecha de finalización:</strong> {evento.end_date}</div>
                <div className="evento-info-item"><strong>Hora de inicio:</strong> {evento.start_hour}</div>
                <div className="evento-info-item"><strong>Hora de finalización:</strong> {evento.end_hour}</div>
                <div className="evento-info-item"><strong>Invitados:</strong> {evento.num_guests} / {evento.max_guests || "Sin límite"}</div>
                <div className="evento-info-item"><strong>Colaboradores:</strong> {evento.num_collaborators || 0} / {evento.max_collaborators || "Sin límite"}</div>
            </div>

            <div className="evento-info-footer">
                
                <button className="btn-evento-info btn-evento-forum">
                    <span className="material-symbols-outlined">
                        forum
                    </span>
                </button>

                <button className="btn-evento-info btn-evento-join">Unirse</button>
            </div>
        </div>
    );
}

export default EventoInfo;
