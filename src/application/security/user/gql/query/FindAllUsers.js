import gql from 'graphql-tag';

export default gql`
    query findAllUsers {
        users {
            id
            username
            email            
            permissions
            verified
            enabled
        }
    }
`