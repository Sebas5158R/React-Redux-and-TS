// Definiendo el tipo de dato de una tarea
type uuid = `${string}-${string}-${string}-${string}-${string}`

export type Task =  {
    readonly id: uuid, // readonly es para que no se pueda modificar el id
    title: string,
    description: string,
    completed: boolean
}

// Types para los eventos de los componentes
export type EventsChange = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
export type EventsSubmit = React.MouseEvent<HTMLButtonElement, MouseEvent>