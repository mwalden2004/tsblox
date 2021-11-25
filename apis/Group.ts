import { RobloxOptions } from "../types/Roblox";
import { GroupsType, GroupResponse, GroupData, Shout } from "../types/Groups";
import Request from "../libs/Request";
import { ApiType, RequestType } from "../types/Request";
import User from "./User";
import Members from "./groupExtensions/members";

export default class Group {
    public id: number;
    public owner: User;
    public name: string;
    public description: string;
    public memberCount: number;
    public created: Date;
    public shout: Shout;
    

    private isBot: boolean;
    private opts?: any;
    private botAuthenticated: boolean;
    members: Members;

    constructor(groupId: number, opts?: RobloxOptions){
        this.id = groupId;
        this.owner = new User(0, opts);
        this.name = "_";
        this.description = "_";
        this.memberCount = 0;
        this.created = new Date();
        this.shout = {
            body: "_",
            poster: {
                buildersClubMembershipType: "_",
                userId: 0,
                username: "_",
                displayName: "_"
            },
            created: new Date(),
            updated: new Date(),
        }

        this.members = new Members(this, opts)



        this.opts=opts;
        this.isBot=false; // signifies if this running logged in account is this account.
        this.botAuthenticated=false;

    }

    public async updateInfo(): Promise<GroupResponse> {
        const req = await Request(ApiType.Groups, `/v1/groups/${this.id}`, RequestType.GET, {});
        const reqv2 = await Request(ApiType.Groups, `/v2/groups?groupIds=${this.id}`, RequestType.GET, {});
        const data = await req.json();
        const datav2 = await reqv2.json();
        
        if (datav2.data.length == 0){
            throw new Error("Group not found");
        } 

        const group = data as GroupData;
        const groupv2 = datav2.data[0] as GroupResponse;
        const owner = new User(group.owner.userId, this.opts);
        await owner.updateInfo();
        this.owner = owner;

        this.name = group.name;
        this.description = group.description;
        this.memberCount = group.memberCount;
        this.created = new Date(groupv2.created);
        if (group.shout !== null){
            this.shout = group.shout;
            this.shout.created = this.shout?.created ? new Date(this.shout.created) : new Date();
            this.shout.updated = this.shout?.updated ? new Date(this.shout.updated) : new Date();
        }

        return group as GroupResponse;
    }

    public async getNameHistory(): Promise<string[]> {
        const req = await Request(ApiType.Groups, `/v1/groups/${this.id}/name-history?limit=100`, RequestType.GET, {});
        const data = await req.json();
        const resp = data.data as [{name: string; created: string}]
        return resp.map(name => name.name);
    }

    //3587262
    
}