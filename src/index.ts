// src/index.ts
import express from 'express';
import { createEventoRouter } from './Routes/eventoRoute';
import { EventoRepository } from './Repositories/EventoRepository';
import { InMemoryEventoRepository } from './Repositories/InMemoryEventoRepository';

const app = express();
const PORT = 3000;

const eventoRepository: EventoRepository = new InMemoryEventoRepository(); // Instantiate the repository

app.use(express.json());

app.use('/eventos', createEventoRouter(eventoRepository)); // Pass the instantiated repository to createEventoRouter

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
