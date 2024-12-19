import getSession from "./getSessions";
import prisma from "@/app/libs/prismadb";
const getCurrentUser = async () => {
    try {
        const session = await getSession();
        if(!session?.user?.email){
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })

        if(!currentUser){
            return null;
        }
        return currentUser;
    } catch (error: any) {
        console.log(error);
        return null;
    }
}

export default getCurrentUser;