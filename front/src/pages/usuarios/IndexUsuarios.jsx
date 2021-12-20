import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { Enum_Rol, Enum_EstadoUsuario } from 'utils/enums';
import PrivateRoute from 'components/PrivateRoute';

const IndexUsuarios = () => {
    const { data, error, loading } = useQuery(GET_USUARIOS);
    useEffect(() => {
        if (error) {
        toast.error('Error consultando los usuarios');
        }
    }, [error]);

    if (loading) return <div>Cargando....</div>;

    return (
        <PrivateRoute roleList={['ADMINISTRATOR','LEADER']}>
        <div>
            Datos Usuarios:
            <table className='tabla w-screen overflow-hidden'>
            <thead>
                <tr>
                <th>Name</th>
                <th>Lastname</th>
                <th>Email</th>
                <th>Identification</th>
                <th>Role</th>
                <th>State</th>
                <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {data && data.Users ? (
                <>
                    {data.Users.map((campo) => {
                    return (
                        <tr key={campo._id}>
                        <td>{campo.Name}</td>
                        <td>{campo.Lastname}</td>
                        <td>{campo.Email}</td>
                        <td>{campo.Identification}</td>
                        <td>{Enum_Rol[campo.Role]}</td>
                        <td>{Enum_EstadoUsuario[campo.State]}</td>
                        <td>
                            <Link to={`/usuarios/editar/${campo._id}`}>
                                <i className='fas fa-pen' />
                            </Link>

                        </td>
                        </tr>
                    );
                    })}
                </>
                ) : (
                <div>NO AUTHORIZED</div>
                )}
            </tbody>
            </table>
        </div>
        </PrivateRoute>
    );
};

export default IndexUsuarios;