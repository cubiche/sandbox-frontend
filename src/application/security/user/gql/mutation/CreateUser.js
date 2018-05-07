import gql from 'graphql-tag';

export default gql`
mutation createUser($username: String!, $email: String!, $password: String!, $roles: [ID]!, $verificationByEmail: Boolean!) {
  createUser(username: $username, email: $email, password: $password, roles: $roles, verificationByEmail: $verificationByEmail) {
    id
    username
    email            
    permissions
  }
}
`