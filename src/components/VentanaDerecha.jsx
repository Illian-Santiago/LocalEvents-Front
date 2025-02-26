import "../css/VentanaDerecha.css";
import useLlamadaApi from "../providers/useLlamadaApi";
import { useLocation } from "react-router-dom";

export function VentanaDerecha() {
    const location = useLocation(); // Obtener la ruta actual

    let titulo = "";
    let endpoint = "";

    // Determinar qué datos mostrar según la ruta actual
    if (location.pathname === "/") {
        titulo = "Post recientes";
        endpoint = "posts?include=association";
    } else if (location.pathname === "/asociaciones") {
        titulo = "Eventos recientes";
        endpoint = "events?include=association";
    } else if (location.pathname === "/posts") {
        titulo = "Asociaciones";
        endpoint = "associations";
    }

    // Llamada a la API según la ruta
    const { datosApi, loading, error } = useLlamadaApi(endpoint);

    if (!endpoint) {
        return null; // No mostrar la ventana en otras rutas
    }

    if (loading) {
        return <div className="ventana-derecha"><h3>Cargando {titulo}...</h3></div>;
    }

    if (error) {
        return <div className="ventana-derecha"><h3>Error al cargar {titulo}.</h3><p>{error.message}</p></div>;
    }

    if (!datosApi || !datosApi.data) {
        return <div className="ventana-derecha"><h3>No hay datos disponibles.</h3></div>;
    }

    const ventanaDerecha = datosApi.data || datosApi;

    return (
        <div className="ventana-derecha">
            <h3>{titulo}</h3>
            <div className="posts-container">
                {ventanaDerecha.map((item) => (
                    <div key={item.id} className="post">
                        {/* Mostrar datos según el endpoint */}
                        {location.pathname === "/" && (
                            <>
                                <div className="post-header">
                                    <img
                                        src={`https://yeray.informaticamajada.es/${item.association?.image}`}
                                        alt="Asociación"
                                        className="post-asociacion-img"
                                    />
                                    <span className="post-nombre">{item.association?.name}</span>
                                </div>
                                <p className="post-contenido">{item.text}</p>
                                {item.image && (
                                    <img src={`https://yeray.informaticamajada.es/${item.image}`} alt="Post" className="post-img" />
                                )}
                            </>
                        )}

                        {location.pathname === "/asociaciones" && (
                            <>
                                <div className="post-header">
                                    <img
                                        src={`https://yeray.informaticamajada.es/${item.association?.image}`}
                                        alt="Asociación"
                                        className="post-asociacion-img"
                                    />
                                    <span className="post-nombre">{item.title}</span>
                                </div>
                                <p className="post-contenido">{item.description}</p>
                                {item.image && (
                                    <img src={`https://yeray.informaticamajada.es/${item.image}`} alt="Evento" className="post-img" />
                                )}
                            </>
                        )}

                        {location.pathname === "/posts" && (
                            <>
                                <div className="post-header">
                                    <img
                                        src={`https://yeray.informaticamajada.es/${item.image}`}
                                        alt="Asociación"
                                        className="post-asociacion-img"
                                    />
                                    <span className="post-nombre">{item.name}</span>
                                </div>
                                <p className="post-contenido">{item.description}</p>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VentanaDerecha;
