import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { JogoAPI } from "../../services/jogoAPI";
import style from "./EditarJogo.module.css";

export function EditarJogo() {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    const [nome, setNome] = useState("");
    const [genero, setGenero] = useState("");
    const [descricao, setDescricao] = useState("");
    const [mensagem, setMensagem] = useState(null);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function carregarJogo() {
            try {
                const jogos = await JogoAPI.listarAsync(true);
                const jogoSelecionado = jogos.find(j => j.id === id);
                if (jogoSelecionado) {
                    setNome(jogoSelecionado.nome);
                    setGenero(jogoSelecionado.genero);
                    setDescricao(jogoSelecionado.descricao);
                }
            } catch (error) {
                setErro("Erro ao carregar jogo.");
            }
        }

        if (id) carregarJogo();
    }, [id]);

    const handleAtualizar = async (e) => {
        e.preventDefault();
        setMensagem(null);
        setErro(null);

        try {
            await JogoAPI.atualizarAsync(id, nome, genero, descricao);
            setMensagem("Jogo atualizado com sucesso!");

            setTimeout(() => {
                navigate("/jogos");
            }, 1500);
        } catch (error) {
            setErro("Erro ao atualizar o jogo.");
        }
    };

    return (
        <div className={style.pagina_editar}>
            <div className={style.editar_box}>
                <h2 className={style.titulo}>Editar Jogo</h2>

                <form className={style.formulario} onSubmit={handleAtualizar}>
                    <input
                        type="text"
                        className={style.input}
                        placeholder="Nome do Jogo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />

                    <input
                        type="text"
                        className={style.input}
                        placeholder="Gênero"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        required
                    />

                    <textarea
                        className={style.input}
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        rows={4}
                        required
                        style={{ resize: "vertical", minHeight: "100px" }}
                    />

                    <div className={style.botoes}>
                        <button className={style.botao_salvar} type="submit">Salvar</button>
                        <button className={style.botao_cancelar} type="button" onClick={() => navigate("/jogos")}>
                            Cancelar
                        </button>
                    </div>
                </form>

                <button className={style.botao_voltar} onClick={() => navigate("/jogos")}>
                    Voltar à Lista de Jogos
                </button>
            </div>

            {mensagem && <div className={style.mensagem_sucesso}>{mensagem}</div>}
            {erro && <div className={style.mensagem_erro}>{erro}</div>}
        </div>
    );
}
