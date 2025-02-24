import "../css/Eventos.css";
import { NavLink } from 'react-router-dom';

export function Evento({ nombre, bio, imagen, estado, tipo, id }) {

    console.log("Evento: ", id);
    return (
        <>
            <div className="evento">
                <NavLink to={`/EventoInfo/${id}`}>
                    <div className="evento-header">
                        <img src={`https://yeray.informaticamajada.es/api/${imagen}`} alt="Asociación" className="asociacion-img" />
                        <span className="asociacion-nombre">{nombre}</span>
                    </div>
                </NavLink>
                <img src={`https://yeray.informaticamajada.es/api/${imagen}`} alt="Evento" className="evento-img" />

                <div className="evento-info">
                    <span className={`evento-estado ${estado.toLowerCase()}`}>{estado}</span>
                    <span className="evento-tipo">{tipo}</span>
                </div>

                <p className="evento-descripcion">{bio}</p>

                <div className="evento-footer">
                    <NavLink to="/EventoInfo">
                            <button className="btn-eventos btn-forum">                        
                                <span className="material-symbols-outlined">forum</span>
                            </button>
                    </NavLink>

                    <NavLink className={"lo"} to={`/EventoInfo/${id}`}>
                        <button className="btn-eventos btn-forum">
                            Info
                        </button>
                    </NavLink>

                    <NavLink to="/EventoInfo">  
                        <button className="btn-eventos btn-join">
                                Unirse
                        </button>
                    </NavLink>
                </div>
            </div>

            <hr className="evento-divider" />
        </>
    );
}

export default Evento;
