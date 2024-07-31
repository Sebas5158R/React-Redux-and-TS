import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import { addNewUser, deleteUserByMail, fetchUsers } from "../features/user/userSlice"
import { toast } from "sonner"
import { User, Users } from "./types"

export const useUserActions = () => {
    const dispatch = useAppDispatch()
    const dataUsers = useAppSelector((state) => state.users)
    const { results, loading } = dataUsers as Users

    useEffect(() => {
        if(loading === 'idle') {
            dispatch(fetchUsers())
            toast.success('Usuarios cargados correctamente')
        } else if(loading === 'failed') {
            toast.error('Error al cargar los usuarios')
        }
    }, [loading, dispatch])
    
    const isIdle = loading === 'idle'
    const isLoading = loading === 'pending'
    const isSuccess = loading === 'succeeded'
    const isEror = loading === 'failed'

    const addUser = ({ name, email, phone, location, id, picture }: User) => {
        dispatch(addNewUser({ name, email, phone, location, id, picture }))
    }

    const removeUser = (email: string) => {
        dispatch(deleteUserByMail(email))
    }

    return { isIdle, isLoading, isSuccess, isEror, results, addUser, removeUser }
}