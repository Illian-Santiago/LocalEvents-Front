import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

// Función para obtener un valor de una cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Retornar null si la cookie no se encuentra
}

export default function useLlamadaApi(datoBuscar) {
    const [datosApi, setDatosApi] = useState(null); // Inicializar como null
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Nuevo estado para errores
    const [token, setToken] = useState(null); // Estado para el token

    const obtenerDatos = useCallback(async () => {
        const nombreItem = `${datoBuscar}Data`;
        const datosExistentes = localStorage.getItem(nombreItem);

        // Obtener el token de la cookie
        const token = getCookie('XSRF-TOKEN');
        setToken(token); // Guardar el token en el estado
        console.log('Token obtenido de la cookie:', token); // Log para verificar el token

        if (!token) {
            console.error('Token no encontrado en la cookie');
            setLoading(false);
            setError(new Error('Token no encontrado en la cookie'));
            return;
        }

        if (datosExistentes) {
            setDatosApi(JSON.parse(datosExistentes));
            setLoading(false);
        } else {
            try {
                // No borrar el withCredentials porfavor es necesario para el CORS, si no se pone no se podrá hacer la llamada.
                const llamadaApi = await axios.get(`http://localhost/api/${datoBuscar}`, {
                    withCredentials: true,
                    headers: {
                        'X-XSRF-TOKEN': token // Incluir el token en los headers
                    }
                });
                console.log('Respuesta de la API:', llamadaApi.data); // Log para verificar la respuesta de la API
                localStorage.setItem(nombreItem, JSON.stringify(llamadaApi.data));
                setDatosApi(llamadaApi.data);
                setLoading(false);
                setError(null); // Limpiar errores si la llamada es exitosa
            } catch (error) {
                console.error('Fallo al llamar los datos:', error);
                setError(error); // Guardar el error
                setLoading(false);
            }
        }
    }, [datoBuscar]);

    useEffect(() => {
        obtenerDatos();
    }, [obtenerDatos]);

    return { datosApi, loading, error, token }; // Devolver el token
}

