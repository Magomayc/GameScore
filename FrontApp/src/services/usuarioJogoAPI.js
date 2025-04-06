import { HTTPClient } from "./client";

export const UsuarioJogoAPI = {
    async associarAsync(usuarioId, jogoId) {
        try {
            const requisicao = {
                usuarioId: usuarioId,
                jogoId: jogoId
            };
            const response = await HTTPClient.post("/UsuarioJogo/Associar", requisicao);
            return response.data;
        } catch (error) {
            console.error("Erro ao associar jogo ao usuário: ", error);
            throw error;
        }
    },

    async listarAsync() {
        try {
            const response = await HTTPClient.get("/UsuarioJogo/Listar");
            return response.data;
        } catch (error) {
            console.error("Erro ao listar jogos de usuários: ", error);
            throw error;
        }
    },

    async removerAsync(usuarioId, jogoId) {
        try {
            const response = await HTTPClient.delete(`/UsuarioJogo/Remover/${usuarioId}/${jogoId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao remover jogo do usuário: ", error);
            throw error;
        }
    }
};
