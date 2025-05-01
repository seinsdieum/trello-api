import { Router } from 'express';
import { login } from '../controllers/users.controller';
import { authenticateJwt, authorizeRoles } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', login);

router.get('/admin-data', authenticateJwt, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Welcome admin!' });
});

router.get('/client-data', authenticateJwt, (req, res) => {
  res.json({ message: 'Welcome user!' });
});

export { router as usersRoute };
