import "./AcercaDe.css";

function AcercaDe(){
    return(
        <section className="acercaDeSection">
            <div className="acercaDeOverlay">
                <header className="acercaDeHeader">
                    <p className="acercaDeTag">Hecho a mano con creatividad</p>
                    <h2>Acerca de nuestro negocio</h2>
                    <p>
                        Somos un emprendimiento de manualidades donde combinamos arte,
                        aprendizaje y crecimiento personal. Tambien abrimos cursos en
                        diferentes temporadas para quienes desean desarrollar su creatividad
                        y llevar esa habilidad hasta construir un negocio propio.
                    </p>
                </header>

                <div className="acercaDeGrid">
                    <article className="acercaDeCard">
                        <h3>Que hacemos</h3>
                        <p>
                            Creamos piezas artesanales y flores con materiales reciclables.
                            Ademas, contamos con un sistema de compra para adquirir productos
                            terminados y materiales seleccionados.
                        </p>
                    </article>

                    <article className="acercaDeCard">
                        <h3>Cursos y costos</h3>
                        <p>
                            Nuestros cursos se habilitan por temporada y tienen costo aparte.
                            Cada curso incluye guia paso a paso para que aprendas tecnicas
                            utiles, desde nivel inicial hasta proyectos mas completos.
                        </p>
                    </article>
                </div>

                <div className="acercaDePilares">
                    <article className="acercaDePilar">
                        <h3>Mision</h3>
                        <p>
                            Inspirar a mas personas a crear con sus manos, transformar ideas
                            en productos con valor y fomentar el uso responsable de materiales.
                        </p>
                    </article>

                    <article className="acercaDePilar">
                        <h3>Vision</h3>
                        <p>
                            Ser una comunidad referente en manualidades creativas y reciclaje,
                            donde cada alumna y alumno pueda convertir su talento en una fuente
                            real de ingresos.
                        </p>
                    </article>

                    <article className="acercaDePilar">
                        <h3>Valores</h3>
                        <ul>
                            <li>Creatividad con proposito.</li>
                            <li>Compromiso con el aprendizaje continuo.</li>
                            <li>Respeto por el medio ambiente.</li>
                            <li>Trabajo colaborativo y trato cercano.</li>
                            <li>Calidad en cada pieza y servicio.</li>
                        </ul>
                    </article>
                </div>
            </div>
        </section>
    );
}
export default AcercaDe;
