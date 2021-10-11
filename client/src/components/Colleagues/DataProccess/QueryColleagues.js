import { gql } from "@apollo/client";

const VIEW_COLLEAGUES = gql`
                            query ViewColleagues {
                                colleagues{
                                    id
                                    firstName
                                    lastName
                                    phone
                                    email
                                }
                            }
                            `;

export default VIEW_COLLEAGUES;