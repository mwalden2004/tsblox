import { RobloxOptions } from "../../types/Roblox";
import Group from "../Group";
import Request from "../../libs/Request";
import { ApiType, RequestType } from "../../types/Request";
import User from "../User";
import { Role, WallPost_Type } from "../../types/Groups";
import WallPost from "./WallPost";

export default class WallPosts {
    public group: Group;
    public opts?: RobloxOptions;

    constructor(group: Group, opts?: RobloxOptions) {
        this.group=group;
        this.opts=opts;
        
        
    }

    public getPosts(): Promise<WallPost[]> {
        return new Promise(async (resolve, reject) => {
            const posts = [] as WallPost[];

            const get = async (nextCursor?: string) => {
                const req = await Request(ApiType.Groups, `/v1/groups/${this.group.id}/wall/posts?limit=100${nextCursor == undefined ? "" : `&cursor=${nextCursor}`}`, RequestType.GET, {}, this.opts);
                const data = await req.json();
                //console.log(data)
                for (const post of data.data){
                    const newPosted = post as WallPost_Type;
                    if (newPosted.poster == null){
                        continue; // This will occur if a poster is banned/deleted.
                    }
                    const userId = newPosted.poster.userId;
                    const newUser = new User(userId, this.opts);
                    await newUser.updateInfo();
                    const newPost = new WallPost(this.group, newUser, post, this.opts);
                    posts.push(newPost);
                }

                if (data.nextPageCursor !== null) {
                    setTimeout(() => {
                        get(data.nextPageCursor)
                    }, 100)
                } else {
                    resolve(posts)
                }
            }

            get()
        })
    }


}