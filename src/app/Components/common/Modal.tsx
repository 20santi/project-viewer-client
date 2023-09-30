import { useCreateTweet } from "@/app/hooks/tweet";
import { useCurrentUser } from "@/app/hooks/user";
import React, { useCallback, useState } from "react";
import { BiImageAlt } from "react-icons/bi";

interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal = ({ setModal }: ModalProps) => {
  const [content, setContent] = useState("");
  const { user } = useCurrentUser();
  const { mutate } = useCreateTweet();

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
  }, []);

  const handleCreateTweet = useCallback(async() => {
    await mutate({
      content,
      imageURL: user?.profileImageURL,
    });
    setModal(false);
  }, [content, mutate]);

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border bg-white border-gray-300 p-6">
        <div className="">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-transparent text-xl px-3 border-b border-slate-700"
            placeholder="Project Title?"
            rows={3}
          ></textarea>
          <div className="mt-2 flex justify-between items-center">
            <BiImageAlt className="text-xl" onClick={handleSelectImage} />
            <div className="flex gap-x-5">
            <button
              onClick={handleCreateTweet}
              className="bg-[#1d9bf0] p-3 mt-5 rounded-full text-sm px-4 py-2 font-semibold"
            >
              Post
            </button>
            <button onClick={() => setModal(false)} className="p-3 mt-5 rounded-full text-sm px-4 py-2 font-semibold">
                Cancel
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
