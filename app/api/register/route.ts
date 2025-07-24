import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb"
import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/app/libs/mailer";
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request){
    try {
        const body = await request.json();
        const {email, name, password} = body;
        if(!email || !name || !password){
            return new Response("Please fill in all fields", {status: 400});
        }
        const existingUser = await prisma.user.findUnique({
        where: { email }
        });
    
        if (existingUser) {
        return new NextResponse('Email already registered', { status: 400 });
        }
        
        const hashedPassword = await bcrypt.hash(password, 12);
        const verificationToken = uuidv4();
        const verificationTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

        const user = await prisma.user.create({
            data: {email, name, hashedPassword,  verificationToken, verificationTokenExpiry,}
        });

        await sendVerificationEmail(email, verificationToken);

        return NextResponse.json({
            success: true,
            message: 'Verification email sent. Please check your inbox.'
        });
    } catch (error:any) {
        console.log(error, 'registration error');
        return new NextResponse("Internal Error", {status : 500});
    }
}
