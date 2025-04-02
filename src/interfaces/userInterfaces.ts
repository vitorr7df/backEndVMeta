export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha_hash: string;
    criado_em: string;
}

export interface TokenPayload {
    id: number;
}

export interface LoginResponse {
    token: string;
    user: { id: number; nome: string; email: string };
}
