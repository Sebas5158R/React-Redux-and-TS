import { deleteTask } from '@/features/tasks/taskSlice'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '@/hooks/hooks'
import { uuid } from '@/hooks/types'

export function TaskList() {

    const tasks = useAppSelector((state) => state.tasks)

    const dispatch = useAppDispatch()

    const handleDelete = (id: uuid) => {
        dispatch(deleteTask(id))
    }

    return (
        <div className='task-list-container'>
            <header>
                <h1>Total Tasks: {tasks.length}</h1>
                <div style={{ display: "flex", gap: "10px" }}>
                    <Link to={"/list-users"} className='header-link'>View all users</Link>
                    <Link to={"/add-task"} className='header-link'>Create Task</Link>
                </div>
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