import { HTTPClient } from "./client";

export const URL_BASE_IMAGEM = "https://cdn.corenexis.com/view/?img=m/ap11/";

export const JogoAPI = {
    async obterAsync(jogoId) {
        try {
            const response = await HTTPClient.get(`/Jogo/Obter/${jogoId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter jogo:", error);
            throw error;
        }
    },

    async criarAsync(nome, genero, descricao, imagemNomeArquivo) {
        try {
            const novoJogo = { nome, genero, descricao, imagem: imagemNomeArquivo };
            const response = await HTTPClient.post(`/Jogo/Criar`, novoJogo);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar jogo:", error);
            throw error;
        }
    },

    async atualizarAsync(id, nome, genero, descricao, imagemNomeArquivo) {
        try {
            const jogoAtualizado = { id, nome, genero, descricao, imagem: imagemNomeArquivo };
            const response = await HTTPClient.put(`/Jogo/Atualizar`, jogoAtualizado);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar jogo:", error);
            throw error;
        }
    },

    async deletarAsync(jogoId) {
        try {
            const response = await HTTPClient.delete(`/Jogo/Deletar/${jogoId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao deletar jogo:", error);
            throw error;
        }
    },

    async restaurarAsync(jogoId) {
        try {
            const response = await HTTPClient.put(`/Jogo/Restaurar/${jogoId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao restaurar jogo:", error);
            throw error;
        }
    },

    async listarAsync(ativo = true, query = "") {
        try {
            const response = await HTTPClient.get(`/Jogo/Listar?ativo=${ativo}&query=${encodeURIComponent(query)}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar jogos:", error.response?.data || error.message);
            throw error;
        }
    }
};
