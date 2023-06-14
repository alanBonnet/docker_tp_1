console.clear()
console.log("iniciando server...");
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');

const productRoutes = require('./src/routes/product.routes');

const accessLogStream = fs.createWriteStream('log.txt', { flags: 'a' });

const app = express();
const port = 3000;
// MIDDLEWARE
app.use(cors())
// Configura el formato de log deseado
const logFormat = ':method :url :status :response-time ms';
// Activa el middleware de morgan con el stream de escritura del archivo
app.use(morgan(logFormat, { stream: accessLogStream }));

app.use(express.json());
app.use('/productos', productRoutes);

console.clear()
const conexionDB = require('./src/db/db')
app.listen(port, () => {
    (async()=>{
        let dbConnected;
        try {
            dbConnected = await conexionDB.getConnection()
            console.log("conectado a la base de datos")
        } catch (error) {
            console.log("no se pudo conectar a la db: "+error.message)
        } finally{
            if(dbConnected) dbConnected.end()
        }
    })()
    console.log(`Servidor escuchando en el puerto ${port}`);
});
