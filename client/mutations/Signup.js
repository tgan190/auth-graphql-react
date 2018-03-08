import gql from 'graphql-tag';

export default gql`
    mutation Signup ($email: String, $password: String) {
        signup (password: $password, email: $email) {
  	        id
            email
        }
    }
`;