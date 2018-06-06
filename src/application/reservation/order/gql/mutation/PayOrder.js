import gql from 'graphql-tag';

export default gql`
mutation payOrder ($orderId: ID!) { 
	payOrder(orderId: $orderId) {
        id
        conferenceId
        numberOfTickets
        state
  }
}
`