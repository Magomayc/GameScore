import { HTTPClient } from "./client";

export const ComentarioAPI = {
    async listarPorJogoAsync(jogoId) {
        try {
            const response = await HTTPClient.get(`/Comentario/ListarPorJogo/${jogoId}`);
            return response.data; 
        } catch (error) {
            console.error("Erro ao listar comentários do jogo:", error.response?.data || error.message);
            throw error;
        }
    },
    async criarAsync(usuarioId, jogoId, texto) {
        try {
            const requisicao = {
                usuarioId,
                jogoId,
                texto
            };
            const response = await HTTPClient.post(`/Comentario/Criar`, requisicao);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar comentário:", error.response?.data || error.message);
            throw error;
        }
    },
    async atualizarAsync(id, texto) {
        try {
            const requisicao = { texto };
            await HTTPClient.put(`/Comentario/Atualizar/${id}`, requisicao);
        } catch (error) {
            console.error("Erro ao atualizar comentário:", error.response?.data || error.message);
            throw error;
        }
    },

    async removerAsync(id) {
        try {
            await HTTPClient.delete(`/Comentario/Remover/${id}`);
        } catch (error) {
            console.error("Erro ao remover comentário:", error.response?.data || error.message);
            throw error;
        }
    }
};
