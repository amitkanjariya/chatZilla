import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";
import { pusherServer } from "@/app/libs/pusher";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const { message, image, conversationId } = body;

        if (!currentUser?.id || !currentUser.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!conversationId) {
            return new NextResponse("Conversation ID is required", { status: 400 });
        }

        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
        });

        if (!conversation) {
            return new NextResponse("Conversation not found", { status: 404 });
        }

        const newMessage = await prisma.message.create({
            data: {
                body: message,
                image,
                conversation: {
                    connect: {
                        id: conversationId,
                    },
                },
                sender: {
                    connect: {
                        id: currentUser.id,
                    },
                },
                seen: {
                    connect: currentUser ? { id: currentUser.id } : undefined,
                },
            },
            include: {
                sender: true,
                seen: true,
            },
        });

        await prisma.conversation.update({
            where: {
                id: conversationId,
            },
            data: {
                lastMessageAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id,
                    },
                },
            },
        });

        await pusherServer.trigger(conversationId, "messages:new", newMessage);
        return NextResponse.json(newMessage);
    } catch (error: any) {
        console.error("messages_error", error);
        return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 });
    }
}
