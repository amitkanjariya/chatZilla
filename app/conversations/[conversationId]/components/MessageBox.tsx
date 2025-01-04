"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
    isLast: boolean;
    message: FullMessageType;
}

const MessageBox: React.FC<MessageBoxProps> = ({ isLast, message }) => {
    const { data: session } = useSession();
    const [imageModalOpen, setImageModalOpen] = useState(false);
    const isOwn = session?.user?.email === message?.sender?.email;

    const seenList = (message?.seen || [])
        .filter((user) => user.email !== message?.sender?.email)
        .map((user) => user.name)
        .join(", ");

    const container = clsx(
        "flex gap-3 py-2 px-3 items-end",
        isOwn ? "justify-end" : "justify-start"
    );

    const avatar = clsx("w-8 h-8", isOwn && "order-2");
    const body = clsx(
        "flex flex-col space-y-1 max-w-[60%]",
        isOwn ? "items-end" : "items-start"
    );

    const bubble = clsx(
        "px-4 py-2 text-sm shadow-md rounded-lg",
        isOwn
            ? "bg-blue-500 text-white rounded-br-none"
            : "bg-gray-200 text-gray-900 rounded-bl-none"
    );

    return (
        <div className={container}>
            {!isOwn && (
                <div className={avatar}>
                    <Avatar user={message?.sender} />
                </div>
            )}
            <div className={body}>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                    <span>{message?.sender?.name}</span>
                    <span>{format(new Date(message?.createdAt), "p")}</span>
                </div>
                <div className={bubble}>
                    {message?.image ? (
                        <>
                            <ImageModal
                                src={message?.image}
                                isOpen={imageModalOpen}
                                onClose={() => setImageModalOpen(false)}
                            />
                            <Image
                                onClick={() => setImageModalOpen(true)}
                                alt="Image"
                                height={288}
                                width={288}
                                src={message?.image}
                                className="object-cover cursor-pointer hover:scale-110 transition"
                            />
                        </>
                    ) : (
                        <div>{message?.body}</div>
                    )}
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div className="text-xs text-gray-400 mt-1">
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MessageBox;
