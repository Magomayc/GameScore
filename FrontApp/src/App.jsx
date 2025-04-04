import './App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { Login } from './pages/Login/Login'
import { Menu } from './pages/Menu/Menu'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/Menu' element={<Menu/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App