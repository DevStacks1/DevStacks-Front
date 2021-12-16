import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
  mutation Mutation($Project: String!, $Student: String!) {
    crearInscripcion(Project: $Project, Student: $Student) {
      _id
    }
  }
`;

const APROBAR_INSCRIPCION = gql`
  mutation AcceptInscriptions($approveInscriptionId: String!) {
    AcceptInscriptions (id: $approveInscriptionId) {
      _id
    }
  }
`;

export { CREAR_INSCRIPCION, APROBAR_INSCRIPCION };
