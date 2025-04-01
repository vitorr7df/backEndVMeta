import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Rotas
app.use('/users', userRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));