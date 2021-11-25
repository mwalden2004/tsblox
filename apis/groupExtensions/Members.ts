import { RobloxOptions } from "../../types/Roblox";
import Group from "../Group";
import Request from "../../libs/Request";
import { ApiType, RequestType } from "../../types/Request";
import GroupMember from "./GroupMember";
import User from "../User";

export default class Members {
    public group: Group;
    public opts?: RobloxOptions;
    constructor(group: Group, opts?: RobloxOptions) {
        this.group=group;
        this.opts=opts;
    }

    public get(): Promise<GroupMember[]> {
        return new Promise(async (resolve, reject) => {
            const members = [] as GroupMember[];

            const get = async (nextCursor?: string) => {
                const req = await Request(ApiType.Groups, `/v1/groups/${this.group.id}/users?limit=100${nextCursor == undefined ? "" : `&cursor=${nextCursor}`}`, RequestType.GET, {});
                const data = await req.json();

                for (const user of data.data){
                    const userId = user.user.userId;
                    const newUser = new User(userId, this.opts);
                    await newUser.updateInfo();
                    const groupMember = new GroupMember(this.group, newUser, this.opts);
                    await groupMember.updateInfo();
                    members.push(groupMember);
                }

                if (data.nextPageCursor !== null) {
                    setTimeout(() => {
                        get(data.nextPageCursor)
                    }, 100)
                } else {
                    resolve(members)
                }
            }

            get()
        })
    }
    public async getByRoleId(roleId: number): Promise<GroupMember[]> {
        return new Promise(async (resolve, reject) => {
            const members = [] as GroupMember[];

            const get = async (nextCursor?: string) => {
                const req = await Request(ApiType.Groups, `/v1/groups/${this.group.id}/roles/${roleId}/users?limit=100${nextCursor == undefined ? "" : `&cursor=${nextCursor}`}`, RequestType.GET, {});
                const data = await req.json();

                for (const user of data.data){
                    const userId = user.userId;
                    const newUser = new User(userId, this.opts);
                    await newUser.updateInfo();
                    const groupMember = new GroupMember(this.group, newUser, this.opts);
                    await groupMember.updateInfo();
                    members.push(groupMember);
                }

                if (data.nextPageCursor !== null) {
                    setTimeout(() => {
                        get(data.nextPageCursor)
                    }, 100)
                } else {
                    resolve(members)
                }
            }

            get()
        })
    }

}