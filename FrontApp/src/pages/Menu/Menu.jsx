import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import style from "./Menu.module.css";
import Logo from "../../assets/LogoPs.png";
import { JogoAPI } from "../../services/jogoAPI";
import { UsuarioJogoAPI } from "../../services/usuarioJogoAPI";

export function Menu() {
    const navigate = useNavigate();
    const [jogos, setJogos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [reacoes, setReacoes] = useState({}); // { jogoId: "like" | "dislike" }

    useEffect(() => {
        async function carregarJogos() {
            try {
                const dados = await JogoAPI.listarAsync(true);
                setJogos(Array.isArray(dados) ? dados : []);
            } catch (error) {
                setErro("Erro ao carregar jogos.");
                console.error("Erro ao carregar jogos:", error);
            } finally {
                setCarregando(false);
            }
        }

        carregarJogos();
    }, []);

    const irParaUsuarios = () => navigate("/usuario");
    const sair = () => navigate("/login");

    const handleLikeClick = async (jogoId, event) => {
        event.stopPropagation();

        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (!usuario || !usuario.id) {
            console.error("Usuário não logado.");
            return;
        }

        try {
            await UsuarioJogoAPI.associarAsync(usuario.id, jogoId);
            setReacoes((prev) => ({ ...prev, [jogoId]: "like" }));
        } catch (error) {
            console.error("Erro ao vincular jogo ao usuário:", error);
        }
    };

    const handleDislikeClick = (jogoId, event) => {
        event.stopPropagation();
        setReacoes((prev) => ({ ...prev, [jogoId]: "dislike" }));
    };

    return (
        <div className={style.pagina_menu}>
            <div className={style.header}>
                <div className={style.topo_direita}>
                    <Button className={style.botao_topo} onClick={irParaUsuarios}>
                        Usuários
                    </Button>
                    <Button className={style.botao_topo} onClick={sair}>
                        Sair
                    </Button>
                </div>
            </div>

            <div className={style.menu_box}>
                <img src={Logo} alt="Logo GameScore" className={style.logo} />

                {carregando ? (
                    <p className={style.mensagem}>Carregando jogos...</p>
                ) : erro ? (
                    <p className={style.erro}>{erro}</p>
                ) : jogos.length === 0 ? (
                    <p className={style.mensagem}>Nenhum jogo cadastrado.</p>
                ) : (
                    <ul className={style.lista_jogos}>
                        {jogos.map((jogo) => (
                            <li
                                key={jogo.id}
                                className={style.item_jogo}
                                style={{
                                    backgroundImage: `url(/assets/jogos/${jogo.id}.jpg)`,
                                }}
                                onClick={() => navigate(`/jogo/${jogo.id}`)}
                            >
                                <div className={style.info_jogo}>
                                    <div className={style.imagem_jogo}>
                                        {/* Placeholder para imagem extra se necessário */}
                                    </div>
                                    <h4>{jogo.nome}</h4>
                                    <p>{jogo.genero}</p>
                                    <div className={style.botoes_reacoes}>
                                        <button
                                            className={`${style.botao_reacao} ${style.like} ${
                                                reacoes[jogo.id] === "like" ? style.likeClicked : ""
                                            }`}
                                            onClick={(event) => handleLikeClick(jogo.id, event)}
                                        >
                                            💚 Like
                                        </button>
                                        <button
                                            className={`${style.botao_reacao} ${style.dislike} ${
                                                reacoes[jogo.id] === "dislike" ? style.dislikeClicked : ""
                                            }`}
                                            onClick={(event) => handleDislikeClick(jogo.id, event)}
                                        >
                                            ❤️ Dislike
                                        </button>
                                    </div>

                                    {reacoes[jogo.id] === "like" && (
                                        <p className={style.mensagem}>
                                            Você curtiu <strong>{jogo.nome}</strong>!
                                        </p>
                                    )}
                                    {reacoes[jogo.id] === "dislike" && (
                                        <p className={style.mensagem}>
                                            Você não curtiu <strong>{jogo.nome}</strong>.
                                        </p>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
