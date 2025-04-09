import { useEffect, useState } from "react";
import style from "./Jogos.module.css";
import { JogoAPI } from "../../services/jogoAPI";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

export function Jogos() {
    const [jogos, setJogos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const navigate = useNavigate();

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

    const excluirJogo = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este jogo?")) {
            try {
                await JogoAPI.deletarAsync(id);
                setJogos(jogos.filter(j => j.id !== id));
            } catch (error) {
                alert("Erro ao excluir jogo.");
                console.error("Erro ao excluir jogo:", error);
            }
        }
    };

    const editarJogo = (id) => {
        navigate("/editarJogo", { state: { id } });
    };

    return (
        <div className={style.pagina_jogos}>
            <div className={style.header}>
                <button className={style.botao_topo} onClick={() => navigate("/usuario")}>
                    Voltar
                </button>
            </div>

            <div className={style.jogos_box}>
                <h2 className={style.titulo}>Lista de Jogos</h2>

                {carregando ? (
                    <p className={style.mensagem}>Carregando jogos...</p>
                ) : erro ? (
                    <p className={style.erro}>{erro}</p>
                ) : jogos.length === 0 ? (
                    <p className={style.mensagem}>Nenhum jogo encontrado.</p>
                ) : (
                    <>
                        <ul className={style.lista_jogos}>
                            {jogos.map((jogo) => (
                                <li key={jogo.id} className={style.item_jogo}>
                                    <div className={style.row_jogo}>
                                        <div className={style.dados_jogo}>
                                            <p><strong>Nome:</strong> {jogo.nome}</p>
                                            <p><strong>Gênero:</strong> {jogo.genero}</p>
                                            <p><strong>Descrição:</strong> {jogo.descricao}</p>
                                        </div>
                                        <div className={style.botoes_jogo}>
                                            <button
                                                className={style.botao_editar}
                                                onClick={() => editarJogo(jogo.id)}
                                                title="Editar"
                                            >
                                                <Pencil size={20} />
                                            </button>
                                            <button
                                                className={style.botao_excluir}
                                                onClick={() => excluirJogo(jogo.id)}
                                                title="Excluir"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className={style.rodape}>
                            <button
                                className={style.botao_criar}
                                onClick={() => navigate("/novoJogo")}
                            >
                                Novo Jogo
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
