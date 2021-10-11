import { gql } from "@apollo/client";

const VIEW_FRIENDS = gql`
                    query ViewFriends {
                    friends{
                        id
                        firstname
                        lastname
                        phone
                        age
                    }
                    }
                `;

export default VIEW_FRIENDS;