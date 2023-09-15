// Import the necessary dependencies.
import { useQuery } from "@tanstack/react-query";
import { graphQLClient } from "../clients/api";
import { TypedDocumentNode } from "@graphql-typed-document-node/core"; 
import { getCurrentUserQuery } from "../graphql/Queries/user";

// Define a type for the user data returned by the query.
interface UserData {
    getCurrentUser: {
        id: string;
        profileImageUrl: string;
        email: string;
        firstName: string;
        lastName: string;
    };
}

export const useCurrentUser = () => {
    const query = useQuery<UserData>({
        queryKey: ["current-user"],
        queryFn: async () => {
            const data = await graphQLClient.request<UserData>(getCurrentUserQuery as TypedDocumentNode<UserData>);
            return data;
        }
    });

    return { ...query, user: query.data?.getCurrentUser };
}
