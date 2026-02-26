// lightweight component that uses a plain Google Maps embed iframe
// (no API key required) so the map always renders inside the card.
function Mapa({ lat, lng, nombre_sucursal }) {
  const src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  return (
    <div className="mapa-contenedor">
      <iframe
        title={nombre_sucursal || 'mapa'}
        src={src}
        width="100%"
        height="260"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Mapa;
