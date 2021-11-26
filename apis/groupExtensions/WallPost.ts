import { RobloxOptions } from "../../types/Roblox";
import Group from "../Group";
import Request from "../../libs/Request";
import { ApiType, RequestType } from "../../types/Request";
import User from "../User";
import { Role, WallPost_Type } from "../../types/Groups";

export default class WallPost {
    public group: Group;
    public user: User;
    public opts?: RobloxOptions;

    public id: number;
    public poster: User;
    public body: string;
    public updated: Date;
    public created: Date;

    constructor(group: Group, user: User, post: WallPost_Type, opts?: RobloxOptions) {
        this.group=group;
        this.user=user;
        this.opts=opts;

        this.id=post.id;
        this.poster=user;
        this.body=post.body;
        this.updated=new Date(post.updated);
        this.created=new Date(post.created);
    }


}