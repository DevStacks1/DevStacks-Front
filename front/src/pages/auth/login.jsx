import React, { useEffect } from 'react';
import Input from 'components/Input';
import { Link } from 'react-router-dom';
import useFormData from 'hooks/useFormData';
import { useMutation } from '@apollo/client';
import { LOGIN } from 'graphql/auth/mutations';
import { useAuth } from 'context/authContext';
import { useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';

const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth();
  const { form, formData, updateFormData } = useFormData();

  const [login, { data: dataMutation, loading: mutationLoading, error: mutationError }] =
    useMutation(LOGIN);

  const submitForm = (e) => {
    e.preventDefault();

    login({
      variables: formData,
    });
  };

  useEffect(() => {
    if (dataMutation) {
      if (dataMutation.login.token) {
        setToken(dataMutation.login.token);
        navigate('/');
      }
    }
  }, [dataMutation, setToken, navigate]);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-10'>
      <h1 className='text-xl font-bold text-gray-900'>SIGN IN</h1>

      <form className='flex flex-col' onSubmit={submitForm} onChange={updateFormData} ref={form}>
        <Input name='Email' type='Email' label='Email' required={true} />
        <Input name='Password' type='Password' label='Password' required={true} />
        <button
        disabled={Object.keys(formData).length === 0}
        type='submit'
        className='bg-indigo-700 text-white font-bold text-lg py-3 px-6
        rounded-xl hover:bg-indigo-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700'
        >
        {mutationLoading ? <ReactLoading type='spin' height={30} width={30} /> : <div> SIGN IN </div>}
        </button>

      </form>
      <span>Don't you have an account?</span>
      <Link to='/auth/register'>
        <span className='text-blue-700'>SIGN UP</span>
      </Link>
    </div>
  );
};

export default Login;
