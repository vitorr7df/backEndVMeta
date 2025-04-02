import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail, createUserQuery, updateUserQuery, deleteUserQuery } from '../sql/userSql';
import { Usuario } from '../interfaces/userInterfaces';

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await getUserByEmail('%');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar usuários' });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    const { nome, email, senha } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(senha, salt);

    try {
        const user = await createUserQuery(nome, email, hashedPassword);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar usuário' });
    }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { nome, email } = req.body;
    try {
        await updateUserQuery(id, nome, email);
        res.status(200).json({ id, nome, email });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await deleteUserQuery(id);
        res.status(200).json({ message: 'Usuário deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, senha } = req.body;
    try {
        const users = await getUserByEmail(email);
        if (users.length === 0) {
            res.status(400).json({ error: 'Usuário não encontrado' });
            return;
        }

        const user: Usuario = users[0];
        const isMatch = await bcrypt.compare(senha, user.senha_hash);
        if (!isMatch) {
            res.status(400).json({ error: 'Senha incorreta' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || "vaiCorinthians2025!",
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, user: { id: user.id, nome: user.nome, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};