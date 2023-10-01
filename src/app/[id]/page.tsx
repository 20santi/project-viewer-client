'use client'
import type { NextPage } from "next";
import { BsArrowLeftShort } from "react-icons/bs";
import Image from "next/image";
import { usePathname } from 'next/navigation';
import { useGetuserById } from "../hooks/user";
import FeedCard from "../Components/Feedcard";
import { Tweet } from "../../../gql/graphql";
import TwitterLayout from "../Components/Feedcard/Layout/pageLayout";

const UserProfilePage: NextPage = () => {
    const pathname = usePathname();
    const id = pathname.split("/")[1];
    console.log("Id: ", id);
    const { user } = useGetuserById(id);
    console.log("User: ", user);

    return (
        <div>
            <TwitterLayout>
                <div>
                    <nav className="flex items-center gap-3 px-3">
                        <BsArrowLeftShort className="text-4xl"/>
                        <div>
                            <h1 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h1>
                            <h1 className="text-md font-bold text-slate-500">{user?.tweets.length} Project</h1>
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
                        <h1 className="text-2xl font-bold">{user?.firstName} {user?.lastName}</h1>
                    </div>
                    <div className="mt-5 flex flex-col gap-y-5">
                        {user?.tweets?.map((tweet: Tweet) => <FeedCard data={tweet as Tweet} key={tweet?.id}/>)}
                    </div>
                </div>
            </TwitterLayout>
        </div>
    )
}

export default UserProfilePage;