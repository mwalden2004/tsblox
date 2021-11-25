import Group from "../apis/Group";
import User from "../apis/User"
import { Role } from "./Groups";

export interface UserType {
    description: string;
    created: string;
    isBanned: boolean;
    externalAppDisplayName: string;
    id: number;
    name: string;
    displayName: string;
}

export interface UsernameType {
    requestedUsername: string,
    id: number,
    name: string,
    displayName: string
}

export interface GroupWithRoles {
    group: Group,
    role: Role
}

export interface UsersType {
    getById: (userId: number) => Promise<User>,
    getByUsername: (username: string) => Promise<User>
}