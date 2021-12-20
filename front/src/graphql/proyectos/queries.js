import { gql } from '@apollo/client';

const PROYECTOS = gql`
  query Projects {
    Projects {
      _id
      
      NameProject
      ProjectState
      Objectives {
        Description
        Type
      }
      Leader {
        _id
        Email
        Name
        Lastname
        Identification
      }
      Inscriptions {
        Inscription_State
        Student {
          _id
        }
      }
    }
  }
`;

export { PROYECTOS };
