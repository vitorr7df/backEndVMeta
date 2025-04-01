import pool from "./src/config/db";

const testDBConnection = async () => {
    try {
        const client = await pool.connect();
        console.log("✅ Conexão bem-sucedida com o banco de dados!");
        client.release();
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco:", error);
    }
};

testDBConnection();
