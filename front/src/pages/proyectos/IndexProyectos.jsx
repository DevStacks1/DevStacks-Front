import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { PROYECTOS } from 'graphql/proyectos/queries';
import DropDown from 'components/Dropdown';
import { Dialog } from '@mui/material';
import { Enum_EstadoProyecto } from 'utils/enums';
import { EDITAR_PROYECTO } from 'graphql/proyectos/mutations';
import useFormData from 'hooks/useFormData';
import PrivateComponent from 'components/PrivateComponent';
import { Link } from 'react-router-dom';
import { CREAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import { useUser } from 'context/userContext';
import { toast } from 'react-toastify';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';
import ReactLoading from 'react-loading';

const IndexProyectos = () => {
  const { data: queryData, loading, error } = useQuery(PROYECTOS);

  useEffect(() => {
    if (error){
      toast.error ("Error cargando proyectos")
    }
  }, [error])

  if (loading) return <div><ReactLoading type='spin' height={30} width={30} /></div>;
  
  if (queryData) {
    return (
      <div className='p-10 flex flex-col'>
        <div className='flex w-full items-center justify-center'>
          <h1 className='text-2xl font-bold text-gray-900'>PROJECT LIST</h1>
        </div>
        <PrivateComponent roleList={['ADMINISTRATOR', 'LEADER']}>
          <div className='my-2 self-end'>
            <button className='bg-indigo-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-indigo-400'>
              <Link to='/proyectos/nuevo'>Create new project</Link>
            </button>
          </div>
        </PrivateComponent>
        {queryData ? (queryData.Projects.map((proyect) => {
          return <AccordionProyecto proyecto={proyect} key={proyect._id} />;
        })) : (<div>No hay daticos</div>)}
      </div>
    );
  }
  return <>No hay datos <button className='bg-indigo-500 text-gray-50 p-2 rounded-lg shadow-lg hover:bg-indigo-400'>
  <Link to='/proyectos/nuevo'>Create new project</Link>
</button></>;
};

const AccordionProyecto = ({ proyecto }) => {
  const [showDialog, setShowDialog] = useState(false);
  return (
    <>
      <AccordionStyled>
        <AccordionSummaryStyled expandIcon={<i className='fas fa-chevron-down' />}>
          <div className='flex w-full justify-between'>
            <div className='uppercase font-bold text-gray-100 '>
              {proyecto.NameProject} - {proyecto.ProjectState}
            </div>
          </div>
        </AccordionSummaryStyled>
        <AccordionDetailsStyled>
        <PrivateComponent roleList={['ADMINISTRATOR']}>
            <div className='flex w-full justify-end'>
              <div onClick={() => {setShowDialog(true);}}>
                <i className='mx-4 fas fa-pen  hover:text-white cursor-pointer'/>
              </div>
              <div onClick={() => {setShowDialog(true);}}>
                <i className='mx-4 fas fa-trash text-red-600  hover:text-red-400 cursor-pointer'/>
              </div>
            </div>
          </PrivateComponent>
          <PrivateComponent roleList={['STUDENT']}>
            <InscripcionProyecto
              idProyecto={proyecto._id}
              estado={proyecto.ProjectState}
              inscripciones={proyecto.Inscriptions}
            />
          </PrivateComponent>
          <div>Liderado por: {proyecto.Leader.Name} {proyecto.Leader.Lastname}</div>
          <div>Documento: {proyecto.Leader.Identification}</div>
          <div className='flex'>
            {proyecto.Objectives.map((objetivo) => {
              return <Objetivo tipo={objetivo.Type} descripcion={objetivo.Description} />;
            })}
          </div>
        <PrivateComponent roleList={['ADMINISTRATOR','STUDENT']}>
            <InscripcionProyecto
              idProyecto={proyecto._id}
              estado={proyecto.ProjectState}
              inscripciones={proyecto.Inscriptions}
            />
        </PrivateComponent>
        </AccordionDetailsStyled>
      </AccordionStyled>
      <Dialog open={showDialog} 
        onClose={() => {setShowDialog(false);}}>
          <FormEditProyecto _id={proyecto._id} />
      </Dialog>
    </>
  );
};


const Objetivo = ({ tipo, descripcion }) => {
  return (
    <div className='mx-5 my-4 bg-gray-50 p-8 rounded-lg flex flex-col items-center justify-center shadow-xl'>
      <div className='text-lg font-bold'>{tipo}</div>
      <div>{descripcion}</div>
      <PrivateComponent roleList={['ADMINISTRATOR']}>
        <div>Edit</div>
      </PrivateComponent>
    </div>
  );
};

const InscripcionProyecto = ({ idProyecto, estado, inscripcion }) => {
  const [estadoInscripcion, setEstadoInscripcion] = useState('');
  const [crearInscripcion, { data, loading, error }] = useMutation(CREAR_INSCRIPCION);
  const { userData } = useUser();

  useEffect(() => {
    if (userData && inscripcion) {
      const flt = inscripcion.filter((el) => el.Student._id === userData._id);
      if (flt.length > 0) {
        setEstadoInscripcion(flt[0].Inscription_State);
      }
    }
  }, [userData, inscripcion]);

  useEffect(() => {
    if (data) {
      toast.success('Inscripcion creada con exito');
    }else if (error){
      toast.error("Error creando inscripción")
    }
  }, [data, error]);

  const confirmarInscripcion = () => {
    crearInscripcion({ variables: { Project: idProyecto, Student: userData._id } });
  };

  return (
    <>
      {estadoInscripcion !== '' ? (
        <span>you are already enrolled on this project - Status: {estadoInscripcion}</span>
      ) : (
      <button onClick={() => confirmarInscripcion()} disabled={estado === 'INACTIVE'} type='submit'
          className='bg-indigo-700 text-white font-bold text-lg py-3 px-6  rounded-xl
          hover:bg-indigo-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700'>
          {loading ? <ReactLoading type='spin' height={30} width={30} /> : <div>Enroll</div>}
      </button>)}
    </>
  );
};

const FormEditProyecto = ({ _id }) => {
  const { form, formData, updateFormData } = useFormData();
  const [editarProyecto, { data: dataMutation, loading, error }] = useMutation(EDITAR_PROYECTO);

  const submitForm = (e) => {
    e.preventDefault();
    editarProyecto({
      variables: {
        _id,
        Fields: formData,
      },
    });
  };

  useEffect(() => {
    console.log('data mutation', dataMutation);
    if (dataMutation){
      toast.success("Proyecto editado con exito");
    }else if (error){
      toast.error("Error editando proyecto");
    }
  }, [dataMutation, error]);

  return (
    <div className='p-4'>
      <h1 className='font-bold'>Modify project state</h1>
      <form ref={form} onChange={updateFormData} onSubmit={submitForm}
        className='flex flex-col items-center'>
        <DropDown label='Estado del Proyecto' name='ProjectState' options={Enum_EstadoProyecto} />
        <button onClick={() => {}} disabled={Object.keys(formData).length === 0} type='submit'
          className='bg-indigo-700 text-white font-bold text-lg py-3 px-6 
          rounded-xl hover:bg-indigo-500 shadow-md my-2 disabled:opacity-50 disabled:bg-gray-700'>
            {loading ? <ReactLoading type='spin' height={30} width={30} /> : <div> CONFIRM </div>}
        </button>
      </form>
    </div>
  );
};

export default IndexProyectos;
