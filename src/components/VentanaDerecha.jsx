import "../css/VentanaDerecha.css";
import useLlamadaApi from "../providers/useLlamadaApi";

export function VentanaDerecha() {

    const titulo = 'Post recientes';

    const { datosApi, loading, error } = useLlamadaApi('posts');

    if (loading) {
        return <div className="ventana-derecha"><h3>Cargando ventana derecha...</h3></div>;
    }

    if (error) {
        return <div className="ventana-derecha"><h3>Error al cargar ventana derecha.</h3><p>{error.message}</p></div>;
    }

    if (!datosApi || !datosApi.data) {
        if(!datosApi){
            return <div className="ventana-derecha"><h3>No hay datos disponibles.</h3></div>
        }
        return <div className="ventana-derecha"><h3>Datos con estructura incorrecta.</h3></div>;
    }

    const ventanaDerecha = datosApi.data || datosApi; 

    return (
        <div className="ventana-derecha">
            <h3>{titulo}</h3>
            <div className="posts-container">
                {ventanaDerecha.map((ventana) => (
                    <div key={ventana.id} className="post">
                        <div className="post-header">
                            <img src={`http://localhost:8000/${ventana.image}`} alt="Asociación" className="post-asociacion-img" />
                            <span className="post-nombre">{ventana.nombre}</span>
                        </div>
                        <p className="post-contenido">{ventana.text}</p>
                        {ventana.image && <img src={`http://localhost:8000/${ventana.image}`}  alt="Post" className="post-img" />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VentanaDerecha;