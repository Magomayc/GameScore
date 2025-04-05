import style from "./Usuario.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function Usuario() {
    const navigate = useNavigate();
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    useEffect(() => {
        // Simulando usuário logado vindo do localStorage
        const usuarioSalvo = localStorage.getItem("usuarioLogado");
        if (usuarioSalvo) {
            setUsuarioLogado(JSON.parse(usuarioSalvo));
        } else {
            // Se não estiver logado, redireciona para login
            navigate("/login");
        }
    }, [navigate]);

    const handleEditar = () => {
        alert(`Editar dados de ${usuarioLogado.nome}`);
        // Aqui você pode navegar para uma página de edição ou abrir um modal
    };

    return (
        <div className={style.pagina_usuarios}>
            <div className={style.header}>
                <Button
                    variant="none"
                    className={style.botao_topo}
                    onClick={() => navigate("/menu")}
                >
                    Voltar ao Menu
                </Button>
            </div>

            <div className={style.usuarios_box}>
                <h2 className={style.titulo}>Dados do Usuário</h2>
                {usuarioLogado ? (
                    <div className={style.item}>
                        <div>
                            <h3>{usuarioLogado.nome}</h3>
                            <p>Email: {usuarioLogado.email}</p>
                            <p>Tipo: {usuarioLogado.tipo}</p>
                        </div>
                        <Button
                            variant="none"
                            className={style.botao_editar}
                            onClick={handleEditar}
                        >
                            Editar
                        </Button>
                    </div>
                ) : (
                    <p className={style.mensagem}>Carregando usuário...</p>
                )}
            </div>
        </div>
    );
}
