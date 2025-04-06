import { useState, useEffect } from "react";
import style from "./Jogo.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { JogoAPI } from "../../services/jogoAPI"; // Certifique-se de importar corretamente sua API

export function Jogo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [comentario, setComentario] = useState("");
    const [comentarios, setComentarios] = useState([]);
    const [mostraInput, setMostraInput] = useState(false);
    const [jogoSelecionado, setJogoSelecionado] = useState(null);
    const [erro, setErro] = useState(null);

    // Carregar detalhes do jogo ao montar o componente
    useEffect(() => {
        const carregarJogo = async () => {
            try {
                const jogo = await JogoAPI.obterAsync(id); // Usando o método obtido da API
                setJogoSelecionado(jogo);
            } catch (error) {
                setErro("Erro ao carregar os detalhes do jogo.");
                console.error("Erro ao carregar o jogo:", error);
            }
        };

        carregarJogo();
    }, [id]);

    const handleAdicionarComentario = () => {
        if (comentario.trim() !== "") {
            setComentarios([...comentarios, comentario]);
            setComentario("");
            setMostraInput(false);
        }
    };

    return (
        <div className={style.pagina_jogos}>
            <div className={style.header}>
                <button className={style.botao_voltar} onClick={() => navigate("/menu")}>
                    <ArrowLeft size={20} />
                    <span>Menu</span>
                </button>
            </div>

            {erro && <p className={style.erro}>{erro}</p>} {/* Exibindo erro se houver */}

            {jogoSelecionado ? (
                <div className={style.jogo_box}>
                    <h2 className={style.titulo}>{jogoSelecionado.nome}</h2>

                    {/* Exibição do jogo */}
                    <div className={style.imagem_jogo}>
                        <img src={jogoSelecionado.imagemUrl} alt={jogoSelecionado.nome} className={style.imagem} />
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
                        <div style={{ marginTop: "30px", color: "white" }}>
                            <h3>Comentários:</h3>
                            <ul>
                                {comentarios.map((c, index) => (
                                    <li key={index} style={{ marginBottom: "10px" }}>{c}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <p className={style.nao_encontrado}>Jogo não encontrado.</p>
            )}
        </div>
    );
}
