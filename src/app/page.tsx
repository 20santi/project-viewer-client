"use client";
import React, { useCallback, useEffect, useState } from "react";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiImageAlt, BiUser } from "react-icons/bi";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import FeedCard from "./Components/Feedcard";
import { graphQLClient } from "./clients/api";
import toast from "react-hot-toast";
import { verifyUserGoogleTokenQuery } from "./graphql/Queries/user";
import { useCurrentUser } from "./hooks/user";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useCreateTweet, useGetAllTweets } from "./hooks/tweet";
import { Tweet } from "../../gql/graphql";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
}

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    title: "Explore",
    icon: <BiHash />,
  },
  {
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    title: "Profile",
    icon: <BiUser />,
  },
];

export default function Home() {
  const { user } = useCurrentUser();
  const { tweets = [] } = useGetAllTweets();
  const {mutate} = useCreateTweet();
  const queryClient = useQueryClient();

  const [content, setContent] = useState("")

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, [])

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
    })
  },[content, mutate]);

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;
      if (!googleToken) {
        return toast.error(`Google token not found`);
      }
      const { verifyGoogleToken } = await graphQLClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Success");
      console.log(verifyGoogleToken);

      if (verifyGoogleToken) {
        window.localStorage.setItem("__token", verifyGoogleToken);

        await queryClient.invalidateQueries(["current-user"]);
      }
    },
    [queryClient]
  );

  return (
    <div className="grid grid-cols-12 h-screen w-screen bg-black text-white relative">
      <div className="col-span-3 border-r-slate-900 pr-10 pl-24">
        <div className="col-span-3 flex justify-start pt-8 object-fill">
          <BsTwitter className="text-4xl h-fit w-fit hover:bg-gray-700 p-2 rounded-full cursor-pointer transition-all" />
        </div>
        <div className="mt-4 text-xl font-bold">
          <ul>
            {sidebarMenuItems.map((item) => (
              <li
                className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full px-5 py-2 w-fit cursor-pointer"
                key={item.title}
              >
                <span>{item.icon}</span>
                <span className="font-normal">{item.title}</span>
              </li>
            ))}
          </ul>
          <button className="bg-[#1d9bf0] p-3 mt-5 rounded-full w-full font-semibold">
            Post
          </button>
        </div>
      </div>
      {user && (
        <div className="absolute bottom-5 left-[50px] flex gap-2 items-center bg-slate-800 px-3 py-1 rounded-full">
          {user && user.profileImageUrl && (
            <Image
              className="rounded-full"
              src={user?.profileImageUrl}
              alt="user-image"
              height={40}
              width={40}
            />
          )}
          <h3 className="text-sm">
            {user.firstName} {user.lastName}
          </h3>
        </div>
      )}
      <div className="col-span-6 border-r-[1px] border-l-[1px] h-screen overflow-scroll scrollbar-none border-gray-900">
        <div className="border border-r-0 border-l-0 border-slate-900 p-5 hover:bg-slate-900 transition-all cursor-pointer">
          <div className="grid grid-cols-12">
            <div className="col-span-1">
              {user?.profileImageUrl && (
                <Image
                  src={user?.profileImageUrl}
                  alt="user-image"
                  height={50}
                  width={50}
                  className="rounded-full"
                />
              )}
            </div>
            <div className="col-span-11">
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
                placeholder="Whats happening ?"
                rows={3}
              ></textarea>
              <div className="mt-2 flex justify-between items-center">
                <BiImageAlt className="text-xl" onClick={handleSelectImage}/>
                <button
                  onClick={handleCreateTweet}
                  className="bg-[#1d9bf0] p-3 mt-5 rounded-full text-sm px-4 py-2 font-semibold"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
        {
          tweets?.map((tweet: any) => tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet}/> : null)
        }
      </div>
      <div className="col-span-3 p-5">
        {!user && (
          <div className="p-5 bg-slate-700 rounded-lg">
            <h1 className="my-2 text-xl">New to Twitter ?</h1>
            <GoogleLogin onSuccess={handleLoginWithGoogle} />
          </div>
        )}
      </div>
    </div>
  );
}
