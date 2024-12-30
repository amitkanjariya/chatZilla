import { useSession } from "next-auth/react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";
import { useMemo } from "react";

const useOtherUser = (conversation: FullConversationType | {users : User[]}) => {
    const session = useSession();
    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user?.email;
        const otherUser = conversation.users.find((user) => user.email !== currentUserEmail);

        return otherUser
    }, [conversation.users, session?.data?.user?.email]);

    return otherUser;
}

export default useOtherUser;