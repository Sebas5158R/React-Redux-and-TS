import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { TaskList } from '@/components/TaskList'
import { TaskForm } from '@components/TaskForm'
import { ListOfUsers } from './components/ListOfUsers'
import { Toaster } from 'sonner'

function App() {
  return (
    <div className='App'>
      <div className='container'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<TaskList />} />
            <Route path='/add-task' element={<TaskForm />} />
            <Route path='/edit-task/:id' element={<TaskForm />} />
            <Route path='/list-users' element={<ListOfUsers />} />
          </Routes>
        </BrowserRouter>
        <Toaster richColors />
      </div>
    </div>
  )
}

export default App
