export enum ApiType {
    www,
    AccountInformation,
    AccountSettings,
    AdConfiguration,
    Authentication,
    Avatar,
    Badges,
    Catalog,
    Chat,
    ClientSettings,
    Contacts,
    Develop,
    Followings,
    Friends,
    GameJoin,
    Games,
    Groups,
    Inventory,
    Legacy,
    Presence,
    PrivateMessages,
    Publish,
    Thumbnails,
    Trades,
    TwoStepVerification,
    Users,
}
export enum RequestType {
    GET,
    POST,
    PUT,
    DELETE,
    OPTIONS,
    PATCH
}

export interface RequestOptions {
    headers?: object;
    body?: any;
    
    autoCSRF?: boolean;
    cookie?: string;
    manual?: object;
}

export interface RequestBody {
    method: string;
    headers?: any;
    body?: any;
}
