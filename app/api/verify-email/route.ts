import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpiry: { gt: new Date() }
      }
    });

    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
        verificationTokenExpiry: null
      }
    });

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/`);

  } catch (error) {
    console.error('VERIFICATION_ERROR:', error);
    return NextResponse.json({ error: 'Email verification failed' }, { status: 500 });
  }
}