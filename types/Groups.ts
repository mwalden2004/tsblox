import Group from "../apis/Group"
import User from "../apis/User"

export interface GroupType {
  description: string;
  created: string;
  isBanned: boolean;
  externalAppDisplayName: string;
  id: number;
  name: string;
  displayName: string;
}

export interface GroupResponse {
  id: number;
  name: string;
  description: string;
  owner: User;
  memberCount: number;
  created: Date | string;
}
export interface Role {

  id: number,
  name: string,
  rank: number
  description?: string;
  memberCount?: number;

}

export interface GroupData {
  id: number;
  name: string;
  description: string;
  owner: PosterOrOwner | User;
  shout: Shout;
  memberCount: number;
  isBuildersClubOnly: boolean;
  publicEntryAllowed: boolean;
  created?: Date;
}
export interface PosterOrOwner {
  buildersClubMembershipType: string;
  userId: number;
  username: string;
  displayName: string;
}
export interface Shout {
  body: string;
  poster: PosterOrOwner;
  created: string | Date;
  updated: string | Date;
}

export interface WallPost_Type {
  id: number;
  poster: Poster | User;
  body: string;
  created: string;
  updated: string;
}
export interface Poster {
  buildersClubMembershipType: string;
  userId: number;
  username: string;
  displayName: string;
}


export interface GroupsType {
  getById: (groupId: number) => Promise<Group>,
}
