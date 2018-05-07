import gql from 'graphql-tag';

export default gql`
    query findAllRoles {
        roles {
            id
            name            
            permissions
        }
    }
`