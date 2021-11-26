import { RobloxOptions } from "../../types/Roblox";
import Group from "../Group";
import Request from "../../libs/Request";
import { ApiType, RequestType } from "../../types/Request";
import User from "../User";
import { Role } from "../../types/Groups";

export default class GroupMember {
    public group: Group;
    public user: User;
    public opts?: RobloxOptions;

    public role: Role;

    constructor(group: Group, user: User, opts?: RobloxOptions) {
        this.group=group;
        this.user=user;
        this.opts=opts;
        
        this.role = {id:0,name:"_",rank:0}
        
    }

    public async updateInfo(): Promise<void> {
        const groups = await this.user.getGroups();
        const found = groups.find(group => group.group.id == this.group.id);
        if (!found){
            throw new Error("Membership not found.")
        }

        this.role = found.role;
    }

    public async removePosts(): Promise<void> {
        if (!this.opts || !this.opts.cookie){
            throw new Error("Must be authenticated to attempt to remove a users posts.")
        }
        const req = await Request(ApiType.Groups, `/v1/groups/${this.group.id}/walls/users/${this.user.id}/posts`, RequestType.DELETE, {autoCSRF: true, cookie: this.opts.cookie}, this.opts);
    }

    public async rank(roleId: number): Promise<void> {
        if (!this.opts || !this.opts.cookie){
            throw new Error("Must be authenticated to attempt to rank a user.")
        }
        const req = await Request(ApiType.Groups, `/v1/groups/${this.group.id}/users/${this.user.id}`, RequestType.PATCH, {autoCSRF: true, cookie: this.opts.cookie,
        headers: {
            "Content-Type": "application-json"
        },
        body: JSON.stringify({
            roleId
        })
    }, this.opts);
    }

    public async exile(): Promise<void> {
        if (!this.opts || !this.opts.cookie){
            throw new Error("Must be authenticated to attempt to exile a user.")
        }
        const req = await Request(ApiType.Groups, `/v1/groups/${this.group.id}/users/${this.user.id}`, RequestType.DELETE, {autoCSRF: true, cookie: this.opts.cookie}, this.opts);
    }
    


}