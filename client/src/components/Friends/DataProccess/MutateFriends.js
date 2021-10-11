import { gql } from '@apollo/client';

const CREATE_FRIENDS = gql`
                        mutation ($firstName: String!, $lastName: String!, $phone: String!, $age: Float!) {
                            addFriend ( firstname: $firstName, lastname: $lastName, phone: $phone, age: $age )
                            {
                                id
                                firstname
                                lastname
                                phone
                                age
                            }
                        }
                    `;

export default CREATE_FRIENDS;