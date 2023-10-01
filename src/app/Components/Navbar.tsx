import React, { useEffect, useMemo } from "react";
import { PiProjectorScreenChartFill } from "react-icons/pi";
import { useCurrentUser } from "../hooks/user";
import Link from "next/link";
import { FaHome, FaHashtag, FaBell, FaBookmark, FaUser } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { usePathname, useSearchParams } from "next/navigation";

interface TwitterSidebarButton {
  title: string;
  icon: React.ReactNode;
  link: string;
}

export const Navbar: React.FC = () => {
  const { user } = useCurrentUser();
  const pathname = usePathname();
  const searchParam = useSearchParams();

  const matchUrl = (url: string) => {
    if (url === pathname) return true;
    else return false;
  };

  const sidebarMenuItems: TwitterSidebarButton[] = useMemo(
    () => [
      {
        title: "Home",
        icon: <FaHome />,
        link: "/",
      },
      {
        title: "Explore",
        icon: <FaHashtag />,
        link: "",
      },
      {
        title: "Notifications",
        icon: <FaBell />,
        link: "",
      },
      {
        title: "Messages",
        icon: <FaMessage />,
        link: "",
      },
      {
        title: "Bookmarks",
        icon: <FaBookmark />,
        link: "",
      },
      {
        title: "Profile",
        icon: <FaUser />,
        link: `/${user?.id}`,
      },
    ],
    [user?.id]
  );

  return (
    <nav className="bg-white text-black w-screen fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto flex w-[90%] justify-between items-center">
        <div className="flex justify-between w-full h-full pt-2">
          <div className="text-3xl mr-4">
            <PiProjectorScreenChartFill />
          </div>
          <ul className="flex space-x-10">
            {sidebarMenuItems.map((item, index) => (
              <li
                key={index}
                className={`${
                  matchUrl(item.link)
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500"
                } hover:text-black hover:border-b-2 border-black`}
              >
                <Link
                  href={item.link}
                  className="flex flex-col gap-y-2 items-center justify-center"
                >
                  <div className="text-2xl">{item.icon}</div>
                  <span className="text-[12px]">{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Add any other elements on the right side of the navbar */}
      </div>
    </nav>
  );
};
