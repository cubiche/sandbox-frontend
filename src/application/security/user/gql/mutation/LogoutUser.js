import gql from 'graphql-tag';

export default gql`
mutation logoutUser($userId: ID!) {
  logoutUser(userId: $userId)
}
`