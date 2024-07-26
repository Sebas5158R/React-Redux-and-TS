import { useEffect, useState } from "react"
import { EventsChange, EventsSubmit, Task } from "@/types"
import { useDispatch, useSelector } from "react-redux" // Importando el hook useDispatch de react-redux para despachar acciones
import { addTask, updateTask } from "@/features/tasks/taskSlice" // Importando la acción addTask del slice taskSlice
import { useNavigate, useParams } from "react-router-dom"
import type { RootState } from "@/app/store"

export function TaskForm() {

    const [task, setTask] = useState<Task | null>(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const tasks = useSelector((state: RootState) => state.tasks)

    const handleChange = (e: EventsChange) => {
        setTask({
            ...task as Task,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: EventsSubmit) => {
        e.preventDefault()

        if (params.id) {
            dispatch(updateTask(task))

        } else {
            dispatch(addTask({
                ...task,
                id: self.crypto.randomUUID()
            }))
        }
        navigate("/")
    }
    useEffect(() => {
        if (params.id) {
            setTask(tasks.find(task => task.id === params.id) || null)
        }
    }, [params.id, tasks]);


  return (
    <form className="form-task">
        <label htmlFor="title">Task:</label>
        <input type="text" placeholder="Title" name="title" onChange={handleChange} defaultValue={task?.title} />

        <label htmlFor="description">Description:</label>
        <textarea name="description" placeholder="Description" onChange={handleChange} defaultValue={task?.description}></textarea>
        <button onClick={handleSubmit}>Save</button>
    </form>
  )
}