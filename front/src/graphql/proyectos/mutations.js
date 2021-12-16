import { gql } from '@apollo/client';

const EDITAR_PROYECTO = gql`
  mutation UpdateProject($_id: String!, $Fields: ProjectFields!) {
    UpdateProject(idProject: $_id, Fields: $Fields) {
      _id
      ProjectState
    }
  }
`;

const CREAR_PROYECTO = gql`
  mutation CreateProject(
    $NameProject: String!
    $Budget: Float!
    $Initial_Date: Date!
    $Final_Date: Date!
    $Leader: String!
    $Objectives: [CreateObjective]
  ) {
    CreateProject(
      NameProject: $NameProject
      Budget: $Budget
      Initial_Date: $Initial_Date
      Final_Date: $Final_Date
      Leader: $Leader
      Objectives: $Objectives
    ) {
      _id
    }
  }
`;

export { EDITAR_PROYECTO, CREAR_PROYECTO };
