import { Task, uuid } from '@/hooks/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Definiendo el estado inicial de las tareas utilizando el tipo Task definido anteriormente
const initialState: Task[] = [
    {
        id: `36b8f84d-df4e-4d49-b662-bcde71a8764f`,
        title: "Task 1",
        description: "Description 1",
        completed: false
    },
    {
        id: `2232c8e6-5ead-4afc-877c-0fd6511f14aa`,
        title: "Task 2",
        description: "Description 2",
        completed: false
    }
]

export const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action:PayloadAction<Task>) => {
            state.push(action.payload)
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const { id, title, description } = action.payload // Destructuramos el payload para obtener los valores de id, title y description
            const foundTask = state.find(task => task.id === id) // Buscamos la tarea por el id
            // Si encontramos la tarea, actualizamos el título y la descripción
            if (foundTask) {
                foundTask.title = title
                foundTask.description = description
            }
        },
        deleteTask: (state, action: PayloadAction<uuid>) => {
            const id = action.payload
            return state.filter((task) => task.id !== id)
        },
    }
})

export const { addTask, updateTask, deleteTask } = taskSlice.actions
export default taskSlice.reducer