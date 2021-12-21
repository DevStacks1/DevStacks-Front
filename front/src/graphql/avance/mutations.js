import { gql } from "@apollo/client";

const EDITAR_OBSERVACION = gql `
    mutation editarObservation($_id: String!, $Observations: String!) {
        editarObservation(_id: $_id, Observations: $Observations) {
        _id
        Observations
        }
    }
`
const CREAR_AVANCE = gql `
    mutation crearAvance($date: Date!, $observations: String!, $project: String!, $createdBy: String!) {
        crearAvance(Date: $date, Observations: $observations, Project: $project, CreatedBy: $createdBy) {
        _id
        Observations
        }
    }
`

export {EDITAR_OBSERVACION, CREAR_AVANCE}