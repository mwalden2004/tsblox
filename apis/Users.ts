import { RobloxOptions } from "../types/Roblox";
import { UsersType, UsernameType } from "../types/Users";
import Request from "../libs/Request";
import { ApiType, RequestType } from "../types/Request";

import User from "./User"

export default function Users(opts?: RobloxOptions): UsersType {

    const getById = async (userId: number): Promise<User> => {
        const u = new User(userId, opts);
        await u.updateInfo();
        return u;
    }

    const getByUsername = async (username: string): Promise<User> => {
        const req = await Request(ApiType.Users, `/v1/usernames/users`, RequestType.POST, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "usernames": [
                    username
                ],
                "excludeBannedUsers": false
            })
        }, opts);
        const data = (await req.json())//
        if (data.data.length == 0){
            throw new Error("User not found.")
        }
        const user = data.data[0] as UsernameType;

        const u = new User(user.id, opts);
        await u.updateInfo();
        return u;
    }

    return {
        getById,
        getByUsername
    }
}