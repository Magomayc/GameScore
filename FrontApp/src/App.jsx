import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { EditarUsuario } from './pages/EditarUsuario/EditarUsuario'
import { Usuarios } from './pages/Usuario/Usuario'
import { NovoUsuario } from './pages/NovoUsuario/NovoUsuario'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/usuarios' element={<Usuarios />} />
        <Route path='/usuario/novo' element={<NovoUsuario />} />
        <Route path='/usuario/editar' element={<EditarUsuario />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App