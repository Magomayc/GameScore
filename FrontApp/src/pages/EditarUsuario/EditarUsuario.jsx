import { useLocation, useNavigate } from 'react-router-dom';
import style from './EditarUsuario.module.css';
import { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import { UsuarioAPI } from '../../services/usuarioAPI';

export function EditarUsuario() {
    const location = useLocation();
    const navigate = useNavigate();

    const [id, setId] = useState(null);
    const [senhaAntiga, setSenhaAntiga] = useState("");
    const [novaSenha, setNovaSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");

    useEffect(() => {
        if (location.state) {
            if (typeof location.state === "number") {
                setId(location.state);
            } else if (location.state.id) {
                setId(location.state.id);
            } else {
                navigate("/usuarios");
            }
        } else {
            navigate("/usuarios");
        }
    }, [location, navigate]);

    const exibirMensagem = (texto, tipo) => {
        setMensagem(texto);
        setTipoMensagem(tipo);
        setTimeout(() => {
            setMensagem("");
            setTipoMensagem("");
        }, 4000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!senhaAntiga || !novaSenha || !confirmarSenha) {
            exibirMensagem("Preencha todos os campos.", "erro");
            return;
        }
    
        if (novaSenha !== confirmarSenha) {
            exibirMensagem("As senhas não coincidem.", "erro");
            return;
        }
    
        if (senhaAntiga === novaSenha) {
            exibirMensagem("A nova senha não pode ser igual à anterior.", "erro");
            return;
        }
    
        try {
            await UsuarioAPI.atualizarSenhaAsync(id, novaSenha, senhaAntiga);
            exibirMensagem("Senha atualizada com sucesso!", "sucesso");
    
            setSenhaAntiga("");
            setNovaSenha("");
            setConfirmarSenha("");
        } catch (error) {
            console.error("Erro ao atualizar senha:", error);
    
            const mensagemErro = 
                error?.response?.data?.message || 
                error?.response?.data ||
                error.message ||
                "Erro ao atualizar senha. Tente novamente.";
    
         
            if (mensagemErro.toLowerCase().includes("senha atual")) {
                exibirMensagem("Senha atual incorreta.", "erro");
            } else if (mensagemErro.toLowerCase().includes("fraca")) {
                exibirMensagem("A nova senha é muito fraca. Escolha uma mais segura.", "erro");
            } else {
                exibirMensagem(mensagemErro, "erro");
            }
        }
    };

    const camposPreenchidos = senhaAntiga && novaSenha && confirmarSenha;

    return (
        <div className={style.pagina_editar}>
            <div className={style.editar_box}>
                <h3 className={style.titulo}>Alterar Senha</h3>

                {mensagem && (
                    <div className={tipoMensagem === "sucesso" ? style.mensagem_sucesso : style.mensagem_erro}>
                        {mensagem}
                    </div>
                )}

                <Form onSubmit={handleSubmit} className={style.formulario}>
                    <Form.Control
                        type="password"
                        placeholder="Senha atual"
                        className={style.input}
                        value={senhaAntiga}
                        onChange={(e) => setSenhaAntiga(e.target.value)}
                    />

                    <Form.Control
                        type="password"
                        placeholder="Nova senha"
                        className={style.input}
                        value={novaSenha}
                        onChange={(e) => setNovaSenha(e.target.value)}
                    />

                    <Form.Control
                        type="password"
                        placeholder="Confirmar nova senha"
                        className={style.input}
                        value={confirmarSenha}
                        onChange={(e) => setConfirmarSenha(e.target.value)}
                    />

                    <div className={style.botoes}>
                        <button 
                            type="submit" 
                            className={style.botao_salvar}
                            disabled={!camposPreenchidos}
                        >
                            Salvar
                        </button>
                        <button
                            type="button"
                            className={style.botao_cancelar}
                            onClick={() => navigate('/usuario')}
                        >
                            Cancelar
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}