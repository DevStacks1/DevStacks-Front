import { gql } from '@apollo/client';

const REGISTRO = gql`
  mutation Registro(
    $Name: String!
    $Lastname: String!
    $Identification: String!
    $Email: String!
    $Role: Enum_Role!
    $Password: String!
  ) {
    registro(
      Name: $Name
      Lastname: $Lastname
      Identification: $Identification
      Email: $Email
      Role: $Role
      Password: $Password
    ) {
      token
      error
    }
  }
`;

const LOGIN = gql`
  mutation Login ($Email: String!, $Password: String!) {
    login(Email: $Email, Password: $Password) {
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