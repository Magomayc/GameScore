import { useEffect, useState } from "react";
import style from "./Jogos.module.css";
import { JogoAPI } from "../../services/jogoAPI";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

export function Jogos() {
    const [jogos, setJogos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [jogoParaExcluir, setJogoParaExcluir] = useState(null);
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

    const confirmarExclusao = (id) => {
        setJogoParaExcluir(id);
    };

    const excluirJogoConfirmado = async () => {
        try {
            await JogoAPI.deletarAsync(jogoParaExcluir);
            setJogos((prev) => prev.filter((j) => j.id !== jogoParaExcluir));
            setMensagem("Jogo excluído com sucesso!");
            setErro("");

            setTimeout(() => {
                setMensagem("");
            }, 2000);
        } catch (error) {
            setErro("Erro ao excluir jogo.");
            setMensagem("");
            console.error("Erro ao excluir jogo:", error);

            setTimeout(() => {
                setErro("");
            }, 2000);
        } finally {
            setJogoParaExcluir(null);
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

                {mensagem && <p className={style.mensagem_sucesso}>{mensagem}</p>}
                {erro && <p className={style.mensagem_erro}>{erro}</p>}

                {carregando ? (
                    <p className={style.mensagem}>Carregando jogos...</p>
                ) : jogos.length === 0 ? (
                    <p className={style.mensagem}>Nenhum jogo encontrado.</p>
                ) : (
                    <>
                        <ul className={style.lista_jogos}>
                            {jogos.map((jogo) => (
                                <li key={jogo.id} className={style.item_jogo}>
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
                                            onClick={() => confirmarExclusao(jogo.id)}
                                            title="Excluir"
                                        >
                                            <Trash2 size={20} />
                                        </button>
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
            {jogoParaExcluir && (
                <div className={style.modal_overlay}>
                    <div className={style.modal}>
                        <p>Tem certeza que deseja excluir este jogo?</p>
                        <div className={style.modal_botoes}>
                            <button onClick={excluirJogoConfirmado} className={style.botao_confirmar}>
                                Sim
                            </button>
                            <button onClick={() => setJogoParaExcluir(null)} className={style.botao_cancelar}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
