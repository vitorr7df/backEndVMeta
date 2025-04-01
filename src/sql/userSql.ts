import pool from '../config/db';
import { Usuario } from '../interfaces/userInterfaces';

export const getUserByEmail = async (email: string): Promise<Usuario[]> => {
    const result = await pool.query('SELECT * FROM usuarios WHERE email LIKE $1', [email]);
    return result.rows;
};

export const createUserQuery = async (nome: string, email: string, senha_hash: string): Promise<Usuario> => {
    const result = await pool.query(
        'INSERT INTO usuarios (nome, email, senha_hash) VALUES ($1, $2, $3) RETURNING id, nome, email',
        [nome, email, senha_hash]
    );
    return result.rows[0];
};

export const updateUserQuery = async (id: string, nome: string, email: string): Promise<void> => {
    await pool.query('UPDATE usuarios SET nome = $1, email = $2 WHERE id = $3', [nome, email, id]);
};

export const deleteUserQuery = async (id: string): Promise<void> => {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
};