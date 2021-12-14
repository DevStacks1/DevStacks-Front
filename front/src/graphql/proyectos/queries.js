import { gql } from '@apollo/client';

const PROYECTOS = gql`
  query Project {
    Project {
      _id
      Name
      State
      Objectives {
        Description
        Type
      }
      Leader {
        _id
        Email
      }
      Inscriptions {
        State
        Student {
          _id
        }
      }
    }
  }
`;

export { PROYECTOS };
