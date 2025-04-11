import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { JogoAPI } from "../../services/jogoAPI";
import style from "./NovoJogo.module.css";
import Logo from "../../assets/GameScoreLogo.png";

export function NovoJogo() {
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [genero, setGenero] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagem, setImagem] = useState(""); // novo estado
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem("");
        setErro("");

        try {
            await JogoAPI.criarAsync(nome, genero, descricao, imagem); // incluído imagem
            setMensagem(`Jogo '${nome}' criado com sucesso!`);
            setNome("");
            setGenero("");
            setDescricao("");
            setImagem(""); // resetar imagem

            setTimeout(() => {
                navigate("/jogos");
            }, 1000);
        } catch (error) {
            setErro("Erro ao criar jogo. Verifique os dados e tente novamente.");
            setTimeout(() => setErro(""), 5000);
        }
    };

    return (
        <div className={style.pagina_novo_jogo}>
            <div className={style.novo_jogo_box}>
                <img src={Logo} alt="Logo" className={style.logo} />
                <h2 className={style.titulo}> Novo Jogo </h2>
                <form className={style.formulario} onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Nome do Jogo"
                        className={style.input}
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Gênero"
                        className={style.input}
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Descrição"
                        className={style.textarea}
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    ></textarea>
                    <input
                        type="text"
                        placeholder="URL da Imagem"
                        className={style.input}
                        value={imagem}
                        onChange={(e) => setImagem(e.target.value)}
                        required
                    />
                    <div className={style.botoes}>
                        <button type="submit" className={style.botao_salvar}>
                            Criar Jogo
                        </button>
                        <button
                            type="button"
                            className={style.botao_cancelar}
                            onClick={() => navigate('/jogos')}
                        >
                            Voltar
                        </button>
                    </div>
                    {mensagem && <p className={style.mensagem_sucesso}>{mensagem}</p>}
                    {erro && <p className={style.mensagem_erro}>{erro}</p>}
                </form>
            </div>
        </div>
    );
}
