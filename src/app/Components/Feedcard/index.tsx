import Image from "next/image";
import React from "react";
import { BiBarChart, BiLike, BiRepost, BiUpload } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { Tweet } from "../../../../gql/graphql";

interface FeedCardProps {
  data: Tweet;
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const { data } = props;

  return (
    <div className="border border-slate-300 rounded-xl bg-white p-5 transition-all cursor-pointer">
      <div className="">
        <div className="flex gap-x-2 items-center min-w-[600px]">
          <div>
            {data.author?.profileImageURL && (
              <Image
                src={data.author?.profileImageURL}
                alt="user-image"
                height={50}
                width={50}
                className="rounded-full"
              />
            )}
          </div>
          <div className="">
            <h5 className="">
              {data.author?.firstName} {data.author?.lastName}
            </h5>
            <p>{data.content}</p>
          </div>
        </div>
        <div className="flex justify-between mt-5 text-xl items-center p-2 pr-5">
          <BiLike />
          <BiRepost />
          <FaRegCommentDots />
          <BiBarChart />
          <BiUpload />
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
