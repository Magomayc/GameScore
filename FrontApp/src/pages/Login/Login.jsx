import style from "./Login.module.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function Login() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const handleLogin = () => {
        console.log("Usuário:", usuario, "Senha:", senha);
        navigate(""); // redirecionar após login
    };

    return (
        <div className={style.pagina_login}>
            <div className={style.login_box}>
                <h2 className={style.titulo}>GameScore</h2>
                <Form className={style.formulario}>
                    <Form.Group controlId="formUsuario">
                        <Form.Control
                            type="text"
                            placeholder="Usuário"
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

                    <Button
                        variant="none"
                        className={style.botao_login}
                        onClick={handleLogin}
                    >
                        Entrar
                    </Button>

                    <div className={style.registro_link}>
                        <span>Não tem uma conta?</span>
                        <button onClick={() => navigate("/novoUsuario")}>
                            Crie uma aqui
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
}