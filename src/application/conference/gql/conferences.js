import gql from 'graphql-tag';

export default gql`
    query conferences {
        conferences {
            id
            name
            city
            country
            availableTickets
            price
            currency
            startAt
          	endAt
        }
    }
`