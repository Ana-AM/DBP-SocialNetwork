const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodypaser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();
dotenv.config({
    path: './config/config.env'
})

//Usar el body-parser

app.use(bodypaser.json())

if(process.env.NODE_ENV ==='development'){
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))

    app.use(morgan('dev'))
}

mongoose.connection.on("open", () => {
  console.log("Base de datos conectada");
});

let { HOST, DBPORT, DBNAME } = process.env;

const uri = `mongodb://${HOST}:${DBPORT}/${DBNAME}`;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, { ssl: true })


//Cargando las rutas
const authRouter = require('./routes/auth.route')
const postRouter = require('./routes/post.route')
//Usar las rutas
app.use('/api/u/',authRouter);
app.use('/api/p/',postRouter);

app.use((req,res,next)=>{
    res.status(400).json({
        success: false,
        message: "Pagina no encontrada"
    })
});


const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`Escuchando por el puerto ${PORT}`)
});


