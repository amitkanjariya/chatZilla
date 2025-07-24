import NextAuth from "next-auth";
import { authOptions } from "@/app/libs/auth"; // or "@/lib/auth"

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
