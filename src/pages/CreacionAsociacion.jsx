import { useState, useEffect } from 'react';
import axios from 'axios';
import useLlamadaApi from '../providers/useLlamadaApi';
import '../css/CreacionAsociacion.css';
import { FaSpinner } from 'react-icons/fa';


export function CreacionAsociacion() {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        email: '',
        phone_number: '',
        description: '',
        level: 1,
        id_responsible: '',
        create_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formTouched, setFormTouched] = useState(false);

    const { loading, error, token } = useLlamadaApi('associations');

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
                setErrorMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setFormTouched(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('https://yeray.informaticamajada.es/api/associations', formData, {
                withCredentials: true,
                headers: {
                    'X-XSRF-TOKEN': token // Incluir el token en los headers
                }
            });
            console.log('Asociación creada:', response.data);
            setSuccessMessage('¡Asociación creada exitosamente!');
            setFormData({
                name: '',
                image: '',
                email: '',
                phone_number: '',
                description: '',
                level: 1,
                id_responsible: '',
                create_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
            });
            setFormTouched(false);

        } catch (error) {
            if (error.response) {
                setErrorMessage('Error: ' + error.response.data.message);
                console.error('Error:', error.response.data);
            } else {
                setErrorMessage('Error: ' + error.message);
                console.error('Error:', error.message);
            }
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
                <h2 className="form-title">Crear Nueva Asociación</h2>
                <form onSubmit={handleSubmit} className="association-form" noValidate>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Nombre:</label>
                        <input type="text" id="name" name="name" placeholder="Nombre de la asociación" value={formData.name} onChange={handleChange} required className={`form-input ${formData.name ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="image" className="form-label">Imagen (URL):</label>
                        <input type="url" id="image" name="image" placeholder="URL de la imagen" value={formData.image} onChange={handleChange} className={`form-input ${formData.image ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required className={`form-input ${formData.email ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone_number" className="form-label">Teléfono:</label>
                        <input type="tel" id="phone_number" name="phone_number" placeholder="Número de teléfono" value={formData.phone_number} onChange={handleChange} required className={`form-input ${formData.phone_number ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Descripción:</label>
                        <textarea id="description" name="description" placeholder="Descripción de la asociación" value={formData.description} onChange={handleChange} required className={`form-input form-textarea ${formData.description ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="level" className="form-label">Nivel:</label>
                        <input type="number" id="level" name="level" placeholder="Nivel (1-255)" value={formData.level} onChange={handleChange} required min="1" max="255" className={`form-input ${formData.level ? 'input-filled' : ''}`} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="id_responsible" className="form-label">ID Responsable:</label>
                        <input type="text" id="id_responsible" name="id_responsible" placeholder="ID del responsable" value={formData.id_responsible} onChange={handleChange} required className={`form-input ${formData.id_responsible ? 'input-filled' : ''}`} />
                    </div>

                    <div className="button-container">
                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                            {isSubmitting ? <FaSpinner className="button-spinner" /> : 'Crear'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default CreacionAsociacion;