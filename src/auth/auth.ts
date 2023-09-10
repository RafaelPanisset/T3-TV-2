const express = require('express');
const jwt = require('jsonwebtoken');
const { InMemoryUsuarioRepository } = require('../Repositories/InMemoryUsuarioRepository'); // Import your repository
const { generateToken } = require('../auth/tokengenerate');
import { Request, Response } from "express";

const app = express();
app.use(express.json());

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
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

// Protected route
app.get('/protected', (req: RequestWithBody, res: Response) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the secret key
    const decoded = jwt.verify(token, 'your-secret-key');

    // You can now access the user's information in `decoded`
    const userId = decoded.id;
    // ...

    // Proceed with your protected route logic
    res.json({ message: 'Access granted.' });
  } catch (ex) {
    res.status(400).json({ message: 'Invalid token.' });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
