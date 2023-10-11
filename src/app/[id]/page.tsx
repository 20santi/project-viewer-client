"use client";
import type { NextPage } from "next";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCurrentUser, useGetuserById } from "../hooks/user";
import FeedCard from "../Components/Feedcard";
import { Tweet } from "../../../gql/graphql";
import TwitterLayout from "../Components/Feedcard/Layout/pageLayout";
import { useCallback, useMemo } from "react";
import { graphQLClient } from "../clients/api";
import { followUserMutation, unfollowUserMutation } from "../graphql/mutation/user";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { useQueryClient } from "@tanstack/react-query";

const UserProfilePage: NextPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[1];
  const { user } = useGetuserById(id);
  const { user: currentUser } = useCurrentUser();
  const queryClient = useQueryClient();

  const amIFollowing = useMemo(() => {
    if (!user) return false;
    return (
      (currentUser?.following?.findIndex(
        (ele: { id: string }) => ele?.id === user?.id
      ) ?? -1) >= 0
    );
  }, [currentUser?.id, user]);

  const handleFollowUser = useCallback(async () => {
    if (!user || !user.id) return;

    await graphQLClient.request(followUserMutation as TypedDocumentNode, {
      to: user?.id,
    });
    await queryClient.invalidateQueries(["current-user"]);
  }, [user?.id, queryClient]);

  const handleUnFollowUser = useCallback(async () => {
    if (!user.id) return;

    await graphQLClient.request(unfollowUserMutation as TypedDocumentNode, {
      to: user?.id,
    });
    await queryClient.invalidateQueries(["current-user"]);
  }, [user?.id, queryClient]);

  return (
    <div>
      <TwitterLayout>
        <div>
          <nav className="flex items-center gap-3 px-3">
            <BsArrowLeftShort className="text-4xl" />
            <div>
              <h1 className="text-2xl font-bold">
                {user?.firstName} {user?.lastName}
              </h1>
              <h1 className="text-md font-bold text-slate-500">
                {user?.tweets.length} Project
              </h1>
            </div>
          </nav>
          <div className="p-4 border-b border-slate-800">
            {user?.profileImageURL && (
              <Image
                src={user?.profileImageURL}
                alt="user-image"
                width={100}
                height={100}
                className="rounded-full"
              />
            )}
            <h1 className="text-2xl font-bold">
              {user?.firstName} {user?.lastName}
            </h1>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 mt-2 text-sm text-gray-400">
                <span>{user?.followers?.length} Followers</span>
                <span>{user?.following?.length} Following</span>
              </div>
              {currentUser?.id !== user?.id && (
                <>
                  {amIFollowing ? (
                    <button
                      onClick={handleUnFollowUser}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={handleFollowUser}
                      className="bg-white text-black px-3 py-1 rounded-full text-sm"
                    >
                      Follow
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-y-5">
            {user?.tweets?.map((tweet: Tweet) => (
              <FeedCard data={tweet as Tweet} key={tweet?.id} />
            ))}
          </div>
        </div>
      </TwitterLayout>
    </div>
  );
};

export default UserProfilePage;
