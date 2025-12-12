import express from 'express';
const app = express();

app.use(express.json()); // <- Esto es obligatorio para JSON en body
