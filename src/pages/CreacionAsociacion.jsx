import { useState, useEffect } from 'react';
import axios from 'axios';
import useLlamadaApi from '../providers/useLlamadaApi';
import '../css/CreacionAsociacion.css';
import { FaSpinner } from 'react-icons/fa';

export function CreacionAsociacion() {
    const [formData, setFormData] = useState({
        name: '',
        imageFile: null, // Cambiar 'image' a 'imageFile' para manejar archivos
        email: '',
        phone_number: '',
        description: '',
        id_responsible: '',
        create_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [formTouched, setFormTouched] = useState(false);
    const [formErrors, setFormErrors] = useState({});

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
        const { name, value, files } = e.target;
        if (name === 'imageFile') {
            setFormData({
                ...formData,
                imageFile: files[0] // Manejar archivos
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

        // Validar que la imagen no sea nula
        if (!formData.imageFile) {
            setFormErrors({ imageFile: 'La imagen es obligatoria.' });
            setIsSubmitting(false);
            return;
        }

        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await axios.post('https://yeray.informaticamajada.es/api/associations', formDataToSend, {
                withCredentials: true,
                headers: {
                    'X-XSRF-TOKEN': token, // Incluir el token en los headers
                    'Content-Type': 'multipart/form-data' // Asegurarse de que el contenido sea multipart/form-data
                }
            });
            console.log('Asociación creada:', response.data);
            setSuccessMessage('¡Asociación creada exitosamente!');
            setFormData({
                name: '',
                imageFile: null,
                email: '',
                phone_number: '',
                description: '',
                id_responsible: '',
                create_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
            });
            setFormTouched(false);

        } catch (error) {
            if (error.response) {
                if (error.response.data.message.includes('Duplicate entry')) {
                    setErrorMessage('Error: Este correo electrónico ya ha creado una asocicion.');
                } else {
                    setErrorMessage('Error: ' + error.response.data.message);
                }
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
                        <label htmlFor="imageFile" className="form-label">Imagen de perfil (Obligatoria):</label>
                        <input type="file" id="imageFile" name="imageFile" onChange={handleChange} className="form-input" required />
                        {formErrors.imageFile && <p className="error-message">{formErrors.imageFile}</p>}
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
                        <label htmlFor="id_responsible" className="form-label">ID Responsable:</label>
                        <input type="text" id="id_responsible" name="id_responsible" placeholder="ID del responsable" value={formData.id_responsible} onChange={handleChange} required className={`form-input ${formData.id_responsible ? 'input-filled' : ''}`} />
                    </div>

                    <div className="button-container">
                        <button type="submit" className="submit-button" disabled={isSubmitting}>
                            {isSubmitting ? <FaSpinner className="button-spinner" /> : 'Crear'}
                        </button>
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </form>
            </div>
        </div>
    );
}

export default CreacionAsociacion;
