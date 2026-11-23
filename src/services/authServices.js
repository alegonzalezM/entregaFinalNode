import jwt from 'jsonwebtoken';
import 'dotenv/config';

const SECRET = process.env.JWT_SECRET;

const users = [
  { id: 1, email: 'admin@gmail.com', password: '123456' },
  { id: 2, email: 'admin@test.com', password: '456789' },
];

export const loginUserService = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    const err = new Error('Credenciales inválidas');
    err.code = 'auth/invalid-credential';
    throw err;
  }

  const { id, email: userEmail } = user;
  const token = jwt.sign({ id, email: userEmail }, SECRET, { expiresIn: '1h' });
  return { id, email: userEmail, token };
};   