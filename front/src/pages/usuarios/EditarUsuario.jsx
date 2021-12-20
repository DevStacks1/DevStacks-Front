import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_USUARIO } from 'graphql/usuarios/queries';
import Input from 'components/Input';
import useFormData from 'hooks/useFormData';
import { toast } from 'react-toastify';
import { EDITAR_USUARIO } from 'graphql/usuarios/mutations';
import DropDown from 'components/Dropdown';
import { Enum_EstadoUsuario } from 'utils/enums';
import ReactLoading from 'react-loading';
import { useUser } from 'context/userContext';

const EditarUsuario = () => {
  const { form, formData, updateFormData } = useFormData(null);
  const { _id } = useParams();
  const {userData} = useUser()

  const {data: queryData,error: queryError,loading: queryLoading} = useQuery(GET_USUARIO, {
    variables: { _id },
  });


  const [editarUsuario, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(EDITAR_USUARIO);

  const submitForm = (e) => {
    e.preventDefault();
    editarUsuario({
      variables: { _id, ...formData },
    });
  };

  useEffect(() => {
    if (mutationData) {
      toast.success('Usuario modificado correctamente');
    }
  }, [mutationData]);

  useEffect(() => {
    if (mutationError) {
      toast.error('Error modificando el usuario');
    }

    if (queryError) {
      toast.error('Error consultando el usuario');
    }
  }, [queryError, mutationError]);

  if (queryLoading) return <div>Loading....</div>;

  return (
    <div className='flew flex-col w-full h-full items-center justify-center p-10'>
      <Link to='/usuarios'>
        <i className='fas fa-arrow-left text-gray-600 cursor-pointer font-bold text-xl hover:text-gray-900' />
      </Link>
      <h1 className='m-4 text-3xl text-gray-800 font-bold text-center'>EDIT USER</h1>
      <form
        onSubmit={submitForm}
        onChange={updateFormData}
        ref={form}
        className='flex flex-col items-center justify-center'
      >
        <Input
          label='Nombre de la persona:'
          type='text'
          name='Name'
          defaultValue={queryData.User.Name}
          required={true}
          disabled = {userData.Role === 'LEADER'}
        />
        <Input
          label='Apellido de la persona:'
          type='text'
          name='Lastname'
          defaultValue={queryData.User.Lastname}
          required={true}
          disabled = {userData.Role === 'LEADER'}
        />
        <Input
          label='Correo de la persona:'
          type='email'
          name='Email'
          defaultValue={queryData.User.Email}
          required={true}
          disabled = {userData.Role === 'LEADER'}
        />
        <Input
          label='Identificación de la persona:'
          type='text'
          name='Identification'
          defaultValue={queryData.User.Identification}
          required={true}
          disabled = {userData.Role === 'LEADER'}
        />
        <DropDown
          label='Estado de la persona:'
          name='State'
          defaultValue={queryData.User.State}
          required={true}
          options={Enum_EstadoUsuario}
        />
        <span>Rol del usuario: {queryData.User.Role}</span>
        <button disabled={Object.keys(formData).length === 0} type='submit'
        className='bg-indigo-700 text-white font-bold text-lg py-3 px-6 
        rounded-xl hover:bg-indigo-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700' >
          {mutationLoading ? <ReactLoading type='spin' height={30} width={30} /> : <div> CONFIRM </div>}
        </button>
      </form>
    </div>
  );
};

export default EditarUsuario;
