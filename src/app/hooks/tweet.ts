import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { graphQLClient } from "../clients/api"
import { getAllTweetsQuery } from "../graphql/Queries/tweet"
import { TypedDocumentNode } from "@graphql-typed-document-node/core"; 
import { CreateTweetData } from "../../../gql/graphql";
import { createTweetMutation } from "../graphql/mutation/tweet";
import toast from "react-hot-toast";

export const useCreateTweet = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: async (payload: CreateTweetData) => {
        const data = await graphQLClient.request(createTweetMutation, { payload });
        return data;
    },
        onMutate: (payload) => toast.loading("Post project...", { id: "1" }),
        onSuccess: async (payload) => {
            await queryClient.invalidateQueries(['all-tweets']),
            toast.success("Project Post", { id: "1" })
        }
    });

    return mutation;
}

export const useGetAllTweets = () => {
    const query = useQuery({
        queryKey: ['all-tweets'],
        queryFn: async () => {
            const data = await graphQLClient.request(getAllTweetsQuery as TypedDocumentNode)
            return data;
        }
    });
    return { ...query, tweets: query.data?.getAllTweets };
}