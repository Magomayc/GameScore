import style from "./NovoUsuario.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UsuarioAPI } from "../../services/usuarioAPI";

export function NovoUsuario() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

const handleCadastro = async () => {
    setMensagem("");
    setErro("");

    if (!usuario || !email || !senha || !confirmarSenha) {
        setErro("Preencha todos os campos.");
        return;
    }

    if (!email.includes("@")) {
        setErro("Email inválido. Deve conter '@'.");
        return;
    }

    if (senha !== confirmarSenha) {
        setErro("As senhas não coincidem.");
        return;
    }

    try {
        const tipoUsuarioId = 2;
        await UsuarioAPI.criarAsync(usuario, email, senha, tipoUsuarioId);
        setMensagem("Usuário cadastrado com sucesso!");
        setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
        setErro("Erro ao cadastrar usuário.");
    }
};

    return (
        <div className={style.pagina_cadastro}>
            <div className={style.cadastro_box}>
                <h2 className={style.titulo}>Criar Conta</h2>
                <Form className={style.formulario}>
                    <Form.Group>
                        <Form.Control
                            type="text"
                            placeholder="Nome de usuário"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className={style.input}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={style.input}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className={style.input}
                        />
                    </Form.Group>

                    <Form.Group>
                        <Form.Control
                            type="password"
                            placeholder="Confirmar senha"
                            value={confirmarSenha}
                            onChange={(e) => setConfirmarSenha(e.target.value)}
                            className={style.input}
                        />
                    </Form.Group>

                    <Button
                        variant="none"
                        className={style.botao_cadastro}
                        onClick={handleCadastro}
                    >
                        Cadastrar
                    </Button>

                    <div className={style.login_link}>
                        <span>Já tem uma conta?</span>
                        <button onClick={() => navigate("/login")}>
                            Fazer login
                        </button>
                    </div>
                </Form>
            </div>

            {mensagem && <div className={style.mensagem_sucesso}>{mensagem}</div>}
            {erro && <div className={style.mensagem_erro}>{erro}</div>}
        </div>
    );
}
