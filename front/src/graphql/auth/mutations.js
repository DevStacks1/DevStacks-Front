import { gql } from '@apollo/client';

const REGISTRO = gql`
  mutation Registro(
    $Name: String!
    $Lastname: String!
    $Identification: String!
    $Password: String!
    $Email: String!
    $Role: Enum_Role!
  ) {
    CreateUser(
      nombre: $Name
      apellido: $Lastname
      identificacion: $Identification
      correo: $Email
      rol: $Role
      password: $Password
    ) {
      token
      error
    }
  }
`;

const LOGIN = gql`
  mutation Login(
    $Email: String!, 
    $Password: String!) {
    login(
      correo: $Email, 
      password: $Password) {
      token
      error
    }
  }
`;

const REFRESH_TOKEN = gql`
  mutation RefreshToken {
    refreshToken {
      token
      error
    }
  }
`;

export { REGISTRO, LOGIN, REFRESH_TOKEN };
