import { useEffect, useState } from "react";
import style from "./Usuarios.module.css";
import { UsuarioAPI } from "../../services/usuarioAPI";
import { UsuarioJogoAPI } from "../../services/usuarioJogoAPI"; 
import { useNavigate } from "react-router-dom";

export function Usuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function carregarUsuarios() {
            try {
                const dados = await UsuarioAPI.listarAsync(true); 
                const todasCurtidas = await UsuarioJogoAPI.listarAsync();
    
                const usuariosComJogos = dados.map((usuario) => {
                    const curtidasDoUsuario = todasCurtidas.filter(
                        (item) => item.usuarioId === usuario.id
                    );
                    return { ...usuario, jogosCurtidosCount: curtidasDoUsuario.length };
                });
    
                setUsuarios(usuariosComJogos);
            } catch (error) {
                setErro("Erro ao carregar usuários.");
                console.error("Erro ao carregar usuários:", error);
            } finally {
                setCarregando(false);
            }
        }  
        carregarUsuarios();
    }, []);

    const irParaPerfil = (usuarioId) => {
        navigate(`/perfil/${usuarioId}`); 
    };

    return (
        <div className={style.pagina_usuarios}>
            <div className={style.header}>
                <button className={style.botao_topo} onClick={() => navigate("/menu")}>
                    Voltar ao Menu
                </button>
            </div>

            <div className={style.usuarios_box}>
                <h2 className={style.titulo}>Lista de Usuários</h2>

                {carregando ? (
                    <p className={style.mensagem}>Carregando usuários...</p>
                ) : erro ? (
                    <p className={style.erro}>{erro}</p>
                ) : usuarios.length === 0 ? (
                    <p className={style.mensagem}>Nenhum usuário encontrado.</p>
                ) : (
                    <ul className={style.lista_usuarios}>
                        {usuarios.map((usuario) => (
                            <li 
                                key={usuario.id} 
                                className={style.item_usuario}
                                onClick={() => irParaPerfil(usuario.id)} 
                            >
                                <div className={style.row_usuario}>
                                    <div className={style.dados_usuario}>
                                        <p><strong>Usuário:</strong> {usuario.nome}</p>
                                        <p><strong>Email:</strong> {usuario.email}</p>
                                        <p><strong>Jogos Curtidos:</strong> {usuario.jogosCurtidosCount}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
