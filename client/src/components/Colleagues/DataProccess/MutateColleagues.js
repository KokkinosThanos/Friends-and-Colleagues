import { gql } from '@apollo/client';

const CREATE_COLLEAGUES = gql`
                        mutation ($firstName: String!, $lastName: String!, $phone: String!, $email: String!) {
                            createColleaugue (firstName: $firstName, lastName: $lastName, phone: $phone, email: $email)
                            {
                                id
                                firstName
                                lastName
                                phone
                                email
                            }
                        }
                    `;

export default CREATE_COLLEAGUES;