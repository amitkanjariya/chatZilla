"use client";

import Avatar from "@/app/components/Avatar";
import { FullMessageType } from "@/app/types";
import clsx from "clsx";
import { format } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import ImageModal from "./ImageModal";
import { BsCheck, BsCheckAll } from "react-icons/bs"; // Checkmark icons

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

    const isSeen = seenList.length > 0; // Check if the message is seen

    // Container for the entire message
    const container = clsx(
        "flex gap-2 p-1 items-end",
        isOwn ? "justify-end" : "justify-start"
    );

    // Avatar alignment
    const avatar = clsx(isOwn && "order-2");

    // Message Body Alignment
    const body = clsx(
        "flex flex-col gap-1 max-w-[70%]",
        isOwn ? "items-end" : "items-start"
    );

    // Bubble styling
    const bubble = clsx(
        "relative text-base shadow-md rounded-lg px-3 py-2", // Increased text size and padding
        isOwn
            ? "bg-blue-500 text-white rounded-br-none pr-16"
            : "bg-gray-200 text-gray-900 rounded-bl-none pr-12",
        message?.image ? "pr-3 overflow-hidden" : ""
    );

    // Image Wrapper
    const imageWrapper = clsx(
        "relative max-w-[300px] w-auto rounded-md border border-gray-200 overflow-hidden",
        "transition-transform duration-300 cursor-pointer"
    );

    // Time and Checkmarks inside the bubble
    const timeAndCheckWrapper = clsx(
        "absolute bottom-1 right-2 flex items-center gap-1 text-[10px]", // Increased font size
        isOwn ? "text-gray-100" : "text-gray-500",
        message?.image ? "right-4 bottom-2"  : ""
    );

    return (
        <div className={container}>
            {/* Avatar (for received messages only) */}
            {!isOwn && (
                <div className={avatar}>
                    <Avatar user={message?.sender} />
                </div>
            )}

            {/* Message Body */}
            <div className={body}>
                {/* Sender Name (for received messages only) */}
                {!isOwn && (
                    <div className="text-xs text-gray-400">
                        {message?.sender?.name}
                    </div>
                )}

                {/* Message Bubble */}
                <div className={bubble}>
                    {message?.image ? (
                        <>
                            <ImageModal
                                src={message?.image}
                                isOpen={imageModalOpen}
                                onClose={() => setImageModalOpen(false)}
                            />
                            <div className={imageWrapper}>
                                <Image
                                    onClick={() => setImageModalOpen(true)}
                                    alt="Message Image"
                                    src={message?.image}
                                    width={300}
                                    height={300}
                                    className="object-cover"
                                />
                            </div>
                        </>
                    ) : (
                        <div className="break-words">{message?.body}</div>
                    )}

                    {/* Time and Seen Status (Inside Bubble) */}
                    <div className={timeAndCheckWrapper}>
                        <span>{format(new Date(message?.createdAt), "HH:mm")}</span>
                        {isOwn && (
                            isSeen ? (
                                <BsCheckAll className="text-gray-100 text-sm" />
                            ) : (
                                <BsCheck className="text-gray-100 text-sm" />
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;
