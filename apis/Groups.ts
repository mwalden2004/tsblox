import { RobloxOptions } from "../types/Roblox";
import { GroupsType } from "../types/Groups";
import Request from "../libs/Request";
import { ApiType, RequestType } from "../types/Request";

import Group from "./Group"

export default function Groups(opts?: RobloxOptions): GroupsType {

    const getById = async (groupId: number): Promise<Group> => {
        const u = new Group(groupId, opts);
        await u.updateInfo();
        return u;
    }

    return {
        getById
    }
}