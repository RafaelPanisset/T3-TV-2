import express, { Express } from 'express';
import eventoRoutes from '../src/Routes/eventoRoute';

import cardRouter from '../src/Routes/CardRoutes';

import lutaRoutes from '../src/Routes/lutaRoutes';
import lutadorRoutes from '../src/Routes/lutadorRoutes';
import usuarioRoutes from '../src/Routes/usuarioRoutes';

const app: Express = express();
const port = 3000; // You can change this to the desired port number

// Middleware to parse incoming JSON data
app.use(express.json());

// Mount the event routes
// app.use(eventoRoutes);
// app.use(cardRouter);
// app.use(lutaRoutes);
// app.use(lutadorRoutes);
// app.use(usuarioRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
