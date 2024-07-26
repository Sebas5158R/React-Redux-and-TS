import { useDispatch, useSelector } from 'react-redux' // useSelector es un hook que nos permite acceder al estado de la tienda y asi traer los datos que necesitamos
import type { RootState } from '@/app/store' // Importamos el tipo RootState que es para el tipo de store.getState() que exportamos en store.ts
import { deleteTask } from '@/features/tasks/taskSlice'
import { Link } from 'react-router-dom'

export function TaskList() {

    const tasks = useSelector((state: RootState) => state.tasks)

    const dispatch = useDispatch()

    const handleDelete = (id: string) => {
        dispatch(deleteTask(id))
    }

    return (
        <div className='task-list-container'>
            <header>
                <h1>Total Tasks: {tasks.length}</h1>
                <Link to={"/add-task"} className='header-link'>Create Task</Link>
            </header>
            <div className='task-list-data'>
                {tasks.map((task) => (
                    <div key={task.id} className='task-list-data-key'>
                        <header className='task-list-data-header'>
                            {task.title}
                            <div className='task-list-data-header-buttons'>
                                <Link to={`/edit-task/${task.id}`} className='link'>Edit</Link>
                                <button onClick={() => handleDelete(task.id)}>Delete</button>
                            </div>
                        </header>
                        {task.description}
                        {task.completed}
                    </div>
                ))}
            </div>
        </div>
    )
}