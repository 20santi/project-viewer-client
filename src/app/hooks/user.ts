// Import the necessary dependencies.
import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "../clients/api";
import { getCurrentUserQuery } from "../graphql/Queries/user";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const data = await graphQLClient.request(
        getCurrentUserQuery as TypedDocumentNode
      );
      return data;
    },
  });

  return { ...query, user: query.data?.getCurrentUser };
};
