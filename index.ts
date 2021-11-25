import {RobloxOptions, Roblox} from "./types/Roblox";

import Users from "./apis/Users";
import Groups from "./apis/Groups";

export default function Roblox(opts?: RobloxOptions) : Roblox {

    return {
        Users: Users(opts),
        Groups: Groups(opts)
    }
}