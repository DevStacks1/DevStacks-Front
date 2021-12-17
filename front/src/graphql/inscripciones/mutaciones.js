import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
  mutation CreateInscription($Project: String!, $Student: String!) {
    CreateInscription(Project: $Project, Student: $Student) {
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
