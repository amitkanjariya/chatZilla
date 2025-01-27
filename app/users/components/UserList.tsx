"use client";
import { User } from "@prisma/client";
import UserBox from "./UserBox";
import {FaSearch} from 'react-icons/fa';
import { useState, useMemo } from "react";

interface UserListProps{
    users: User[],
}

const UserList: React.FC<UserListProps> = ({users}) => {
    const [search, setSearch] = useState("");
    const filteredUsers = useMemo(() => {
        if (!search) return users;
        
        const lowerSearch = search.toLowerCase();
        return users.filter((user) => {
            const nameMatch = user.name?.toLowerCase().includes(lowerSearch);
            const emailMatch = user.email?.toLowerCase().includes(lowerSearch);
            return nameMatch || emailMatch;
        });
    }, [users, search]);
    return(
        <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
            <div className="px-5">
                <div className="flex-col">
                    <div className="text-2xl font-bold py-4 text-neutral-800">
                        People
                    </div>
                    <div className="relative mb-4">
                        <div className="absolute top-3 left-3">
                            <FaSearch className="text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                {filteredUsers.map((user) => (
                    <UserBox
                        key={user.id}
                        user={user}
                    />
                ))}
                {filteredUsers.length === 0 && (
                    <div className="text-gray-500 text-center mt-4">
                        No users found
                    </div>
                )}
            </div>
        </aside>
    )
}   

export default UserList; 