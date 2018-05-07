import gql from 'graphql-tag';

export default gql`
    query findOneUserByPasswordResetToken($passwordResetToken: String!) {
        userByPasswordResetToken(passwordResetToken: $passwordResetToken) {
            id
            username
            email
            permissions
        }
    }
`