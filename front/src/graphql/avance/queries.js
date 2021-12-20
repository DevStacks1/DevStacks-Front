import { gql } from "@apollo/client";

const FILTRAR_AVANCES = gql `
    query filtrarAvance($ProjectId: String!) {
        filtrarAvance(ProjectId: $ProjectId) {
        _id
        Date
        Observations
        CreatedBy {
            Name
            Lastname
        }
        }
    }
`
export {FILTRAR_AVANCES}