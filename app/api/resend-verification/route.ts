import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import { sendVerificationEmail } from '@/app/libs/mailer';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (user.isVerified) {
      return NextResponse.json({ error: 'Email already verified' }, { status: 400 });
    }

    const verificationToken = uuidv4();
    const verificationTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken,
        verificationTokenExpiry
      }
    });

    await sendVerificationEmail(email, verificationToken);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('RESEND_VERIFICATION_ERROR:', error);
    return NextResponse.json({ error: 'Failed to resend verification' }, { status: 500 });
  }
}