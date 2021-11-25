import { RobloxOptions } from "../types/Roblox";
import { UsersType, UserType, GroupWithRoles } from "../types/Users";
import Request from "../libs/Request";
import { ApiType, RequestType } from "../types/Request";
import { Role } from "../types/Groups";
import Group from "./Group";

export default class User {
    public id: number;
    public description: string;
    public isBanned: boolean;
    public name: string;
    public displayName: string;
    public friends: number;
    public followers: number;
    public following: number;
    public gameJoins: number;
    public headshotUrl: string;
    public userId: number;

    private isBot: boolean;
    private opts?: any;
    private botAuthenticated: boolean;

    constructor(id: number, opts?: RobloxOptions){
        this.id = id;
        this.description = "_";
        this.isBanned=false;
        this.name="_";
        this.displayName="_";
        this.friends=0;
        this.following=0;
        this.followers=0;
        this.gameJoins=0;
        this.userId= id;//this is for weird group API stuff
        this.headshotUrl=`https://www.roblox.com/headshot-thumbnail/image?userId=${id}&width=48&height=48&format=png`;



        this.opts=opts;
        this.isBot=false; // signifies if this running logged in account is this account.
        this.botAuthenticated=false;

    }

    public async updateInfo(): Promise<UserType> {
        const req = await Request(ApiType.Users, `/v1/users/${this.id}`, RequestType.GET, {});
        const data = await req.json() as UserType;
        if (this.opts && this.opts.cookie && this.description == "_") {
            const whoAmIreq = await Request(ApiType.Users, `/v1/users/authenticated`, RequestType.GET, {
                cookie: this.opts.cookie,
            });
            const whoAmIresp = await whoAmIreq.json() as UserType;
            if (whoAmIresp.id === this.id) {
                this.isBot = true;
                this.botAuthenticated = true;
            }
        }


        const whoAmIreq = await Request(ApiType.Friends, `/v1/users/${this.id}/friends/count`, RequestType.GET, {
            cookie: this.opts.cookie,
        });
        const [friends, following, followers, gameJoins] = await Promise.all([
            Request(ApiType.Friends, `/v1/users/${this.id}/friends/count`, RequestType.GET).then(req => req.json()),
            Request(ApiType.Friends, `/v1/users/${this.id}/followings/count`, RequestType.GET).then(req => req.json()),
            Request(ApiType.Friends, `/v1/users/${this.id}/followers/count`, RequestType.GET).then(req => req.json()),
            Request(ApiType.www, `/users/profile/playergames-json?userId=${this.id}`, RequestType.GET).then(req => req.json())
        ])
        
        this.description = data.description;
        this.isBanned=data.isBanned;
        this.name=data.name;
        this.displayName=data.displayName;
        this.friends=friends.count;
        this.followers=followers.followers;
        this.following=following.following;
        const games = gameJoins as {
            Games: [
                {
                    Plays: number;
                }
            ]
        }
        //@ts-expect-error
        this.gameJoins = games.Games.length == 0 ? 0 : games.Games.map(a => a.Plays).reduce((a, b) => a + b);

        return data as UserType;
    }


    public async getGroups(): Promise<GroupWithRoles[]> {
        const req = await Request(ApiType.Groups, `/v2/users/${this.id}/groups/roles`, RequestType.GET, {});
        const resp = await req.json() as {
            data: [
                {
                    group: {
                        id: number;
                    }
                    role: Role
                }
            ]
        };

        const mappedResp = await Promise.all(await resp.data.map(async g => {
            const group = new Group(g.group.id, this.opts);
            await group.updateInfo();

            return {
                group,
                role: g.role,
            }
        }));

        return mappedResp;


    }

    public async getPastUsernames(): Promise<String[]> {
        const req = await Request(ApiType.Users, `/v1/users/${this.id}/username-history?limit=100`, RequestType.GET, {});
        const data = await req.json() as {
            data: [
                {
                    name: string
                }
            ]
        };
        const mappedUsernames = data.data.map(a => a.name)
        return mappedUsernames;
    }

    public async message(subject: string, body: string): Promise<void> {
        const req = await Request(ApiType.PrivateMessages, `/v1/messages/send`, RequestType.POST, {
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                userId: this.id,
                subject,
                body,
                recipientId: this.id,
            }),
            cookie: this.opts.cookie,
            autoCSRF: true,
        });
        const resp = await req.json();
        console.log(resp)

        return;
    }
}