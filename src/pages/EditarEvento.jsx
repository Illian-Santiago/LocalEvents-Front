import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useLlamadaApi from '../providers/useLlamadaApi';
import '../css/CreacionAsociacion.css';
import { FaSpinner } from 'react-icons/fa';

export function EditarEvento() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        imageFile: null,
        description: '',
        state: 'Proximamente',
        type: 'Evento',
        num_guests: '',
        max_guests: '',
        start_hour: '',
        end_hour: '',
        start_date: '',
        end_date: '',
        num_collaborators: '',
        max_collaborators: '',
        association_id: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formTouched, setFormTouched] = useState(false);
    const { loading, error, token } = useLlamadaApi('events');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`https://yeray.informaticamajada.es/api/events/${id}`, {
                    withCredentials: true,
                    headers: {
                        'X-XSRF-TOKEN': token
                    }
                });
                setFormData({
                    ...response.data,
                    imageFile: null // Reset imageFile to null to avoid uncontrolled input warning
                });
            } catch (error) {
                setErrorMessage('Error al cargar el evento');
                console.error('Error:', error);
            }
        };

        fetchEvent();
    }, [id, token]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'imageFile') {
            setFormData({
                ...formData,
                imageFile: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
        setFormTouched(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.put(`https://yeray.informaticamajada.es/api/events/${id}`, formDataToSend, {
                withCredentials: true,
                headers: {
                    'X-XSRF-TOKEN': token,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Evento actualizado:', response.data);
            setSuccessMessage('¡Evento actualizado exitosamente!');
            navigate(`/EventoInfo/${id}`);
        } catch (error) {
            setErrorMessage('Error al actualizar el evento');
            console.error('Error:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <FaSpinner className="spinner" />
                <span>Cargando...</span>
            </div>
        );
    }

    if (error) {
        return <div className="error-container">Error: {error.message}</div>;
    }

    return (
        <div className={`form-container ${formTouched ? 'form-touched' : ''}`}>
            <div className="form-content">
                <h2 className="form-title">Editar Evento</h2>
                <form onSubmit={handleSubmit} className="association-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Título:</label>
                        <input type="text" id="title" name="title" placeholder="Título del evento" value={formData.title || ''} onChange={handleChange} required className={`form-input ${formData.title ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageFile" className="form-label">Imagen:</label>
                        <input type="file" id="imageFile" name="imageFile" onChange={handleChange} className="form-input" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Descripción:</label>
                        <textarea id="description" name="description" placeholder="Descripción del evento" value={formData.description || ''} onChange={handleChange} className={`form-input form-textarea ${formData.description ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="state" className="form-label">Estado:</label>
                        <select id="state" name="state" value={formData.state || 'Proximamente'} onChange={handleChange} className="form-input">
                            <option value="Proximamente">Próximamente</option>
                            <option value="Realizandose">Realizándose</option>
                            <option value="Finalizado">Finalizado</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="type" className="form-label">Tipo:</label>
                        <select id="type" name="type" value={formData.type || 'Evento'} onChange={handleChange} className="form-input">
                            <option value="Evento">Evento</option>
                            <option value="Actividad">Actividad</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="num_guests" className="form-label">Número de invitados:</label>
                        <input type="number" id="num_guests" name="num_guests" placeholder="Número de invitados" value={formData.num_guests || ''} onChange={handleChange} required className={`form-input ${formData.num_guests ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="max_guests" className="form-label">Máximo de invitados:</label>
                        <input type="number" id="max_guests" name="max_guests" placeholder="Máximo de invitados" value={formData.max_guests || ''} onChange={handleChange} className={`form-input ${formData.max_guests ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="start_hour" className="form-label">Hora de inicio:</label>
                        <input type="time" id="start_hour" name="start_hour" placeholder="Hora de inicio" value={formData.start_hour || ''} onChange={handleChange} required className={`form-input ${formData.start_hour ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="end_hour" className="form-label">Hora de finalización:</label>
                        <input type="time" id="end_hour" name="end_hour" placeholder="Hora de finalización" value={formData.end_hour || ''} onChange={handleChange} required className={`form-input ${formData.end_hour ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="start_date" className="form-label">Fecha de inicio:</label>
                        <input type="date" id="start_date" name="start_date" placeholder="Fecha de inicio" value={formData.start_date || ''} onChange={handleChange} required className={`form-input ${formData.start_date ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="end_date" className="form-label">Fecha de finalización:</label>
                        <input type="date" id="end_date" name="end_date" placeholder="Fecha de finalización" value={formData.end_date || ''} onChange={handleChange} required className={`form-input ${formData.end_date ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="num_collaborators" className="form-label">Número de colaboradores:</label>
                        <input type="number" id="num_collaborators" name="num_collaborators" placeholder="Número de colaboradores" value={formData.num_collaborators || ''} onChange={handleChange} className={`form-input ${formData.num_collaborators ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="max_collaborators" className="form-label">Máximo de colaboradores:</label>
                        <input type="number" id="max_collaborators" name="max_collaborators" placeholder="Máximo de colaboradores" value={formData.max_collaborators || ''} onChange={handleChange} className={`form-input ${formData.max_collaborators ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="association_id" className="form-label">ID de la asociación:</label>
                        <input type="text" id="association_id" name="association_id" placeholder="ID de la asociación" value={formData.association_id || ''} onChange={handleChange} required className={`form-input ${formData.association_id ? 'input-filled' : ''}`} />
                    </div>

                    <div className="button-container">
                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                            {isSubmitting ? <FaSpinner className="button-spinner" /> : 'Actualizar'}
                        </button>
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </form>
            </div>
        </div>
    );
}

export default EditarEvento;