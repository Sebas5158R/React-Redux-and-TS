import { useEffect, useState } from "react"
import { EventsChange, EventsSubmit, Task } from "@/hooks/types"
import { addTask, updateTask } from "@/features/tasks/taskSlice" // Importando la acción addTask del slice taskSlice
import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"

export function TaskForm() {

    const [task, setTask] = useState<Task | null>(null)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const tasks = useAppSelector((state) => state.tasks)

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
                ...task as Task,
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