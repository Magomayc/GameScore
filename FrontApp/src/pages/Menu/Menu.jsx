import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { FaUser, FaSignOutAlt, FaUsers } from "react-icons/fa";
import style from "./Menu.module.css";
import Logo from "../../assets/LogoPs.png";
import { JogoAPI } from "../../services/jogoAPI";
import { UsuarioJogoAPI } from "../../services/usuarioJogoAPI";

export function Menu() {
    const navigate = useNavigate();
    const [jogos, setJogos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [reacoes, setReacoes] = useState({});
    const [curtidas, setCurtidas] = useState({});
    const [deslikes, setDeslikes] = useState({});
    const [usuarioLogado, setUsuarioLogado] = useState(null);

    useEffect(() => {
        async function carregarDados() {
            try {
                const [jogosData, associacoes] = await Promise.all([
                    JogoAPI.listarAsync(true),
                    UsuarioJogoAPI.listarAsync()
                ]);

                setJogos(Array.isArray(jogosData) ? jogosData : []);
                
                const contagemCurtidas = {};
                const contagemDeslikes = {};

                for (const jogo of jogosData) {
                    contagemCurtidas[jogo.id] = 0;
                    contagemDeslikes[jogo.id] = 0;
                }

                for (const associacao of associacoes) {
                    const idJogo = associacao.jogoId;
                    contagemCurtidas[idJogo] = (contagemCurtidas[idJogo] || 0) + 1;
                }

                setCurtidas(contagemCurtidas);
                setDeslikes(contagemDeslikes);
            } catch (error) {
                setErro("Erro ao carregar jogos.");
                console.error("Erro ao carregar jogos:", error);
            } finally {
                setCarregando(false);
            }
        }

        // Carregar dados do usuário logado
        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        setUsuarioLogado(usuario);

        carregarDados();
    }, []);

    const irParaUsuarios = () => navigate("/usuario");
    const irParaPerfil = () => navigate("/perfil");
    const sair = () => navigate("/login");

    const handleLikeClick = async (jogoId, event) => {
        event.stopPropagation();

        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (!usuario?.id) {
            console.error("Usuário não logado.");
            return;
        }

        try {
            await UsuarioJogoAPI.associarAsync(usuario.id, jogoId);
            setReacoes((prev) => ({ ...prev, [jogoId]: "like" }));
            setCurtidas((prev) => ({ ...prev, [jogoId]: (prev[jogoId] || 0) + 1 }));
            setDeslikes((prev) => ({ ...prev, [jogoId]: Math.max((prev[jogoId] || 0) - 1, 0) }));
        } catch (error) {
            console.error("Erro ao vincular jogo ao usuário:", error);
        }
    };

    const handleDislikeClick = async (jogoId, event) => {
        event.stopPropagation();

        const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
        if (!usuario?.id) {
            console.error("Usuário não logado.");
            return;
        }

        try {
            await UsuarioJogoAPI.removerAsync(usuario.id, jogoId);
            setReacoes((prev) => ({ ...prev, [jogoId]: "dislike" }));
            setDeslikes((prev) => ({ ...prev, [jogoId]: (prev[jogoId] || 0) + 1 }));
            setCurtidas((prev) => ({ ...prev, [jogoId]: Math.max((prev[jogoId] || 1) - 1, 0) }));
        } catch (error) {
            console.error("Erro ao remover jogo do usuário:", error);
        }
    };

    const obterPrimeiraLetra = (nome) => {
        return nome ? nome.charAt(0).toUpperCase() : "";
    };

    return (
        <div className={style.pagina_menu}>
            <div className={style.header}>
                <div className={style.topo_direita}>
                    {/* Botão de Usuários com ícone */}
                    <div
                        className={style.usuario_ativo}
                        onClick={() => navigate(`/usuario`)}
                        title="Ir para usuários"
                    >
                        <FaUser size={24} /> {/* Ícone de usuário */}
                    </div>

                    {/* Botão de Perfil com ícone */}
                    <div
                        className={style.usuario_ativo}
                        onClick={() => navigate(`/usuarios`)}
                        title="Usuários"
                    >
                        <FaUsers size={24} /> {/* Ícone de perfil */}
                    </div>

                    {/* Botão de Sair com ícone */}
                    <Button className={style.botao_topo} onClick={sair} title="Sair">
                        <FaSignOutAlt size={18} /> {/* Ícone de sair */}
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
                                style={{ backgroundImage: `url(/assets/jogos/${jogo.id}.jpg)` }}
                                onClick={() => navigate(`/jogo/${jogo.id}`)}
                            >
                                <div className={style.info_jogo}>
                                    <div className={style.imagem_jogo}></div>
                                    <h4>{jogo.nome}</h4>
                                    <p>{jogo.genero}</p>
                                    <p>Curtidas: {curtidas[jogo.id] || 0}</p>

                                    <div className={style.botoes_reacoes}>
                                        <button
                                            className={`${style.botao_reacao} ${style.like} ${reacoes[jogo.id] === "like" ? style.likeClicked : ""}`}
                                            onClick={(event) => handleLikeClick(jogo.id, event)}
                                        >
                                            💚 {curtidas[jogo.id] || 0}
                                        </button>

                                        <button
                                            className={`${style.botao_reacao} ${style.dislike} ${reacoes[jogo.id] === "dislike" ? style.dislikeClicked : ""}`}
                                            onClick={(event) => handleDislikeClick(jogo.id, event)}
                                        >
                                            ❤️ {deslikes[jogo.id] || 0}
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
