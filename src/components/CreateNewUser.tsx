import { EventsSubmit } from "@/hooks/types"
import { useUserActions } from "@/hooks/useUserActions"
import { useState } from "react"

export function CreateNewUser() {
    const { addUser } = useUserActions()
    const [result, setResult] = useState<'OK' | 'KO' | null>(null)

    const handleSubmit = (e: EventsSubmit) => {
        e.preventDefault()
        const form = e.currentTarget
        const formData = new FormData(form)

        const name = formData.get('name') as string
        const email = formData.get('email') as string
        const github = formData.get('github') as string

        if (!name || !email || !github) {
            return setResult('KO')
        }

        addUser({ name, email, github })
        setResult('OK')
        form.reset()
    }

    return (
        <div>
            <h1>Create New User</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type='text' name="name" />
                </label>
                <label>
                    Email:
                    <input type='email' name="email" />
                </label>
                <label>
                    Github:
                    <input type='text' name="github" />
                </label>
                <button type='submit'>Create User</button>
                <span>
                    {result === 'KO' && 'Please fill all the fields'}
                    {result === 'OK' && 'User created successfully'}
                </span>
            </form>
        </div>
    )
}