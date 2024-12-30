import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        const currentUser = await getCurrentUser();
        const body = await req.json();
        const {name, image} = body;
        if(!currentUser?.id || !currentUser.email){
            return new NextResponse("Unauthorized", {status: 401});
        }
        const updateUser = await prisma?.user.update({
            where:{ 
                id: currentUser.id,
            },
            data: {
                name,
                image,
            },
        });
        return NextResponse.json(updateUser);
    } catch (error) {
        console.log("Setting_update_error", error);
        return new NextResponse("Internal Server Error", {status: 500})
    }
}