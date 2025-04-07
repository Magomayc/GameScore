import style from "./Usuario.module.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { UsuarioJogoAPI } from "../../services/usuarioJogoAPI"; 

const mapTipoUsuario = {
    1: "Administrador",
    2: "Usuário"
};

export function Usuario() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [usuarioLogado, setUsuarioLogado] = useState(null);
    const [fotoPerfil, setFotoPerfil] = useState(null);
    const [fotoTemp, setFotoTemp] = useState(null);
    const [editandoFoto, setEditandoFoto] = useState(false);
    const [jogosVinculados, setJogosVinculados] = useState([]); 

    useEffect(() => {
        async function carregarDados() {
            try {
                const usuarioSalvo = localStorage.getItem("usuarioLogado");

                if (!usuarioSalvo) {
                    navigate("/login");
                    return;
                }

                const usuario = JSON.parse(usuarioSalvo);
                setUsuarioLogado(usuario);

                const chaveFoto = `fotoPerfil_${usuario.email}`;
                const fotoSalva = localStorage.getItem(chaveFoto);

                if (fotoSalva) {
                    setFotoPerfil(fotoSalva);
                }

                const associacoes = await UsuarioJogoAPI.listarAsync();
                const jogosDoUsuario = associacoes.filter(j => j.usuarioId === usuario.id);
                setJogosVinculados(jogosDoUsuario);

            } catch (error) {
                console.error("Erro ao carregar dados do usuário:", error);
                navigate("/login");
            }
        }

        carregarDados();
    }, [navigate]);

    const handleFotoClick = () => {
        fileInputRef.current.click();
    };

    const handleFotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoTemp(reader.result);
                setEditandoFoto(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSalvarFoto = () => {
        setFotoPerfil(fotoTemp);
        localStorage.setItem(`fotoPerfil_${usuarioLogado.email}`, fotoTemp);
        setFotoTemp(null);
        setEditandoFoto(false);
    };

    const handleCancelarFoto = () => {
        setFotoTemp(null);
        setEditandoFoto(false);
    };

    return (
        <div className={style.pagina_usuarios}>
            <div className={style.header}>
                <Button
                    variant="none"
                    className={style.botao_topo}
                    onClick={() => navigate("/menu")}
                >
                    Voltar ao Menu
                </Button>
            </div>

            <div className={style.usuarios_box}>
                <h2 className={style.titulo}>Perfil do Usuário</h2>

                {usuarioLogado ? (
                    <ul className={style.lista}>
                        <li className={style.item}>
                            <div className={style.foto_container} onClick={handleFotoClick}>
                                {fotoTemp || fotoPerfil ? (
                                    <img
                                        src={fotoTemp || fotoPerfil}
                                        alt="Foto de Perfil"
                                        className={style.foto_perfil}
                                    />
                                ) : (
                                    <div className={style.foto_placeholder}>Adicionar Foto</div>
                                )}
                                <div className={style.foto_editar}>✎</div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleFotoChange}
                                    className={style.input_foto}
                                />
                            </div>

                            {editandoFoto && (
                                <div className={style.botoes_foto}>
                                    <Button
                                        variant="none"
                                        className={style.botao_salvar}
                                        onClick={handleSalvarFoto}
                                    >
                                        Salvar
                                    </Button>
                                    <Button
                                        variant="none"
                                        className={style.botao_cancelar}
                                        onClick={handleCancelarFoto}
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            )}

                            <div className={style.dados_usuario}>
                                <p><strong>Nome:</strong> {usuarioLogado.nome}</p>
                                <p><strong>Email:</strong> {usuarioLogado.email}</p>
                                <p><strong>Tipo:</strong> {mapTipoUsuario[usuarioLogado.tipoUsuarioId] || "Não informado"}</p>
                            </div>

                            {jogosVinculados.length > 0 && (
                                <div className={style.jogos_vinculados}>
                                    <h4 className={style.subtitulo}>Jogos Curtidos</h4>
                                    <ul className={style.lista_jogos}>
                                        {jogosVinculados.map((jogo, index) => (
                                            <li key={index} className={style.item_jogo}>
                                                🎮 {jogo.jogoNome}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className={style.botoes_usuario}>
                                <Button
                                    variant="none"
                                    className={style.botao_editar}
                                    onClick={() => navigate('/editarUsuario', { state: { id: usuarioLogado.id } })}
                                >
                                    Editar
                                </Button>

                                {usuarioLogado?.tipoUsuarioId === 1 && (
                                    <>
                                        <Button
                                            variant="none"
                                            className={style.botao_admin}
                                            onClick={() => navigate('/usuariosAdm')}
                                        >
                                            Gerenciar Usuários
                                        </Button>
                                        <Button
                                            variant="none"
                                            className={style.botao_admin}
                                            onClick={() => navigate('/jogos')}
                                        >
                                            Gerenciar Jogos
                                        </Button>
                                    </>
                                )}
                            </div>
                        </li>
                    </ul>
                ) : (
                    <p className={style.carregando}>Carregando usuário...</p>
                )}
            </div>
        </div>
    );
}
