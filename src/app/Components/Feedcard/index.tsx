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
            <h5 className="font-bold">
              <Link href={`/${data.author?.id}`}>
              {data.author?.firstName} {data.author?.lastName}
              </Link>
            </h5>
            <p className="text-slate-500 text-[14px]">{data.content}</p>
          </div>
        </div>
        <div className="w-full mt-5 ml-7">
          <Image
            src="https://res.cloudinary.com/dxyfqzmew/image/upload/v1696078234/Image/pcb0ny76uedij1kdzia7.webp"
            alt="project-image"
            height={500}
            width={500}
            className="rounded-xl"
          />
        </div>
        <div className="flex justify-between mt-5 text-xl items-center pl-7 pr-7">
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
