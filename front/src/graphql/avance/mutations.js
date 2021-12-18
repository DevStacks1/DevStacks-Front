import { gql } from "@apollo/client";

const EDITAR_OBSERVACION = gql `
    mutation editarObservation($_id: String!, $observations: String!) {
        editarObservation(_id: $_id, Observations: $observations) {
        _id
        Observations
        }
    }
`

export {EDITAR_OBSERVACION}