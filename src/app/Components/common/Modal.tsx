import { graphQLClient } from "@/app/clients/api";
import { getSignedURLForTweetQuery } from "@/app/graphql/Queries/tweet";
import { useCreateTweet } from "@/app/hooks/tweet";
import { useCurrentUser } from "@/app/hooks/user";
import { TypedDocumentNode } from "@graphql-typed-document-node/core";
import React, { useCallback, useState } from "react";
import { BiImageAlt } from "react-icons/bi";
import axios from "axios";
import toast from "react-hot-toast";
import Image from "next/image";

interface ModalProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal = ({ setModal }: ModalProps) => {
  const [content, setContent] = useState("");
  const [imageURL, setImageURL] = useState("");
  const { user } = useCurrentUser();
  const { mutate } = useCreateTweet();

  const handleInputChangeFile = useCallback((input: HTMLInputElement) => {
    return async (event: Event) => {
      event.preventDefault();
      const file: File | null | undefined = input.files?.item(0);
      if (!file) return;

      const { getSignedURLForTweet } = await graphQLClient.request(
        getSignedURLForTweetQuery as TypedDocumentNode,
        {
          imageName: file.name,
          imageType: file.type.split("/")[1],
        }
      );

      if (getSignedURLForTweet) {
        toast.loading("Uploading...", { id: "2" });
        await axios.put(getSignedURLForTweet, file, {
          headers: {
            "Content-Type": file.type,
          },
        });
        toast.success("Upload complete", { id: "2" });
        const url = new URL(getSignedURLForTweet);
        const myFIlePath = `${url.origin}${url.pathname}`;
        setImageURL(myFIlePath);
      }
    };
  }, []);

  const handleSelectImage = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");

    const handleFn = handleInputChangeFile(input);

    input.addEventListener("change", handleFn);

    input.click();
  }, [handleInputChangeFile]);

  const handleCreateTweet = useCallback(async () => {
    await mutate({
      content,
      imageURL,
    });
    setModal(false);
  }, [content, mutate, imageURL]);

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-black bg-opacity-60 backdrop-blur-sm">
      <div className="w-11/12 max-w-[650px] rounded-lg border bg-white border-gray-300 p-6">
        <div className="">
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <p className="text-xl font-bold">Project Title</p>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-transparent text-sm px-3 border-b border-slate-700"
                placeholder="Project Title"
                rows={3}
              ></textarea>
              {imageURL && (
                <Image
                  src={imageURL}
                  alt="project-image"
                  height={300}
                  width={300}
                  className="rounded-lg"
                />
              )}
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="text-xl font-bold">Project Description</p>
              <textarea
                className="w-full bg-transparent text-sm px-3 border-b border-slate-700"
                placeholder="Minimum 100 words"
                rows={3}
              ></textarea>
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <BiImageAlt className="text-xl" onClick={handleSelectImage} />
            <div className="flex gap-x-5">
              <button
                onClick={handleCreateTweet}
                className="bg-[#1d9bf0] p-3 mt-5 rounded-full text-sm px-4 py-2 font-semibold"
              >
                Post
              </button>
              <button
                onClick={() => setModal(false)}
                className="p-3 mt-5 rounded-full text-sm px-4 py-2 font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
