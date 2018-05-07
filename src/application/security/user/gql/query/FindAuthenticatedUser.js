import gql from 'graphql-tag';

export default gql`
    query findAuthenticatedUser {
        me {
            id
            username
            email
            permissions
        }
    }
`