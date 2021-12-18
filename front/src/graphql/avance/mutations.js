import { gql } from "@apollo/client";

const EDITAR_OBSERVACION = gql `
    mutation editarObservation($_id: String!, $Observations: String!) {
        editarObservation(_id: $_id, Observations: $Observations) {
        _id
        Observations
        }
    }
`

export {EDITAR_OBSERVACION}