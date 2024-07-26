import { addNewUser, deleteUserById } from "@/features/users/userSlice"
import { useAppDispatch } from "./hooks"
import { uuid } from "./types"

export const useUserActions = () => {
    const dispatch = useAppDispatch()

    const addUser = ({ name, email, github }) => {
        const id = self.crypto.randomUUID()
        dispatch(addNewUser({ id, name, email, github }))
    }

    const removeUser = (id: uuid) => {
        dispatch(deleteUserById(id))
    }

    return { addUser, removeUser}
}