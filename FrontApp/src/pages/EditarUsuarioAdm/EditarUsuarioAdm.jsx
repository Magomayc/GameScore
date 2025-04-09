import { useLocation, useNavigate } from 'react-router-dom';
import style from './EditarUsuarioAdm.module.css';
import { useState, useEffect } from 'react';
import Form from "react-bootstrap/Form";
import { UsuarioAPI } from '../../services/usuarioAPI';

export function EditarUsuarioAdm() {
    const location = useLocation();
    const navigate = useNavigate();

    const [id, setId] = useState(null);
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [tipoUsuarioId, setTipoUsuarioId] = useState("");

    const [mensagem, setMensagem] = useState("");
    const [tipoMensagem, setTipoMensagem] = useState("");

    useEffect(() => {
        let usuarioId = null;

        if (location?.state && typeof location.state === 'object') {
            usuarioId = location.state.id;
        } else if (typeof location?.state === 'number') {
            usuarioId = location.state;
        }

        console.log("ID recebido na rota:", usuarioId);

        if (usuarioId) {
            setId(usuarioId);
            carregarUsuario(usuarioId);
        } else {
            exibirMensagem("ID do usuário não encontrado. Verifique a navegação.", "erro");
        }
    }, [location]);

    const carregarUsuario = async (usuarioId) => {
        try {
            const usuario = await UsuarioAPI.obterAsync(usuarioId);
            console.log("Dados do usuário recebidos:", usuario);
            setNome(usuario.nome);
            setEmail(usuario.email);
            setTipoUsuarioId(String(usuario.tipoUsuarioId));
        } catch (error) {
            console.error("Erro ao carregar usuário:", error);
            exibirMensagem("Erro ao carregar dados do usuário.", "erro");
        }
    };

    const exibirMensagem = (texto, tipo) => {
        setMensagem(texto);
        setTipoMensagem(tipo);
        setTimeout(() => {
            setMensagem("");
            setTipoMensagem("");
        }, 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nome || !email || !tipoUsuarioId) {
            exibirMensagem("Preencha todos os campos.", "erro");
            return;
        }

        try {
            await UsuarioAPI.atualizarAsync(id, nome, email, tipoUsuarioId);
            exibirMensagem("Usuário atualizado com sucesso!", "sucesso");

            setTimeout(() => {
                navigate("/usuariosAdm");
            }, 1500);
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            const mensagemErro = 
                error?.response?.data?.message ||
                error?.response?.data ||
                error.message ||
                "Erro ao atualizar usuário. Tente novamente.";
            exibirMensagem(mensagemErro, "erro");
        }
    };

    return (
        <div className={style.pagina_editar}>
            <div className={style.editar_box}>
                <h3 className={style.titulo}>Editar Usuário</h3>

                {mensagem && (
                    <div className={tipoMensagem === "sucesso" ? style.mensagem_sucesso : style.mensagem_erro}>
                        {mensagem}
                    </div>
                )}

                <Form onSubmit={handleSubmit} className={style.formulario}>
                    <Form.Control
                        type="text"
                        placeholder="Nome"
                        className={style.input}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        disabled={!id}
                    />

                    <Form.Control
                        type="email"
                        placeholder="Email"
                        className={style.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={!id}
                    />

                    <Form.Select
                        className={style.input}
                        value={tipoUsuarioId}
                        onChange={(e) => setTipoUsuarioId(e.target.value)}
                        disabled={!id}
                    >
                        <option value="">Selecione o tipo de usuário</option>
                        <option value="1">Administrador</option>
                        <option value="2">Usuário</option>
                    </Form.Select>

                    <div className={style.botoes}>
                        <button type="submit" className={style.botao_salvar} disabled={!id}>Salvar</button>
                        <button type="button" className={style.botao_cancelar} onClick={() => navigate("/usuariosAdm")}>
                            Cancelar
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
