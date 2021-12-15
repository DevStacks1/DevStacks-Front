import React, { useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import PrivateRoute from 'components/PrivateRoute';
import { GET_INSCRIPCIONES } from 'graphql/inscripciones/queries';
import { APROBAR_INSCRIPCION } from 'graphql/inscripciones/mutaciones';
import ButtonLoading from 'components/ButtonLoading';
import { toast } from 'react-toastify';
import {
  AccordionStyled,
  AccordionSummaryStyled,
  AccordionDetailsStyled,
} from 'components/Accordion';

const IndexInscripciones = () => {
  const { data, loading, error, refetch } = useQuery(GET_INSCRIPCIONES);
  useEffect(() => {
    console.log("inscripciones",data)
  }, [data])

  if (loading) return <div>Loading...</div>;
  if (data){
    return (
      <PrivateRoute roleList={['ADMINISTRATOR', 'LEADER']}>
        <div className='p-10'>
          <div>INSCRIPTIONS</div>
          <div className='my-4'>
            <AccordionInscripcion
              titulo='Approved inscriptions'
              data={data.Inscriptions.filter((ins) => ins.Inscription_State === 'ACCEPTED')}
            />
            <AccordionInscripcion
              titulo='Pending inscriptions'
              data={data.Inscriptions.filter((ins) => ins.Inscription_State === 'PENDING')}
              refetch={refetch}
            />
            <AccordionInscripcion
              titulo='Rejected inscriptions'
              data={data.Inscriptions.filter((ins) => ins.Inscription_State === 'REJECTED')}
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
    <AccordionStyled>
      <AccordionSummaryStyled>
        {titulo} ({data.length})
      </AccordionSummaryStyled>
      <AccordionDetailsStyled>
        <div className='flex'>
          {data &&
            data.map((inscripcion) => {
              return <Inscripcion inscripcion={inscripcion} refetch={refetch} />;
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
      toast.success('Inscripcion aprobada con exito');
      refetch();
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error('Error aprobando la inscripcion');
    }
  }, [error]);

  const cambiarEstadoInscripcion = () => {
    aprobarInscripcion({
      variables: {
        aprobarInscripcionId: inscripcion._id,
      },
    });
  };

  return (
    <div className='bg-gray-900 text-gray-50 flex flex-col p-6 m-2 rounded-lg shadow-xl'>
      <span>{inscripcion.Project.NameProject}</span>
      <span>{inscripcion.Student.Name}</span>
      <span>{inscripcion.Inscription_State}</span>
      {inscripcion.Inscription_State === 'PENDING' && (
        <ButtonLoading
          onClick={() => {
            cambiarEstadoInscripcion();
          }}
          text='Approve inscription'
          loading={loading}
          disabled={false}
        />
      )}
    </div>
  );
};

export default IndexInscripciones;
