import gql from 'graphql-tag';

export default gql`
mutation createOrder ($conferenceId: ID!, $numberOfTickets: Int!) { 
	createOrder(conferenceId: $conferenceId, numberOfTickets: $numberOfTickets) {
        id
        conferenceId
        numberOfTickets
        state
  }
}
`