import gql from 'graphql-tag';

export default gql`
    query findAllMyOrders {
        myOrders {
          id
          conference
          numberOfTickets
          state
        }
    }
`