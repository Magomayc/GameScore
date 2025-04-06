import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { NovoUsuario } from './pages/NovoUsuario/NovoUsuario'
import { Menu } from './pages/Menu/Menu'
import { Jogo } from './pages/Jogo/Jogo'
import { Usuario } from './pages/Usuario/Usuario'
import { EditarUsuario } from './pages/EditarUsuario/EditarUsuario'
import { NovoJogo } from './pages/NovoJogo/NovoJogo'

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

      </Routes>
    </BrowserRouter>
  )
}

export default App