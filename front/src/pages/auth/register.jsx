import React, { useEffect } from 'react';
import Input from 'components/Input';
import { Enum_Rol } from 'utils/enums';
import DropDown from 'components/Dropdown';
import useFormData from 'hooks/useFormData';
import { Link } from 'react-router-dom';
import { REGISTRO } from 'graphql/auth/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useAuth } from 'context/authContext';
import ReactLoading from 'react-loading';

const Register = () => {
  // llamamos contextos
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { form, formData, updateFormData } = useFormData();

  // cargamos mutation
  const [registro, { data: dataMutation, loading: mutationLoading, error: errorMutation }] =
    useMutation(REGISTRO);

  const submitForm = (e) => {
    e.preventDefault();
    registro({ variables: formData });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.registro.token) {
        setToken(dataMutation.registro.token);
        navigate('/');
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div className='flex flex-col h-full w-full items-center justify-center'>
      <h1 className='text-3xl font-bold my-4'>SIGN UP</h1>
      <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <div className='grid grid-cols-2 gap-5'>
          <Input label='Name:' name='Name' type='text' required />
          <Input label='Lastname:' name='Lastname' type='text' required />
          <Input label='Identification:' name='Identification' type='text' required />
          <DropDown label='Role:' name='Role' required={true} options={Enum_Rol} />
          <Input label='Email:' name='Email' type='email' required />
          <Input label='Password:' name='Password' type='Password' required />
        </div>
        <button disabled={Object.keys(formData).length === 0} type='submit'
        className='bg-indigo-700 text-white font-bold text-lg py-3 px-6 
        rounded-xl hover:bg-indigo-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700' >
          {mutationLoading ? <ReactLoading type='spin' height={30} width={30} /> : <div> SIGN UP </div>}
        </button>
      </form>
      <span>Do you already have an account?</span>
      <Link to='/auth/login'>
        <span className='text-blue-700'>SIGN IN</span>
      </Link>
    </div>
  );
};

export default Register;
