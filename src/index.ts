import express, { Express } from 'express';
import eventoRoutes from '../src/Routes/eventoRoute';

import cardRouter from '../src/Routes/CardRoutes';

import lutaRoutes from '../src/Routes/lutaRoutes';
import lutadorRoutes from '../src/Routes/lutadorRoutes';
import usuarioRoutes from '../src/Routes/usuarioRoutes';

import { InMemoryUsuarioRepository } from '../src/Repositories/InMemoryUsuarioRepository';

const jwt = require('jsonwebtoken');
const { generateToken } = require('../src/auth/tokengenerate');
import { Request, Response } from "express";



const app: Express = express();
const cors = require('cors');

const port = 3034; // You can change this to the desired port number

// Middleware to parse incoming JSON data
app.use(express.json());



const allowedOrigins = [
  'http://localhost:3000', 
  'https://ufc-twaw.onrender.com'
];

app.use(cors({
  origin: allowedOrigins, 
}));

app.get('/', (req, res) => {
  res.send('Online');
});



interface RequestWithBody extends Request {
  body: {
    [key: string]: string;
  };
}

// Login route
app.post('/login', (req: RequestWithBody, res: Response) => {
  const { username, password } = req.body;

  // Authenticate the user (replace this with your authentication logic)
  const userRepository = new InMemoryUsuarioRepository(); // Initialize your user repository
  const user = userRepository.authenticateUser(username, password);

  if (user) {
    // Generate a JWT token and send it as a response
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Authentication failed' });
  }
});

// Mount the event routes
app.use(eventoRoutes);
app.use(cardRouter);
app.use(lutaRoutes);
app.use(lutadorRoutes);
app.use(usuarioRoutes);





// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
