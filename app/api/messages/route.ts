import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { connect } from "http2";
import { includes } from "lodash";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const {message, image, ConversationId} = body;

        if(!currentUser?.id || !currentUser.email){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const newMessage = await prisma.message.create({
            data:{
                body: message,
                image,
                conversation: {
                    connect: {
                        id: ConversationId,
                    },
                },
                sender: {
                    connect: {
                        id: currentUser.id,
                    },
                },
                seen: {
                    connect: {
                        id: ConversationId,
                    },
                },
            },
            include: {
                sender: true,
                seen: true,
            }
        });

        const updatedConversation = await prisma.conversation.update({
            where: {
                id: ConversationId
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id,
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true,
                    }
                }
            }
        });
        
        await pusherServer.trigger(ConversationId, "messages:new", newMessage);
        const lastMessage = updatedConversation.messages[updatedConversation.messages.length-1];
        updatedConversation.users.map((user) => {
            pusherServer.trigger(user.email!, "conversation:update", {
              id: updatedConversation.id,
              messages: [lastMessage],
            });
        });
        return NextResponse.json(newMessage);
    } catch (error) {
        console.log("messages_error", error);
        return new NextResponse("Internal Server Error!!", {status: 500});
    }
}