import gql from 'graphql-tag';

export default gql`
mutation resetUserPasswordRequest($email: String!) {
  resetUserPasswordRequest(email: $email)
}
`