import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks"
import { fetchUsers } from "../features/user/userSlice"
import { toast } from "sonner"
import { Users } from "./types"

export const useUserActions = () => {
    const dispatch = useAppDispatch()
    const dataUsers = useAppSelector((state) => state.users)
    const { results, loading } = dataUsers as Users

    useEffect(() => {
        if(loading === 'idle') {
            toast.success('Usuarios cargados correctamente')
            dispatch(fetchUsers())
        } else if(loading === 'failed') {
            toast.error('Error al cargar los usuarios')
        }
    }, [loading, dispatch])
    
    const isIdle = loading === 'idle'
    const isLoading = loading === 'pending'
    const isSuccess = loading === 'succeeded'
    const isEror = loading === 'failed'

    return { isIdle, isLoading, isSuccess, isEror, results }
}