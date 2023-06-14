const pool = require('../db/db');

const getAllProductos = async () => {
    let dbConnection;
    try {
        dbConnection = await pool.getConnection();
        const rows = await dbConnection.query('SELECT * FROM productos');
        return rows;
    } catch (error) {
        throw ('No se encuentran productos');
    } finally {
        if (dbConnection) dbConnection.end();
    }
}

const insertarProducto = async (nombre, precio) => {
    let dbConnection;
    try {
        dbConnection = await pool.getConnection();
        await dbConnection.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        precio DECIMAL(10, 2) NOT NULL
      )
    `);
        await dbConnection.query('INSERT INTO productos (nombre, precio) VALUES (?, ?)', [nombre, precio]);
        return { mensaje: 'Producto insertado correctamente' };
    } catch (error) {
        throw error;
    } finally {
        if (dbConnection) dbConnection.end();
    }
}

const eliminarProducto = async (id) => {
    let dbConnection;
    try {
        dbConnection = await pool.getConnection();
        await dbConnection.query('DELETE FROM productos WHERE id = ?', [id]);
        return { mensaje: 'Producto eliminado correctamente' };
    } catch (error) {
        throw error;
    } finally {
        if (dbConnection) dbConnection.end();
    }
}

const actualizarProducto = async (id, nombre, precio) => {
    let dbConnection;
    try {
        dbConnection = await pool.getConnection();
        await dbConnection.query('UPDATE productos SET nombre = ?, precio = ? WHERE id = ?', [nombre, precio, id]);
        return { mensaje: 'Producto actualizado correctamente' };
    } catch (error) {
        throw error;
    } finally {
        if (dbConnection) dbConnection.end();
    }
}

module.exports = {
    getAllProductos,
    insertarProducto,
    eliminarProducto,
    actualizarProducto,
};
