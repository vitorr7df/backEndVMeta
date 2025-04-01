export interface Usuario {
    id: string;
    nome: string;
    email: string;
    senha_hash: string;
    criado_em: string;
}

export interface TokenPayload {
    id: string;
}

export interface LoginResponse {
    token: string;
    user: { id: string; nome: string; email: string };
}
