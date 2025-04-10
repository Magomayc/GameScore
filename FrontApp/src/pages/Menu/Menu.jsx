import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaUsers } from "react-icons/fa";
import style from "./Menu.module.css";
import Logo from "../../assets/GameScoreLogo.png";
import { JogoAPI } from "../../services/jogoAPI";
import { UsuarioJogoAPI } from "../../services/usuarioJogoAPI";

export function Menu() {
    const navigate = useNavigate();
    const [jogos, setJogos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [reacoes, setReacoes] = useState({});
    const [contagens, setContagens] = useState({});
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    useEffect(() => {
        async function carregarDados() {
            try {
                const [jogosData, associacoes] = await Promise.all([
                    JogoAPI.listarAsync(true),
                    UsuarioJogoAPI.listarAsync()
                ]);

                const jogosValidos = Array.isArray(jogosData) ? jogosData : [];
                setJogos(jogosValidos);

                const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
                setUsuarioLogado(usuario);

                const reacoesUsuario = {};
                const novaContagem = {};

                for (const jogo of jogosValidos) {
                    const associacoesDoJogo = associacoes.filter(a => a.jogoId === jogo.id);
                    novaContagem[jogo.id] = associacoesDoJogo.length;
                }

                for (const associacao of associacoes) {
                    if (associacao.usuarioId === usuario?.id) {
                        reacoesUsuario[associacao.jogoId] = "like";
                    }
                }

                setReacoes(reacoesUsuario);
                setContagens(novaContagem);
            } catch (error) {
                setErro("Erro ao carregar jogos.");
                console.error("Erro ao carregar jogos:", error);
            } finally {
                setCarregando(false);
            }
        }

        carregarDados();
    }, []);

    const sair = () => navigate("/login");

    const handleLikeClick = async (jogoId, event) => {
        event.stopPropagation();
        if (!usuarioLogado?.id) return;

        try {
            await UsuarioJogoAPI.associarAsync(usuarioLogado.id, jogoId);
            setReacoes((prev) => ({ ...prev, [jogoId]: "like" }));
            setContagens((prev) => ({
                ...prev,
                [jogoId]: (prev[jogoId] || 0) + 1
            }));
        } catch (error) {
            console.error("Erro ao curtir o jogo:", error);
        }
    };

    const handleDislikeClick = async (jogoId, event) => {
        event.stopPropagation();
        if (!usuarioLogado?.id) return;

        try {
            await UsuarioJogoAPI.removerAsync(usuarioLogado.id, jogoId);
            setReacoes((prev) => ({ ...prev, [jogoId]: "dislike" }));
            setContagens((prev) => ({
                ...prev,
                [jogoId]: Math.max((prev[jogoId] || 1) - 1, 0)
            }));
        } catch (error) {
            console.error("Erro ao descurtir o jogo:", error);
        }
    };

    return (
        <div className={style.pagina_menu}>
            <div className={style.header}>
                <div className={style.topo_esquerda}>
                    <div
                        className={style.icon_button}
                        onClick={() => navigate("/Usuario")}
                        title="Usuário"
                    >
                        <FaUser size={22} />
                    </div>
                </div>

                <div className={style.logo_container}>
                    <img src={Logo} className={style.logo} alt="Logo GameScore" />
                </div>

                <div className={style.topo_direita}>
                    <div
                        className={style.icon_button}
                        onClick={() => navigate("/usuarios")}
                        title="Usuários"
                    >
                        <FaUsers size={22} />
                    </div>
                    <div
                        className={style.icon_button}
                        onClick={sair}
                        title="Sair"
                    >
                        <FaSignOutAlt size={22} />
                    </div>
                </div>
            </div>

            <div className={style.menu_box}>
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
                                className={`${style.item_jogo} ${jogos.length === 1 ? style.item_jogo_unico : ""}`}
                                style={{ backgroundImage: `url(/assets/jogos/${jogo.id}.jpg)` }}
                                onClick={() => navigate(`/jogo/${jogo.id}`)}
                            >
                                <div className={style.info_jogo}>
                                    <h2 className={style.nome_jogo}>{jogo.nome}</h2>
                                    <p className={style.genero}>{jogo.genero}</p>

                                    <div className={style.botoes_reacoes}>
                                        <button
                                            className={`${style.botao_reacao} ${style.like} ${reacoes[jogo.id] === "like" ? style.likeClicked : ""}`}
                                            onClick={(event) => handleLikeClick(jogo.id, event)}
                                        >
                                            💚 <span>{contagens[jogo.id] || 0}</span>
                                        </button>
                                        <button
                                            className={`${style.botao_reacao} ${style.dislike} ${reacoes[jogo.id] === "dislike" ? style.dislikeClicked : ""}`}
                                            onClick={(event) => handleDislikeClick(jogo.id, event)}
                                        >
                                            ❤️
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
