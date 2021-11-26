import {UsersType} from "./Users"
import {GroupsType} from "./Groups"

export interface RobloxOptions {
    cookie?: string;
    torIp?: string;
    torPort?: number;
    torPassword?: string;
    captchaToken?: string;
    
}

export interface Roblox {
    Users: UsersType;
    Groups: GroupsType;
}