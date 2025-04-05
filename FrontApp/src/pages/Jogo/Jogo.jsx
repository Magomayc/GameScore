import { useState } from "react";
import style from "./Jogo.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function Jogo() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [comentario, setComentario] = useState("");
    const [comentarios, setComentarios] = useState([]);
    const [mostraInput, setMostraInput] = useState(false);

    const jogos = [
        {
            id: 1,
            nome: "The Witcher 3",
            genero: "RPG",
            avaliacao: 9.8,
            descricao: "A jornada de Geralt em um mundo sombrio e aberto, cheio de escolhas e consequências.",
        },
        {
            id: 2,
            nome: "God of War",
            genero: "Ação/Aventura",
            avaliacao: 9.5,
            descricao: "Kratos e seu filho embarcam numa jornada épica através da mitologia nórdica.",
        },
        {
            id: 3,
            nome: "Minecraft",
            genero: "Sandbox",
            avaliacao: 9.0,
            descricao: "Construa, explore e sobreviva em um mundo feito de blocos e possibilidades infinitas.",
        },
        {
            id: 4,
            nome: "Elden Ring",
            genero: "RPG de Ação",
            avaliacao: 9.7,
            descricao: "Explore um vasto mundo aberto e desafie chefes épicos em combates intensos.",
        },
        {
            id: 5,
            nome: "FIFA 24",
            genero: "Esportes",
            avaliacao: 8.3,
            descricao: "A experiência mais realista de futebol com times e modos atualizados.",
        },
    ];

    const jogoSelecionado = jogos.find((jogo) => jogo.id === Number(id));

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

            {jogoSelecionado ? (
                <div className={style.jogo_box}>
                    <h2 className={style.titulo}>{jogoSelecionado.nome}</h2>
                    <p><strong>Gênero:</strong> {jogoSelecionado.genero}</p>
                    <p><strong>Avaliação:</strong> {jogoSelecionado.avaliacao}</p>
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
