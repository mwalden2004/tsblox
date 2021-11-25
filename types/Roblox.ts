import {UsersType} from "./Users"
import {GroupsType} from "./Groups"

export interface RobloxOptions {
    cookie?: string;
    torEnabled?: boolean;
    captchaToken?: string;
}

export interface Roblox {
    Users: UsersType;
    Groups: GroupsType;
}