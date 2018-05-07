import gql from 'graphql-tag';

export default gql`
mutation resetUserPassword($userId: ID!, $password: String!) {
  resetUserPassword(userId: $userId, password: $password)
}
`