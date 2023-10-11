import React, { useCallback, useMemo } from "react";
import { BsBell, BsBookmark, BsEnvelope, BsSearch } from "react-icons/bs";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import Image from "next/image";
import { useCurrentUser } from "../../../hooks/user";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import toast from "react-hot-toast";
import { verifyUserGoogleTokenQuery } from "../../../graphql/Queries/user";
import { graphQLClient } from "../../../clients/api";
import { useQueryClient } from "@tanstack/react-query";

interface TweeterLayoutProps {
  children: React.ReactNode;
}

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

const TwitterLayout: React.FC<TweeterLayoutProps> = (props) => {
  const { user } = useCurrentUser();
  const queryClient = useQueryClient();

  const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <BiHomeCircle />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <BiHash />,
        link: "/",
      },
      {
        title: "Notifications",
        icon: <BsBell />,
        link: "/",
      },
      {
        title: "Messages",
        icon: <BsEnvelope />,
        link: "/",
      },
      {
        title: "Bookmarks",
        icon: <BsBookmark />,
        link: "/",
      },
      {
        title: "Profile",
        icon: <BiUser />,
        link: `/${user?.id}`,
      },
    ],
    [user?.id]
  );

  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) {
        return toast.error(`Google token not found`);
      }

      const { verifyGoogleToken }: { verifyGoogleToken: string } =
        await graphQLClient.request(verifyUserGoogleTokenQuery, {
          token: googleToken,
        });

      toast.success("Verified Successfully");

      if (verifyGoogleToken) {
        window.localStorage.setItem("__token", verifyGoogleToken);
      }

      await queryClient.invalidateQueries(["current-user"]);
    },
    [queryClient]
  );

  return (
    <div className="h-screen w-screen mt-12 overflow-hidden bg-[#f3f2ef] text-black relative">
      <div className="w-[90%] h-full mx-auto pt-7 sm:flex">
        <div
          id="1"
          className="fixed top-20 border-slate-300 rounded-xl flex sm:justify-end"
        >
          {!user ? (
            <div className="p-5 bg-slate-700 rounded-lg">
              <h1 className="my-2 text-xl">New to Twitter ?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          ) : (
            <div className="flex gap-2 items-center bg-white border border-slate-300 px-3 py-2 rounded-full">
              {user && user.profileImageURL && (
                <Image
                  className="rounded-full"
                  src={user?.profileImageURL}
                  alt="user-image"
                  height={40}
                  width={40}
                />
              )}
              <h3 className="hidden sm:block text-sm">
                {user.firstName} {user.lastName}
              </h3>
            </div>
          )}
        </div>
        <div
          id="2"
          className="ml-52 h-screen overflow-y-scroll scrollbar-none border-gray-900"
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default TwitterLayout;
