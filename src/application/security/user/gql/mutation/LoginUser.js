import gql from 'graphql-tag';

export default gql`
mutation loginUser($usernameOrEmail: String!, $password: String!) {
  loginUser(usernameOrEmail: $usernameOrEmail, password: $password)
}
`