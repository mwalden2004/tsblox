import { RobloxOptions } from "../../types/Roblox";
import Group from "../Group";
import Request from "../../libs/Request";
import { ApiType, RequestType } from "../../types/Request";
import User from "../User";
import { Role } from "../../types/Groups";

export default class JoinRequests {
    public group: Group;
    public opts?: RobloxOptions;

    constructor(group: Group, opts?: RobloxOptions) {
        this.group=group;
        this.opts=opts;
        
        
    }


}