// Definiendo el tipo de dato de una tarea
type uuid = `${string}-${string}-${string}-${string}-${string}`

export type Task =  {
    readonly id: uuid, // readonly es para que no se pueda modificar el id
    title: string,
    description: string,
    completed: boolean
}

// Definiendo el tipo de datos de un usuario
export type User = {
    readonly id: uuid,
    name: string,
    email: string,
    github: string
}

// Types para los eventos de los componentes
export type EventsChange = React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
export type EventsSubmit = React.FormEvent<HTMLFormElement>