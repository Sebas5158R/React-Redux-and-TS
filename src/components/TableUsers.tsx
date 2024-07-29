import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
} from '@tremor/react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { fetchUsers } from '../features/user/userSlice';
import { useEffect } from 'react';
import { User } from '../hooks/types';

export const TableUsers = () => {

    const dispatch = useAppDispatch();

    const dataUsers = useAppSelector((state) => state.users)
    const { usersData, status, error } = dataUsers

    console.log(status, error)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])

    if(!Array.isArray(usersData)) {
        return <div>Cargando usuarios: { JSON.stringify(usersData) }</div>
    }

    return (
        <>
            <div className="sm:flex sm:items-center sm:justify-between sm:space-x-10">
                <div>
                    <h3 className="font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Usuarios
                    </h3>
                    <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
                        Lista de usuarios que estan registrados en la plataforma
                    </p>
                </div>
                <button
                    type="button"
                    className="mt-4 w-full whitespace-nowrap rounded-tremor-small bg-tremor-brand px-4 py-2.5 text-tremor-default font-medium text-tremor-brand-inverted shadow-tremor-input hover:bg-tremor-brand-emphasis dark:bg-dark-tremor-brand dark:text-dark-tremor-brand-inverted dark:shadow-dark-tremor-input dark:hover:bg-dark-tremor-brand-emphasis sm:mt-0 sm:w-fit"
                >
                    Agregar usuario
                </button>
            </div>
            <Table className="mt-8">
                <TableHead>
                    <TableRow className="border-b border-tremor-border dark:border-dark-tremor-border">
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Nombre completo
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Email
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Telefono
                        </TableHeaderCell>
                        <TableHeaderCell className="text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            País - Ciudad
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Tipo de documento
                        </TableHeaderCell>
                        <TableHeaderCell className="text-right text-tremor-content-strong dark:text-dark-tremor-content-strong">
                            Número de documento
                        </TableHeaderCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {usersData.map((user: User) => (
                        <TableRow key={user.email}>
                            <TableCell className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                                {user.name.first} {user.name.last}
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.phone}</TableCell>
                            <TableCell>{user.location.country} - {user.location.city}</TableCell>
                            <TableCell className="text-right">
                                {user.id.name === '' ? 'No disponible' : user.id.name}
                            </TableCell>
                            <TableCell className="text-right">
                                {user.id.value === null ? 'No disponible' : user.id.value}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
}