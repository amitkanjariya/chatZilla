"use client";

import useConversation from "@/app/hooks/useConversation";
import { pusherClient } from "@/app/libs/pusher";
import { FullMessageType } from "@/app/types";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { find } from "lodash";
import MessageBox from "./MessageBox";
import { format, isToday, isYesterday } from "date-fns";

interface BodyProps {
    initialMessages: FullMessageType[];
}

const Body: React.FC<BodyProps> = ({ initialMessages }) => {
    const [messages, setMessages] = useState(initialMessages);
    const bottomRef = useRef<HTMLDivElement>(null);
    const { conversationId } = useConversation();

    useEffect(() => {
        axios.post(`/api/conversations/${conversationId}/seen`);
    }, [conversationId]);

    useEffect(() => {
        pusherClient.subscribe(conversationId);
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });

        const messageHandler = (message: FullMessageType) => {
            axios.post(`/api/conversations/${conversationId}/seen`);
            setMessages((messages) => {
                if (find(messages, { id: message.id })) {
                    return messages;
                }
                return [...messages, message];
            });
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        };

        const updateMessageHandler = (message: FullMessageType) => {
            setMessages((current) =>
                current.map((m) => (m.id === message.id ? message : m))
            );
        };

        pusherClient.bind("messages:new", messageHandler);
        pusherClient.bind("message:update", updateMessageHandler);

        return () => {
            pusherClient.unsubscribe(conversationId);
            pusherClient.unbind("messages:new", messageHandler);
            pusherClient.unbind("message:update", updateMessageHandler);
        };
    }, [conversationId]);

    // Group messages by date
    const groupedMessages = messages.reduce<Record<string, FullMessageType[]>>(
        (acc, message) => {
            const messageDate = new Date(message.createdAt);
            const dateKey = format(messageDate, "yyyy-MM-dd");
            if (!acc[dateKey]) acc[dateKey] = [];
            acc[dateKey].push(message);
            return acc;
        },
        {}
    );

    const formatDateHeader = (date: string) => {
        const messageDate = new Date(date);
        if (isToday(messageDate)) {
            return "Today";
        } else if (isYesterday(messageDate)) {
            return "Yesterday";
        } else {
            return format(messageDate, "dd-MM-yyyy");
        }
    };

    return (
        <div className="flex-1 overflow-y-auto px-4">
            {Object.entries(groupedMessages).map(([date, messages]) => (
                <React.Fragment key={date}>
                    {/* Date Separator */}
                    <div className="text-sm text-gray-500 bg-gray-200 rounded-md px-2 py-1 mx-auto w-fit my-4">
                        {formatDateHeader(date)}
                    </div>
                    {/* Messages for this date */}
                    {messages.map((message, index) => (
                        <MessageBox
                            key={message.id}
                            isLast={index === messages.length - 1}
                            message={message}
                        />
                    ))}
                </React.Fragment>
            ))}
            <div ref={bottomRef} className="pt-24" />
        </div>
    );
};

export default Body;
