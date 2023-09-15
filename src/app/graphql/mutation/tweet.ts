import { graphql } from "../../../../gql";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { CreateTweetData } from "../../../../gql/graphql";

export const createTweetMutation = graphql(`
  #graphql
  mutation CreateTweet($payload: CreateTweetData!) {
    createTweet(payload: $payload) {
        id
    }
  }
`)as TypedDocumentNode<{ payload: CreateTweetData }>;