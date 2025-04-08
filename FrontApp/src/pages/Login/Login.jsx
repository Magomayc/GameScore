import style from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { UsuarioAPI } from "../../services/usuarioAPI";
import logo from "../../assets/GameScoreLogo.png"; // ajuste o caminho se necessário

export function Login() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleLogin = async () => {
        setErro("");

        if (!usuario || !senha) {
            setErro("Preencha todos os campos.");
            return;
        }

        try {
            const response = await UsuarioAPI.loginAsync(usuario, senha);
            console.log("Resposta da API:", response);

            if (response && response.nome) {
                const usuarioLogado = {
                    id: response.id,
                    nome: response.nome,
                    email: response.email,
                    tipoUsuarioId: response.tipoUsuarioId
                };

                localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
                navigate("/menu");
            } else {
                setErro("Usuário ou senha inválidos.");
            }
        } catch (error) {
            console.error("Erro ao logar:", error);
            setErro("Erro ao tentar fazer login.");
        }
    };

    return (
        <div className={style.pagina_login}>
            <div className={style.login_box}>
                <img src={logo} alt="Logo GameScore" className={style.logo_login} />
                <Form className={style.formulario} onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}>
                    <Form.Group controlId="formUsuario">
                        <Form.Control
                            type="text"
                            placeholder="Usuário ou Email"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            className={style.input}
                        />
                    </Form.Group>

                    <Form.Group controlId="formSenha">
                        <Form.Control
                            type="password"
                            placeholder="Senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className={style.input}
                        />
                    </Form.Group>

                    {erro && <p className={style.mensagem_erro}>{erro}</p>}

                    <Button
                        variant="none"
                        className={style.botao_login}
                        type="submit"
                    >
                        Entrar
                    </Button>

                    <div className={style.registro_link}>
                        <span>Não tem uma conta?</span>
                        <button type="button" onClick={() => navigate("/novoUsuario")}>
                            Crie uma aqui
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
