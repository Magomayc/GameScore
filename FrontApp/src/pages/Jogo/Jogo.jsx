import { useState, useEffect } from "react";
import style from "./Jogo.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { JogoAPI } from "../../services/jogoAPI";
import { ComentarioAPI } from "../../services/comentarioAPI";

export function Jogo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [comentario, setComentario] = useState("");
    const [comentarios, setComentarios] = useState([]);
    const [mostraInput, setMostraInput] = useState(false);
    const [jogoSelecionado, setJogoSelecionado] = useState(null);
    const [erro, setErro] = useState(null);
    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [comentarioEditando, setComentarioEditando] = useState(null); 
    const [comentarioTextoEditado, setComentarioTextoEditado] = useState(""); 

    useEffect(() => {
        const carregarDados = async () => {
            try {
                const usuarioSalvo = localStorage.getItem("usuarioLogado");
                if (!usuarioSalvo) {
                    navigate("/login");
                    return;
                }
                const usuario = JSON.parse(usuarioSalvo);
                setUsuarioLogado(usuario);

                const jogo = await JogoAPI.obterAsync(id);
                setJogoSelecionado(jogo);

                const comentarios = await ComentarioAPI.listarPorJogoAsync(id);
                setComentarios(comentarios);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                setErro("Erro ao carregar os detalhes do jogo.");
            }
        };

        carregarDados();
    }, [id, navigate]);

    const handleAdicionarComentario = async () => {
        if (comentario.trim() === "" || !usuarioLogado) return;

        try {
            await ComentarioAPI.criarAsync(usuarioLogado.id, id, comentario);
            const comentariosAtualizados = await ComentarioAPI.listarPorJogoAsync(id);
            setComentarios(comentariosAtualizados);
            setComentario("");
            setMostraInput(false);
        } catch (error) {
            console.error("Erro ao adicionar comentário:", error);
            setErro("Erro ao adicionar comentário.");
        }
    };

    const handleEditarComentario = (comentario) => {
        setComentarioEditando(comentario);
        setComentarioTextoEditado(comentario.texto);
    };

    const handleSalvarEdicao = async () => {
        if (comentarioTextoEditado.trim() === "") return;

        try {
            await ComentarioAPI.atualizarAsync(comentarioEditando.id, comentarioTextoEditado);
            const comentariosAtualizados = await ComentarioAPI.listarPorJogoAsync(id);
            setComentarios(comentariosAtualizados);
            setComentarioEditando(null);
            setComentarioTextoEditado("");
        } catch (error) {
            console.error("Erro ao editar comentário:", error);
            setErro("Erro ao editar comentário.");
        }
    };

    const handleApagarComentario = async (comentarioId) => {
        try {
            await ComentarioAPI.removerAsync(comentarioId);
            const comentariosAtualizados = await ComentarioAPI.listarPorJogoAsync(id);
            setComentarios(comentariosAtualizados);
        } catch (error) {
            console.error("Erro ao apagar comentário:", error);
            setErro("Erro ao apagar comentário.");
        }
    };

    return (
        <div className={style.pagina_jogos}>
            <div className={style.header}>
                <button className={style.botao_voltar} onClick={() => navigate("/menu")}>
                    <ArrowLeft size={20} />
                    Menu
                </button>
            </div>

            {erro && <p className={style.erro}>{erro}</p>}

            {jogoSelecionado ? (
                <div className={style.jogo_box}>
                    <h2 className={style.titulo}>{jogoSelecionado.nome}</h2>

                    <div className={style.imagem_jogo}>
                        <img
                            src={jogoSelecionado.imagemUrl}
                            alt={jogoSelecionado.nome}
                            className={style.imagem}
                        />
                    </div>

                    <p><strong>Gênero:</strong> {jogoSelecionado.genero}</p>
                    <p><strong>Descrição:</strong> {jogoSelecionado.descricao}</p>

                    <button
                        className={style.botao_voltar}
                        onClick={() => setMostraInput(!mostraInput)}
                        style={{ marginTop: "20px" }}
                    >
                        {mostraInput ? "Cancelar" : "Adicionar Comentário"}
                    </button>

                    {mostraInput && (
                        <div style={{ marginTop: "10px" }}>
                            <textarea
                                className={style.textarea}
                                placeholder="Digite seu comentário..."
                                value={comentario}
                                onChange={(e) => setComentario(e.target.value)}
                            />
                            <button
                                className={style.botao_voltar}
                                onClick={handleAdicionarComentario}
                                style={{ marginTop: "10px" }}
                            >
                                Enviar Comentário
                            </button>
                        </div>
                    )}

                    {comentarios.length > 0 && (
                        <div className={style.comentarios_container}>
                            <h3 className={style.comentarios_titulo}>Comentários:</h3>
                            {comentarios.map((comentario, index) => (
                                <div key={index} className={style.comentario_card}>
                                    <div className={style.comentario_topo}>
                                        <span className={style.comentario_usuario}>{comentario.usuarioNome}</span>
                                        <span className={style.comentario_data}>
                                            {new Date(comentario.dataCriacao).toLocaleDateString("pt-BR")}
                                        </span>
                                        {usuarioLogado && usuarioLogado.id === comentario.usuarioId && ( 
                                            <div className={style.botao_acao}>
                                                <button
                                                    className={style.botao_editar}
                                                    onClick={() => handleEditarComentario(comentario)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className={style.botao_apagar}
                                                    onClick={() => handleApagarComentario(comentario.id)}
                                                >
                                                    Apagar
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    {comentarioEditando && comentarioEditando.id === comentario.id ? (
                                        <div className={style.editar_comentario}>
                                            <textarea
                                                value={comentarioTextoEditado}
                                                onChange={(e) => setComentarioTextoEditado(e.target.value)}
                                                className={style.textarea}
                                            />
                                            <button
                                                className={style.botao_salvar}
                                                onClick={handleSalvarEdicao}
                                            >
                                                Salvar
                                            </button>
                                            <button
                                                className={style.botao_cancelar}
                                                onClick={() => setComentarioEditando(null)}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    ) : (
                                        <p className={style.comentario_texto}>{comentario.texto}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <p className={style.nao_encontrado}>Jogo não encontrado.</p>
            )}
        </div>
    );
}
