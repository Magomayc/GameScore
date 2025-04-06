import { HTTPClient } from "./client";

export const UsuarioAPI = {
    async obterAsync(usuarioId){
        try {
            const response = await HTTPClient.get(`/Usuario/Obter/${usuarioId}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter usuário: ", error);
            throw error;
        }
    },
    async listarAsync(ativo){
        try {
            const response = await HTTPClient.get(`/Usuario/Listar?ativo=${ativo}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar usuários: ", error);
            throw error;
        }
    },
    async listarTiposUsuarioAsync() {
        try {
            const response = await HTTPClient.get("/Usuario/ListarTiposUsuario");
            return response.data;
        } catch (error) {
            console.log("Erro ao listar tipos de usuário: ", error);
            throw error;
        }
    },
    async alterarSenhaAsync(id, senha, senhaAntiga){
        try {
            const usuarioAlterarSenha = {
                ID: id,
                Senha: senha,
                SenhaAntiga: senhaAntiga
            };
            const response = await HTTPClient.put(`/Usuario/AlterarSenha`, usuarioAlterarSenha);
            return response.data;
        } catch (error) {
            console.error("Erro ao alterar senha do usuário: ", error);
            throw error;
        }
    },
    async criarAsync(nome, email, senha, tipoUsuarioId) {
        try {
            const usuarioCriar = {
                Nome: nome,
                Email: email,
                Senha: senha,
                TipoUsuarioId: tipoUsuarioId
            };
            const response = await HTTPClient.post("/Usuario/Criar", usuarioCriar);
            return response.data;
        } catch (error) {
            console.error("Erro ao criar usuário: ", error);
            throw error;
        }
    },
    async atualizarAsync(id, nome, email, tipoUsuarioId){
        try{
            const usuarioAtualizar = {
                ID: id,
                Nome: nome,
                Email: email,
                TipoUsuarioId: tipoUsuarioId
            };
            const response = await HTTPClient.put(`/Usuario/Atualizar`, usuarioAtualizar);
            return response.data;
        }catch{
            console.error("Erro ao autualizar usuário: ", error);
            throw erro;
        }
    },
    async restauraAsync(usuarioID){
        try {
            const response = await HTTPClient.put(`/Usuario/Restaurar/${usuarioID}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao restaurar usuário: ", error);
            throw error;
        }
    },

    async deletarAsync(usuarioID){
        try {
            const response = await HTTPClient.delete(`/Usuario/Deletar/${usuarioID}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw error;
        }
    },
    async loginAsync(email, senha) {
        try {
            const response = await HTTPClient.post("/Usuario/Login", {
                email: email,
                senha: senha
            });
            return response.data;
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            throw error;
        }
    }
    

}