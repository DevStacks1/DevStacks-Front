import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
  query Inscripciones {
    Inscripciones {
      _id
      Inscription_State
      Student {
        _id
        Name
        Lastname
        Email
      }
      Proyect {
        _id
        Name
        lider {
          _id
        }
      }
    }
  }
`;

export { GET_INSCRIPCIONES };
