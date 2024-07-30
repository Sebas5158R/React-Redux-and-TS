import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { TableUsers } from './components/TableUsers'
import { CreateNewUser } from './components/CreateNewUser'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<TableUsers />} />
            <Route path='/create-user' element={<CreateNewUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
