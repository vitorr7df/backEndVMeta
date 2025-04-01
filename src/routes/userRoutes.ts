import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser, login } from '../controllers/userController';

const router = express.Router();

router.post('/login', login);
router.post('/register', createUser);
router.get('/', getAllUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;