import { gql } from '@apollo/client';

const GET_INSCRIPCIONES = gql`
  query Inscriptions {
    Inscriptions {
      _id
      Inscription_State
      Student {
        _id
        Name
        Lastname
        Email
      }
      Project {
        _id
        NameProject
        Leader {
          _id
        }
      }
    }
  }
`;

export { GET_INSCRIPCIONES };
