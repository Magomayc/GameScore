import style from "./NovoUsuario.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function NovoUsuario() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const handleCadastro = () => {
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        // Aqui você pode fazer a chamada para API de cadastro
        console.log("Cadastrando:", { usuario, email, senha });

        // Após cadastro, redireciona para login
        navigate("/login");
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
                        onClick={() => navigate("/login")}
                    >
                        Cadastrar
                    </Button>
                </Form>
            </div>
        </div>
    );
}