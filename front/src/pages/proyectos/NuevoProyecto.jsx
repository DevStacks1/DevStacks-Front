import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Input from 'components/Input';
import { GET_USUARIOS } from 'graphql/usuarios/queries';
import { Link, Navigate } from 'react-router-dom';
import DropDown from 'components/Dropdown';
import ButtonLoading from 'components/ButtonLoading';
import useFormData from 'hooks/useFormData';
import { Enum_TipoObjetivo } from 'utils/enums';
import { nanoid } from 'nanoid';
import { ObjContext } from 'context/objContext';
import { useObj } from 'context/objContext';
import { CREAR_PROYECTO } from 'graphql/proyectos/mutations';
import { toast } from 'react-toastify';

const NuevoProyecto = () => {
  const { form, formData, updateFormData } = useFormData();
  const [listaUsuarios, setListaUsuarios] = useState({});
  const { data, loading, error } = useQuery(GET_USUARIOS, {
    variables: {
      filtro: { Role: 'LEADER', State: 'AUTHORIZED' },
    },
  });

  const [crearProyecto, { data: mutationData, loading: mutationLoading, error: mutationError }] =
    useMutation(CREAR_PROYECTO);

  useEffect(() => {
    if (data) {
      const lu = {};
      data.Users.forEach((elemento) => {
        lu[elemento._id] = elemento.Email;
      });
      setListaUsuarios(lu);
    }
  }, [data]);

  useEffect(() => {
    if (mutationData){
      toast.success('Proyecto creado con exito');

    }else if (mutationError){
      toast.error('Error creando el proyecto');
    }
  }, [mutationData, mutationError]);

  const submitForm = (e) => {
    e.preventDefault();
    formData.Objectives = Object.values(formData.objetivos);
    formData.Budget = parseFloat(formData.Budget);
    
    crearProyecto({
      variables: formData,
    });
  };

  if (loading) return <div>...Loading</div>;

  return (
    <div className='p-10 flex flex-col items-center'>
      <div className='self-start'>
        <Link to='/proyectos'>
          <i className='fas fa-arrow-left' />
        </Link>
      </div>
      <h1 className='text-2xl font-bold text-gray-900'>Create new project</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}>
        <Input name='NameProject' label='Nombre del Proyecto' required={true} type='text' />
        <Input name='Budget' label='Presupuesto del Proyecto' required={true} type='number' />
        <Input name='Initial_Date' label='Fecha de Inicio' required={true} type='date' />
        <Input name='Final_Date' label='Fecha de Fin' required={true} type='date' />
        <DropDown label='Líder' options={listaUsuarios} name='Leader' required={true} />
        <Objetivos />
        <ButtonLoading text='Create project' loading={false} disabled={false} />
      </form>
    </div>
  );
};

const Objetivos = () => {
  const [listaObjetivos, setListaObjetivos] = useState([]);
  const [maxObjetivos, setMaxObjetivos] = useState(false);

  const eliminarObjetivo = (id) => {
    setListaObjetivos(listaObjetivos.filter((el) => el.props.id !== id));
  };

  const componenteObjetivoAgregado = () => {
    const id = nanoid();
    return <FormObjetivo key={id} id={id} />;
  };

  useEffect(() => {
    if (listaObjetivos.length > 4) {
      setMaxObjetivos(true);
    } else {
      setMaxObjetivos(false);
    }
  }, [listaObjetivos]);

  return (
    <ObjContext.Provider value={{ eliminarObjetivo }}>
      <div className='flex flex-col'>
        <div className='flex'>
        <span className='flex felx-col items-center'>Objetivos del Proyecto</span>
        {!maxObjetivos && (
          <div className='rounded-full bg-green-500 hover:bg-green-400 px-1 m-2 cursor-pointer'
            onClick={() => setListaObjetivos([...listaObjetivos, componenteObjetivoAgregado()])}>
            <i className='fas fa-plus '/>
          </div>
        )}
        </div>
        <div className='flex flex-col'>
          {listaObjetivos.map((objetivo) => {
            return objetivo;
          })}
        </div>
      </div>
    </ObjContext.Provider>
  );
};

const FormObjetivo = ({ id }) => {
  const { eliminarObjetivo } = useObj();
  return (
    <div className='flex items-center'>
      <Input
        name={`nested||objetivos||${id}||Description`}
        label='Descripción'
        type='text'
        required={true}
      />
      <DropDown
        name={`nested||objetivos||${id}||Type`}
        options={Enum_TipoObjetivo}
        label='Tipo de Objetivo'
        required={true}
      />
      <div className='flex flex-col rounded-full bg-red-500 hover:bg-red-400 text-white p-1 mx-2 cursor-pointer mt-6'
      onClick={() => eliminarObjetivo(id)}>
        <i className='fas fa-minus '/>
      </div>
    </div>
  );
};

export default NuevoProyecto;
