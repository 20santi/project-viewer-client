// Import the necessary dependencies.
import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "../clients/api";
import { getCurrentUserQuery, getUserByIdQuery } from "../graphql/Queries/user";
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

export const useGetuserById = (id: string) => {
  const query = useQuery({
    queryKey: ["user-by-id"],
    queryFn: async () => {
      const data = await graphQLClient.request(
        getUserByIdQuery as TypedDocumentNode, {id}
      );
      return data;
    },
  })
  return { ...query, user: query.data?.getUserById };
}
