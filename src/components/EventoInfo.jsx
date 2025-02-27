import { useParams, useNavigate } from "react-router-dom";  
import useLlamadaApi from "../providers/useLlamadaApi";
import "../css/EventoInfo.css";
import axios from 'axios';

// Function to get a cookie by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export function EventoInfo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { datosApi, loading, error } = useLlamadaApi(`events/${id}`);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: No se pudo cargar el evento.</div>;
    }

    if (!datosApi || !datosApi.data) {
        return <div>No se encontraron datos.</div>;
    }

    const evento = datosApi.data;

    const handleEdit = () => {
        navigate(`/editarEvento/${id}`);
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este evento?");
        if (confirmDelete) {
            try {
                await axios.delete(`https://yeray.informaticamajada.es/api/events/${id}`, {
                    withCredentials: true,
                    headers: {
                        'X-XSRF-TOKEN': getCookie('XSRF-TOKEN')
                    }
                });
                navigate('/');
            } catch (error) {
                console.error('Error al eliminar el evento:', error);
                alert('Error al eliminar el evento.');
            }
        }
    };

    return (
        <div>
            <div className="evento-info-container">
                <div className="evento-info-header">
                    <img src={`https://yeray.informaticamajada.es/${evento.image}`} alt="Evento" className="evento-info-img" />
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
                    <button className="btn-evento-info btn-evento-forum" onClick={handleEdit}>
                        Editar Evento
                    </button>
                    <button className="btn-evento-info btn-evento-join" onClick={handleDelete}>
                        Eliminar Evento
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EventoInfo;
