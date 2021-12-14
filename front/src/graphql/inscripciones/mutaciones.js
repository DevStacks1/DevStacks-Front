import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
  mutation Mutation($Project: String!, $Student: String!) {
    crearInscripcion(Project: $Project, Student: $Student) {
      _id
    }
  }
`;

const APROBAR_INSCRIPCION = gql`
  mutation AprobarInscripcion($approveInscriptionId: String!) {
    aprobarInscripcion(id: $approveInscriptionId) {
      _id
    }
  }
`;

export { CREAR_INSCRIPCION, APROBAR_INSCRIPCION };
