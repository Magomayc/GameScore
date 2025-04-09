import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UsuarioAPI } from "../../services/usuarioAPI";
import { UsuarioJogoAPI } from "../../services/usuarioJogoAPI";
import { JogoAPI } from "../../services/jogoAPI";
import style from "./Perfil.module.css";

export function Perfil() {
    const { usuarioId } = useParams(); 
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [jogosCurtidos, setJogosCurtidos] = useState([]);
    const [erro, setErro] = useState(null);
    const [erroJogos, setErroJogos] = useState(null); 

    useEffect(() => {
        async function carregarUsuario() {
            try {
                const usuarioData = await UsuarioAPI.obterAsync(usuarioId);
                if (!usuarioData) {
                    setErro("Usuário não encontrado.");
                    return;
                }
                setUsuario(usuarioData);
            } catch (erro) {
                console.error("Erro ao carregar dados do usuário:", erro);
                setErro("Erro ao carregar o perfil.");
            }
        }

        if (usuarioId) {
            carregarUsuario();
        } else {
            setErro("ID do usuário inválido.");
        }
    }, [usuarioId]);

    useEffect(() => {
        async function carregarJogosCurtidos() {
            try {
                const associacoes = await UsuarioJogoAPI.listarAsync();
    
                const jogosDoUsuario = associacoes.filter(
                    associacao => associacao.usuarioId === Number(usuarioId)
                );
    
                const jogosCurtidosIds = jogosDoUsuario.map(associacao => associacao.jogoId);
                const jogos = await JogoAPI.listarAsync(true);
                const jogosFiltrados = jogos.filter(jogo => jogosCurtidosIds.includes(jogo.id));
    
                setJogosCurtidos(jogosFiltrados);
            } catch (erro) {
                console.error("Erro ao carregar jogos vinculados ao usuário:", erro);
                setErroJogos("Erro ao carregar jogos vinculados.");
            }
        }
    
        if (usuarioId) {
            carregarJogosCurtidos();
        }
    }, [usuarioId]);

    function obterIniciais(nome) {
        if (!nome) return "";
        return nome
            .split(" ")
            .map(n => n[0])
            .join("")
            .toUpperCase();
    }

    return (
        <div className={style.pagina_perfil}>
            <div className={style.header}>
                <button
                    className={style.botao_topo}
                    onClick={() => navigate("/usuarios")}
                >
                    Voltar para Usuários
                </button>
            </div>

            <div className={style.perfil_box}>
                <h1 className={style.titulo}>Perfil do Usuário</h1>

                {erro && <p className={style.erro}>{erro}</p>} 

                {usuario ? (
                    <>
                        <div className={style.foto_container}>
                            {usuario.foto ? (
                                <img
                                    src={usuario.foto}
                                    alt="Foto de perfil"
                                    className={style.foto_perfil}
                                />
                            ) : (
                                <div className={style.foto_placeholder}>
                                    {obterIniciais(usuario.nome)}
                                </div>
                            )}
                        </div>
                        <div className={style.info_usuario}>
                            <p><strong>Nome:</strong> {usuario.nome}</p>
                            <p><strong>Email:</strong> {usuario.email}</p>
                        </div>
                    </>
                ) : (
                    <p className={style.mensagem}>Carregando informações do usuário...</p>
                )}
                <h2 className={style.subtitulo}>Jogos Curtidos</h2>

                {erroJogos && <p className={style.erro}>{erroJogos}</p>}

                {jogosCurtidos.length === 0 ? (
                    <p className={style.mensagem}>Você ainda não curtiu nenhum jogo.</p>
                ) : (
                    <ul className={style.lista_jogos}>
                        {jogosCurtidos.map(jogo => (
                            <li key={jogo.id} className={style.item_jogo}>
                                <h3>{jogo.nome}</h3>
                                <p><strong>Gênero:</strong> {jogo.genero}</p>
                                <p><strong>Descrição:</strong> {jogo.descricao}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
