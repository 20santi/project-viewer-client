import Image from "next/image";
import React from "react";
import { BiBarChart, BiLike, BiRepost, BiUpload } from "react-icons/bi";
import { FaRegCommentDots } from "react-icons/fa";
import { Tweet } from "../../../../gql/graphql";


interface FeedCardProps {
  data: Tweet
}

const FeedCard: React.FC<FeedCardProps> = (props) => {
  const {data} = props;

  return (
    <div className="border border-r-0 border-l-0 border-slate-900 p-5 hover:bg-slate-900 transition-all cursor-pointer">
      <div className="grid grid-cols-12">
        <div className="col-span-1">
          {data.author?.profileImageUrl && <Image
            src={data.author?.profileImageUrl}
            alt="user-image"
            height={50}
            width={50}
            className="rounded-full"
          />}
        </div>
        <div className="col-span-11">
          <h5 className="">{data.author?.firstName} {data.author?.lastName}</h5>
          <p>
            {data.content}
          </p>
          <div className="flex justify-between mt-5 text-xl items-center p-2 pr-5">
            <BiLike/>
            <BiRepost/>
            <FaRegCommentDots/>
            <BiBarChart/>
            <BiUpload/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
