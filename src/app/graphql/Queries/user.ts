//It defines a GraphQL query named VerifyUserGoogleToken, which takes a single parameter named
//$token of type String

//The body of the query calls a GraphQL server-side resolver function named verifyGoogleToken and
//passes the $token parameter to it

import { graphql } from "../../../../gql";

export const verifyUserGoogleTokenQuery: any = graphql(`
  #graphql
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogleToken(token: $token)
  }
`);

export const getCurrentUserQuery = graphql(`
  #graphql
  query GetCurrentUser {
    getCurrentUser {
      id
      profileImageURL
      email
      firstName
      lastName
      tweets {
        id
        content
        author {
          profileImageURL
        }
      }
    }
  }
`);
