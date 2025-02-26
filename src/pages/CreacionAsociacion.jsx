import { useState, useEffect } from 'react';
import axios from 'axios';
import useLlamadaApi from '../providers/useLlamadaApi';
import { FaSpinner } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        return <div className="alert-error">Error: {error.message}</div>;
    }

    return (
        <div className={`container mt-5 ${formTouched ? 'was-validated' : ''}`}>
            <div className="card">
                <div className="card-body">
                    <h2 className="card-title">Crear Nueva Asociación</h2>
                    <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Nombre:</label>
                            <input type="text" id="name" name="name" placeholder="Nombre de la asociación" value={formData.name} onChange={handleChange} required className={`form-control ${formData.name ? 'is-valid' : ''}`} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" id="email" name="email" placeholder="Correo electrónico" value={formData.email} onChange={handleChange} required className={`form-control ${formData.email ? 'is-valid' : ''}`} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="phone_number" className="form-label">Teléfono:</label>
                            <input type="tel" id="phone_number" name="phone_number" placeholder="Número de teléfono" value={formData.phone_number} onChange={handleChange} required className={`form-control ${formData.phone_number ? 'is-valid' : ''}`} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descripción:</label>
                            <textarea id="description" name="description" placeholder="Descripción de la asociación" value={formData.description} onChange={handleChange} required className={`form-control ${formData.description ? 'is-valid' : ''}`} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="id_responsible" className="form-label">ID Responsable:</label>
                            <input type='number' id="id_responsible" name="id_responsible" placeholder="ID del responsable" value={formData.id_responsible} onChange={handleChange} required className={`form-control ${formData.id_responsible ? 'is-valid' : ''}`} />
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? <FaSpinner className="spinner-border spinner-border-sm" /> : 'Crear'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreacionAsociacion;