const express = require('express');
const router = express.Router();
const { actualizarProducto, eliminarProducto, getAllProductos, insertarProducto } = require('../models/product');

// Obtener todos los productos
router.get('/product', async (req, res) => {
    try {
        const productos = await getAllProductos();
        return res.json(productos);
    } catch (error) {
        console.error(error);
        return res.status(404).json({ error: error });
    }
});

// Insertar un nuevo producto
router.post('/product', async (req, res) => {
    const { nombre, precio } = req.body;

    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Se requiere nombre y precio del producto' });
    } else {
        try {
            const resultado = await insertarProducto(nombre, precio);
            return res.json(resultado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error interno del servidor: '+error.message });
        }
    }
});

// Eliminar un producto por su ID
router.delete('/product/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const resultado = await eliminarProducto(id);
        return res.json(resultado);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

// Actualizar un producto por su ID
// Controlador para actualizar productos
// Controlador para actualizar productos
router.put('/productos/product/:id', async (req, res) => {
    const id = req.params.id;
    const { nombre, precio } = req.body;

    if (!nombre || !precio) {
        return res.status(400).json({ error: 'Se requiere nombre y precio del producto' });
    } else if (!id) {
        return res.status(400).json({ error: 'Se requiere el ID del producto' });
    } else {
        try {
            const resultado = await actualizarProducto(id, nombre, precio);
            return res.json(resultado);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
});



module.exports = router;
