import Image from "next/image";
import React from "react";
import { BiBarChart, BiLike, BiRepost, BiUpload } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { Tweet } from "../../../../gql/graphql";
import Link from "next/link";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;

  return (
    <div className="border border-slate-300 rounded-xl bg-white p-5 transition-all cursor-pointer">
      <div className="flex flex-col">
        <div className="flex gap-x-2 min-w-[600px]">
          <div className="w-[10%]">
            {data.author?.profileImageURL && (
              <Image
                src={data.author?.profileImageURL}
                priority={true}
                alt="user-image"
                height={50}
                width={50}
                className="rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col gap-y-2 w-[88%]">
            <h5 className="font-bold">
              <Link href={`/${data.author?.id}`}>
                {data.author?.firstName} {data.author?.lastName}
              </Link>
            </h5>
            <p className="text-slate-500 text-[14px]">{data.content}</p>
            <div className="flex w-full">
            {data.imageURL && (
              <Image
                src={data.imageURL}
                priority={true}
                alt="tweet-image"
                width={400}
                height={400}
              />
            )}
            </div>
            <div className="flex justify-between mt-5 text-xl items-center w-full">
              <BiLike />
              <BiRepost />
              <FaRegCommentDots />
              <BiBarChart />
              <BiUpload />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
