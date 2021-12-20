import { gql } from '@apollo/client';

const CREAR_INSCRIPCION = gql`
  mutation CreateInscription($Project: String!, $Student: String!) {
    CreateInscription(Project: $Project, Student: $Student) {
      _id
    }
  }
`;

const APROBAR_INSCRIPCION = gql`
  mutation ResponseInscription($responseInscriptionId: String!, $value:String!) {
    ResponseInscription (id: $responseInscriptionId, value: $value) {
      _id
    }
  }
`;

export { CREAR_INSCRIPCION, APROBAR_INSCRIPCION };
