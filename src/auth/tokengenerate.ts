const jwt = require('jsonwebtoken');

import { Usuario } from '../Entities/Usuario';


function generateToken(user: Usuario): string {
  // Create a JWT token with a payload containing user information
  const payload = {
    id: user.id,
    username: user.nomeUsuario,
    // Add other user-related data as needed
  };

  // Sign the token with a secret key
  const token = jwt.sign(payload, 'topicos-avacados-2', { expiresIn: '1h' });

  return token;
}
module.exports = { generateToken };
