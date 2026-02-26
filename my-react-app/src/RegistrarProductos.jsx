function registrarProductos() {
    return ( 
    <div>
        <h2>Registrar Productos</h2>
        <form>
            <label>Titulo:</label>
            <input type="text" name="titulo" />
            <label>Precio:</label>
            <input type="number" name="price" />
            <label>Descripción:</label>
            <input type="text" name="description" />
            <label>Categoria:</label>
            <input type="text" name="category" />
            <label>Imagen:</label>
            <input type="text" name="imagen" />
            <label>Registrar:</label>
        </form>

    </div>
}
export default registrarProducto;