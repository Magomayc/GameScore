import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { NovoUsuario } from './pages/NovoUsuario/NovoUsuario'
import { Menu } from './pages/Menu/Menu'
import { Jogo } from './pages/Jogo/Jogo'
import { Usuario } from './pages/Usuario/Usuario'
import { EditarUsuario } from './pages/EditarUsuario/EditarUsuario'
import { NovoJogo } from './pages/NovoJogo/NovoJogo'
import { EditarUsuarioAdm } from './pages/EditarUsuarioAdm/EditarUsuarioAdm'
import { Jogos } from './pages/Jogos/Jogos'
import { EditarJogo } from './pages/EditarJogo/EditarJogo'
import { Perfil } from './pages/Perfil/Perfil'
import { UsuariosAdm } from './pages/UsuariosAdmin/UsuariosAdm'
import { Usuarios } from './pages/Usuarios/Usuarios'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/novoUsuario' element={<NovoUsuario/>} />
        <Route path='/menu' element={<Menu/>} />
        <Route path='/jogo' element={<Jogo/>} />
        <Route path='/usuario' element={<Usuario/>} />
        <Route path="/jogo/:id" element={<Jogo />} />
        <Route path="/editarUsuario" element={<EditarUsuario />} />
        <Route path="/novoJogo" element={<NovoJogo />} />
        <Route path="/usuariosAdm" element={<UsuariosAdm />} />
        <Route path="/editarUsuarioAdm" element={<EditarUsuarioAdm/>} />
        <Route path="/jogos" element={<Jogos/>} />
        <Route path="/editarJogo" element={<EditarJogo/>} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="/usuarios" element={<Usuarios/>} />
        <Route path="/perfil/:usuarioId" element={<Perfil/>} />


      </Routes>
    </BrowserRouter>
  )
}

export default App