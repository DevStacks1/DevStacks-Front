import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import PrivateRoute from 'components/PrivateRoute';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { APROBAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import { useUser } from 'context/userContext';
import { nanoid } from 'nanoid';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';
import ReactLoading from 'react-loading';

const IndexInscripciones = () => {
  const { data, loading, error, refetch } = useQuery(GET_INSCRIPCIONES);
  const {userData} = useUser();
  useEffect(() => {
    if (error){
      toast.error("Error cargando inscripciones")
    }
  }, [error])

  if (loading) return <div><ReactLoading type='spin' height={30} width={30} /></div>;
  if (data && userData){
    return (
      <PrivateRoute roleList={['ADMINISTRATOR', 'LEADER']}>
        <div className='p-10'>
          <div>INSCRIPTIONS</div>
          <div className='my-4'>
            <AccordionInscripcion
              titulo='Approved inscriptions'
              data={(userData.Role === "LEADER") ? (data.Inscriptions.filter((ins) => ins.Inscription_State === 'ACCEPTED' && userData._id === ins.Project.Leader._id )):(
                data.Inscriptions.filter((ins) => ins.Inscription_State === 'ACCEPTED'))}
            />
            <AccordionInscripcion
              titulo='Pending inscriptions'
              data={(userData.Role === "LEADER") ? (data.Inscriptions.filter((ins) => ins.Inscription_State === 'PENDING' && userData._id === ins.Project.Leader._id )):(
                data.Inscriptions.filter((ins) => ins.Inscription_State === 'PENDING'))}
              refetch={refetch}
            />
            <AccordionInscripcion
              titulo='Rejected inscriptions'
              data={(userData.Role === "LEADER") ? (data.Inscriptions.filter((ins) => ins.Inscription_State === 'REJECTED'&& userData._id === ins.Project.Leader._id )):(
                data.Inscriptions.filter((ins) => ins.Inscription_State === 'REJECTED'))}
            />
          </div>
        </div>
      </PrivateRoute>
    );
  }
  return <div>NO HAY DATOS</div>;
};

const AccordionInscripcion = ({ data, titulo, refetch = () => {} }) => {
  return (
    <AccordionStyled >
      <AccordionSummaryStyled>
        {titulo} ({data.length})
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>
        <div className='flex'>
          {data &&
            data.map((inscripcion) => {
              return <Inscripcion inscripcion={inscripcion} refetch={refetch} key={nanoid()}/>;
            })}
        </div>
      </AccordionDetailsStyled>
    </AccordionStyled>
  );
};

const Inscripcion = ({ inscripcion, refetch }) => {
  const [aprobarInscripcion, { data, loading, error }] = useMutation(APROBAR_INSCRIPCION);

  useEffect(() => {
    if (data) {
      toast.success('Inscripcion actualizada con exito');
      refetch();
    }else if (error) {
      toast.error('Error actualizando la inscripcion');
    }
  }, [data, error ,refetch]);

  const cambiarEstadoInscripcion = (res) => {
    aprobarInscripcion({
      variables: {
        responseInscriptionId: inscripcion._id,
        value: res
      },
    });
  };

  return (
    <div className='bg-gray-900 text-gray-50 flex flex-col p-6 m-2 rounded-lg shadow-xl'>
      <span>{inscripcion.Project.NameProject}</span>
      <span>{inscripcion.Student.Name}</span>
      <span>{inscripcion.Inscription_State}</span>
      {inscripcion.Inscription_State === 'PENDING' && ( <div className='flex flex-col'>
        <ButtonLoading
          onClick={(e) => {
            cambiarEstadoInscripcion(e.target.value);
          }}
          text='Approve'
          loading={loading}
          disabled={false}
          color="green"
          value ="ACCEPTED"
        />
        <ButtonLoading
          onClick={(e) => {
            cambiarEstadoInscripcion(e.target.value);
          }}
          text='Reject'
          loading={loading}
          disabled={false}
          color="red"
          value="REJECTED"
        />
      </div>
        
      )}
    </div>
  );
};

export default IndexInscripciones;
