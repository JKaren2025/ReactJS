import './PieComponente.css';

function PieComponente() {
  return (
    <footer className="pieDiv">
      <div className="pieCol">
        <h4>Contacto</h4>
        <p>Correo: bjohana032@gmail.com</p>
        <p>Telefono: +52 7761206884</p>
      </div>

      <div className="pieCol">
        <h4>Atencion</h4>
        <p>Responsable: Johana Karen Barragan Marquez</p>
        <p>Horario: Lunes a Sabado, 9:00 AM - 7:00 PM</p>
      </div>

      <div className="pieCol">
        <h4>Informacion</h4>
        <p>Sucursal base: Puebla, Mexico</p>
        <p>Servicios: Manualidades, cursos y pedidos especiales</p>
      </div>

      <div className="pieCopy">
        <p>2024 Mi aplicacion React. Todos los derechos reservados.</p>
      </div>

      <div className="pieNota">
        <p>Johana Karen Barragan Marquez</p>
      </div>
    </footer>
  );
}

export default PieComponente;
