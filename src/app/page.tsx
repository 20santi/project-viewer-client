"use client";
import Image from "next/image";
import React, { useState } from "react";
import FeedCard from "./Components/Feedcard";
import { useGetAllTweets } from "./hooks/tweet";
import { Tweet } from "../../gql/graphql";
import { useCurrentUser } from "./hooks/user";
import TwitterLayout from "./Components/Feedcard/Layout/pageLayout";
import { Modal } from "./Components/common/Modal";
import { BsSearch } from "react-icons/bs";

export default function Home() {
  const { user } = useCurrentUser();
  const [modal, setModal] = useState(false);
  const { tweets = [] } = useGetAllTweets();

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#f3f2ef] text-black relative">
      <div className="w-[90%] h-full mx-auto sm:flex">
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
        <div className="flex sticky w-[400px] overflow-scroll scrollbar-none mt-20 flex-col">
          <div>
            <div className="relative w-full h-full bg-white text-black rounded-full group p-4 hover:border hover:border-primary">
              <label
                htmlFor="searchBox"
                className="absolute top-0 h-full flex items-center justify-center"
              >
                <BsSearch className="w-5 h-5 text-gray-500 group-hover:text-primary" />
              </label>
              <input
                id="searchBox"
                type="text"
                placeholder="Search People"
                className="w-full h-full outline-none bg-transparent pl-7"
              />
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-white text-black my-4">
            <h3 className="font-bold text-2xl my-4 p-4">You can Follow them</h3>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="hover:bg-slate-100 p-4 flex space-x-4 items-center last:rounded-b-xl transition duration-200"
                >
                  <div id="10" className="w-[40px] h-[40px] bg-neutral-600 rounded-full"></div>
                  <div className="flex flex-col">
                    <div className="font-bold">Other User</div>
                    <div className="text-gray-500 text-xs">@otheruser1234</div>
                  </div>
                  <div>
                    <button className="rounded-full px-6 py-2 bg-white text-neutral-950">
                      Follow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col rounded-xl bg-white text-black my-4">
            <h3 className="font-bold text-2xl my-4 p-4">What happening</h3>
            <div>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="hover:bg-white/10 p-4 last:rounded-b-xl transition duration-200"
                >
                  <div className="font-bold text-lg">#trending ${i + 1}</div>
                  <div className="text-xs text-neutral-400">35.4k</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
