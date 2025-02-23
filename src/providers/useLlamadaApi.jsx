import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

export default function useLlamadaApi(datoBuscar) {
    const [datosApi, setDatosApi] = useState([]);
    const [loading, setLoading] = useState(true);

    const obtenerDatos = useCallback(async () => {
        const nombreItem = `${datoBuscar}Data`;
        const datosExistentes = localStorage.getItem(nombreItem);

        if (datosExistentes) {
            setDatosApi(JSON.parse(datosExistentes));
            setLoading(false);
        } else {
            try {
                const llamadaApi = await axios.get(`http://localhost:8000/api/${datoBuscar}`);
                localStorage.setItem(nombreItem, JSON.stringify(llamadaApi.data));
                setDatosApi(llamadaApi.data);
                setLoading(false);
            } catch (error) {
                console.log('Fallo al llamar los datos:', error);
                setLoading(false);
            }
        }
    }, [datoBuscar]);

    useEffect(() => {
        obtenerDatos();
    }, [obtenerDatos]);

    return { datosApi, loading };
}