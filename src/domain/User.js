// @flow
export interface IUser {
    id: string;
    username: string;
    email: string;
    permissions: string[];
}

export default class User implements IUser {
    id: string;
    username: string;
    email: string;
    permissions: string[];

    constructor(id: string, username: string, email: string, permissions: string[]) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.permissions = permissions;
    }

    get isAdmin(): boolean {
        return this.permissions.some(permission => permission == 'app');
    }
}
