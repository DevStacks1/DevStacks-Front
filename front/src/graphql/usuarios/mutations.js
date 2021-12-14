import { gql } from '@apollo/client';

const EDITAR_USUARIO = gql`
  mutation EditarUsuario(
    $_id: String!
    $Name: String!
    $Lastname: String!
    $Identification: String!
    $Email: String!
    $State: Enum_StateUsuario!
  ) {
    editarUsuario(
      _id: $_id
      Name: $Name
      Lastname: $Lastname
      Identification: $Identification
      Email: $Email
      State: $State
    ) {
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

export { EDITAR_USUARIO };
