import { useEffect, useState } from "react";
import style from "./UsuariosAdm.module.css";
import { UsuarioAPI } from "../../services/usuarioAPI";
import { useNavigate } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";

const mapTipoUsuario = {
    1: "Administrador",
    2: "Usuário"
};

export function UsuariosAdm() {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function carregarUsuarios() {
            try {
                const dados = await UsuarioAPI.listarAsync(true); 
                console.log(dados); 
                setUsuarios(Array.isArray(dados) ? dados : []); 
            } catch (error) {
                setErro("Erro ao carregar usuários.");
                console.error("Erro ao carregar usuários:", error);
            } finally {
                setCarregando(false);
            }
        }
    
        carregarUsuarios();
    }, []); 

    const excluirUsuario = async (id) => {
        if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
            try {
                await UsuarioAPI.deletarAsync(id); 
                setUsuarios((usuarios) => usuarios.filter(u => u.id !== id)); 
            } catch (error) {
                alert("Erro ao excluir usuário.");
                console.error("Erro ao excluir:", error);
            }
        }
    };

    return (
        <div className={style.pagina_usuarios}>
            <div className={style.header}>
                <button className={style.botao_topo} onClick={() => navigate("/usuario")}>
                    Voltar
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
                            <li key={usuario.id} className={style.item_usuario}>
                                <div className={style.row_usuario}>
                                    <div className={style.dados_usuario}>
                                        <p><strong>Nome:</strong> {usuario.nome}</p>
                                        <p><strong>Email:</strong> {usuario.email}</p>
                                        <p><strong>Tipo:</strong> {mapTipoUsuario[usuario.tipoUsuarioId] || 'Não especificado'}</p>
                                    </div>
                                    <div className={style.botoes_usuario}>
                                        <button
                                            className={style.botao_editar}
                                            onClick={() => navigate('/editarUsuarioAdm', { state: { id: usuario.id } })}
                                            title="Editar"
                                        >
                                            <Pencil size={20} />
                                        </button>
                                        <button
                                            className={style.botao_cancelar}
                                            onClick={() => excluirUsuario(usuario.id)}
                                            title="Excluir"
                                        >
                                            <Trash2 size={20} />
                                        </button>
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
