import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRouter from './src/routes/authRoutes.js';
import productsRouter from './src/routes/productsRoutes.js';
import { authentication } from './src/middlewares/authentication.js';
import categoriesRouter from './src/routes/categoriesRoutes.js';

const app = express();
const PORT = process.env.PORT || 3007;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use((req, res, next) => {
  console.log(`${req.url} ${req.method}`);
  next();
});


app.use(express.json());

//rutas publicas
app.use('/api', authRouter);

//rutas protegidas
app.use('/auth', authentication, productsRouter);
app.use('/categories', authentication, categoriesRouter);


// 404 (SIEMPRE al final, antes del listen)
app.use((req, res) => {
  res.status(404).json({
    error: "404. Ruta no encontrada",
    message: `El recurso ${req.url} no existe`
  });
});

//agrego error 500 despues del 404
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
});


app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});   

export default app;