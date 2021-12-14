import { gql } from '@apollo/client';

const GET_USUARIOS = gql`
  query Users {
    Users {
      _id
      Name
      Lastname
      Email
      State
      Identification
      Role
    }
  }
`;

const GET_USUARIO = gql`
  query User($_id: String!) {
    User(_id: $_id) {
      _id
      Name
      Lastname
      Email
      State
      Identification
      Role
    }
  }
`;

export { GET_USUARIOS, GET_USUARIO };