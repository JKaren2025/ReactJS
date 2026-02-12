import "./Contacto.css";

function Contacto() {
  return (
    <section className="contactoSection">
      <div className="contactoPanel">
        <header className="contactoHeader">
          <p className="contactoTag">Hablemos de tu idea</p>
          <h2>Contacto</h2>
          <p>
            Envia tu mensaje para cotizaciones, cursos o pedidos especiales.
            Te respondemos lo antes posible.
          </p>
        </header>

        <form className="contactoForm">
          <div className="campoGrupo">
            <label htmlFor="nombre">Nombre completo</label>
            <input id="nombre" type="text" placeholder="Ej. Maria Lopez" />
          </div>

          <div className="campoDoble">
            <div className="campoGrupo">
              <label htmlFor="correo">Correo electronico</label>
              <input
                id="correo"
                type="email"
                placeholder="ejemplo@correo.com"
              />
            </div>
            <div className="campoGrupo">
              <label htmlFor="telefono">Telefono</label>
              <input id="telefono" type="tel" placeholder="+52 222 000 0000" />
            </div>
          </div>

          <div className="campoDoble">
            <div className="campoGrupo">
              <label htmlFor="asunto">Asunto</label>
              <input
                id="asunto"
                type="text"
                placeholder="Curso, cotizacion, pedido especial..."
              />
            </div>
            <div className="campoGrupo">
              <label htmlFor="categoria">Categoria</label>
              <select id="categoria" defaultValue="">
                <option value="" disabled>
                  Selecciona una opcion
                </option>
                <option value="productos">Productos</option>
                <option value="cursos">Cursos</option>
                <option value="eventos">Eventos</option>
                <option value="mayoreo">Pedidos mayoreo</option>
              </select>
            </div>
          </div>

          <div className="campoGrupo">
            <label>Metodo de contacto preferido</label>
            <div className="opcionesLinea">
              <label>
                <input type="radio" name="metodo" defaultChecked />
                WhatsApp
              </label>
              <label>
                <input type="radio" name="metodo" />
                Correo
              </label>
              <label>
                <input type="radio" name="metodo" />
                Llamada
              </label>
            </div>
          </div>

          <div className="campoGrupo">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              rows="5"
              placeholder="Cuentanos lo que necesitas y te ayudamos a armar la mejor opcion."
            />
          </div>

          <div className="opcionesLinea">
            <label>
              <input type="checkbox" />
              Deseo recibir novedades y promociones.
            </label>
          </div>

          <button type="submit" className="btnEnviar">
            Enviar mensaje
          </button>
        </form>
      </div>

      <aside className="contactoInfo">
        <img
          src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?auto=format&fit=crop&w=900&q=80"
          alt="Mesa de trabajo de manualidades"
          className="contactoInfoImagen"
        />
        <h3>Informacion directa</h3>
        <p>
          Tambien puedes escribirnos para pedidos urgentes o dudas sobre cursos.
        </p>
        <ul>
          <li>
            <strong>WhatsApp:</strong> +52 222 000 0000
          </li>
          <li>
            <strong>Correo:</strong> contacto@tallercreativo.com
          </li>
          <li>
            <strong>Horario:</strong> Lunes a Sabado, 9:00 AM - 7:00 PM
          </li>
        </ul>
      </aside>
    </section>
  );
}

export default Contacto;
