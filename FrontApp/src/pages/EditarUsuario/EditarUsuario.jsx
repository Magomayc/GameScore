import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Topbar } from '../../components/Topbar/Topbar';
import style from './EditarUsuario.module.css';
import { useState, useEffect } from 'react';
import { UsuarioAPI } from '../../services/usuarioAPI';
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export function EditarUsuario(){
    
    const location = useLocation();
    const navigate = useNavigate();

    const [id] = useState(location.state);

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [tipoUsuario, setTipoUsuario] = useState("");
    const [tiposUsuarios, setTiposUsuarios] = useState([]);

    useEffect(()=>{ 
        const fetchTiposUsuarios = async () => {
            try {
                const tipos = await UsuarioAPI.listarTiposUsuarioAsync();
                setTiposUsuarios(tipos.data);
            } catch (error) {
                console.log("Erro ao buscar tipos de usuários: ", error);
            }
        }

        const buscarDadosUsuario = async () => {
            try{
                const usuario = await UsuarioAPI.obterAsync(id);
                setTipoUsuario(usuario.tipoUsuarioId);
                setNome(usuario.nome);
                setEmail(usuario.email);
            }catch(error){
                console.error("Error ao buscar dados do usuário: ", error);
            }
        }
        buscarDadosUsuario();
        fetchTiposUsuarios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(isFormValid()){
            await UsuarioAPI.atualizarAsync(id, nome, email, tipoUsuario);
            navigate('/usuarios');
        }else{
            alert("Por favor, preencha todos os campos.");
        }
    }

    const isFormValid = () => {
        return nome && email && tipoUsuario;
    }
 
    return(
        <Sidebar>
            <Topbar>
                <div className={style.pagina_conteudo}>
                    <h3>Editar Usuário</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formNome" className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </Form.Group>  
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digite seu email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>  
                        

                        <Form.Group controlId="formTipoUsuario" className="mb-3">
                            <Form.Label>Tipo de Usuário</Form.Label>
                            <Form.Control
                                as="select"
                                name="tipoUsuario"
                                value={tipoUsuario}
                                onChange={(e) => setTipoUsuario(e.target.value)}
                                required>
                                    {tiposUsuarios.map((tipo) => (
                                        <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
                                    ))}
                                </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={!isFormValid()}>
                            Salvar
                        </Button>
                    </Form>
                </div>
            </Topbar>
        </Sidebar>

    )
}