const fetch = require("node-fetch");
import {ApiType, RequestType, RequestOptions, RequestBody} from "../types/Request";

const apis = [ // Handle API prefixes.
    "www.roblox.com",
     "accountinformation.roblox.com"
    , "accountsettings.roblox.com"
    , "adCcnfiguration.roblox.com"
    , "authentication.roblox.com"
    , "avatar.roblox.com"
    , "badges.roblox.com"
    , "catalog.roblox.com"
    , "chat.roblox.com"
    , "clientsettings.roblox.com"
    , "contacts.roblox.com"
    , "develop.roblox.com"
    , "followings.roblox.com"
    , "friends.roblox.com"
    , "gamejoin.roblox.com"
    , "games.roblox.com"
    , "groups.roblox.com"
    , "inventory.roblox.com"
    , "legacy.roblox.com"
    , "presence.roblox.com"
    , "privatemessages.roblox.com"
    , "publish.roblox.com"
    , "thumbnails.roblox.com"
    , "trades.roblox.com"
    , "twostepverification.roblox.com"
    , "users.roblox.com"
]

const methods = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'OPTIONS',
    'PATCH'
]

export default async function Request(api: ApiType, path: string, r_method: RequestType, opts?: RequestOptions): Promise<any>{
    const ukey = api as number; // gah typescript you are crazzyy
    const url = apis[ukey].concat(path);
    const method = methods[r_method].toString();

    let requestBody: RequestBody = {
        method: method,
    }
    if (opts !== undefined){
        
        requestBody.headers = opts.headers !== undefined ? opts.headers : {};

        if (method !== "GET" && opts.body !== undefined){
            requestBody.body = opts.body;
        }

        if (opts.autoCSRF == true){
            const requestUrl = `https://${url}`;
            const csrfRequest = await fetch(requestUrl, {
                method: method,
                headers: {
                    cookie: opts.cookie !== undefined ? `.ROBLOSECURITY=${opts.cookie};` : ""
                }
            });

            requestBody.headers = {
                "X-CSRF-TOKEN": csrfRequest.headers.get("x-csrf-token"),
                ...requestBody.headers
            }
        }

        if (opts.cookie !== undefined){
            requestBody.headers = {
                Cookie: `.ROBLOSECURITY=${opts.cookie};`,
                ...requestBody.headers
            }
        }

    }

    const requestUrl = `https://${url}`;
    const request = await fetch(requestUrl, requestBody);
    return request;
}