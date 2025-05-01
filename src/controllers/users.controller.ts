import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getUserStorage } from '../dao/users.dao';
const jwtSecret = process.env.JWT_SECRET || 'default_secret';

export async function login(req: Request, res: Response) {
  const { id, password } = req.body;

  if (typeof id !== 'number' || typeof password !== 'string') {
    res.status(400).json({ message: 'Invalid credentials format' });
    return;
  }

  const storage = await getUserStorage();
  const user = await storage.read(id);

  if (!user || user.password !== password) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const payload = { id: user.id, role: user.role };
  const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

  res.json({ token });
}
