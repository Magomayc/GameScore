import { HTTPClient } from "./client";

export const ComentarioAPI = {
    async listarPorJogoAsync(jogoId) {
        try {
            const response = await HTTPClient.get(`/Comentario/ListarPorJogo/${jogoId}`);
            return response.data; // Lista de ComentarioResposta
        } catch (error) {
            console.error("Erro ao listar comentários do jogo:", error.response?.data || error.message);
            throw error;
        }
    },

    async criarAsync(usuarioId, jogoId, texto) {
        try {
            const requisicao = {
                usuarioId: usuarioId,
                jogoId: jogoId,
                texto: texto
            };
            const response = await HTTPClient.post(`/Comentario/Criar`, requisicao);
            return response.data; 
        } catch (error) {
            console.error("Erro ao criar comentário:", error.response?.data || error.message);
            throw error;
        }
    }
};
