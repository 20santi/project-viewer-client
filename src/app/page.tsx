"use client";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import FeedCard from "./Components/Feedcard";
import { useCreateTweet, useGetAllTweets } from "./hooks/tweet";
import { Tweet } from "../../gql/graphql";
import { useCurrentUser } from "./hooks/user";
import TwitterLayout from "./Components/Feedcard/Layout/pageLayout";
import { Modal } from "./Components/common/Modal";

export default function Home() {
  const { user } = useCurrentUser();
  const [content, setContent] = useState("");
  const [modal, setModal] = useState(false);
  const { tweets = [] } = useGetAllTweets();
  const { mutate } = useCreateTweet();

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleCreateTweet = useCallback(() => {
    mutate({
      content,
      imageURL: user?.profileImageURL,
    });
  }, [content, mutate]);

  return (
    <div>
      <TwitterLayout>
        <div className="flex items-center justify-center gap-x-5 border bg-white p-5 border-slate-300 rounded-xl transition-all cursor-pointer">
          <div>
            {user?.profileImageURL && (
              <Image
                src={user?.profileImageURL}
                alt="user-image"
                height={50}
                width={50}
                className="rounded-full"
              />
            )}
          </div>
          <div
            onClick={() => setModal(true)}
            className="w-full p-4 border border-gray-400 rounded-full bg-white hover:bg-[#f3f2ef]"
          >
            <p className="text-gray-400">Share your Project</p>
          </div>
        </div>
        <div className="w-full bg-gray-300 h-[1px] mt-5"></div>
        <div className="mt-5 flex flex-col gap-y-5">
          {tweets?.map((tweet: any) =>
            tweet ? <FeedCard key={tweet?.id} data={tweet as Tweet} /> : null
          )}
        </div>
        {modal ? <Modal setModal={setModal} /> : <div></div>}
      </TwitterLayout>
    </div>
  );
}
