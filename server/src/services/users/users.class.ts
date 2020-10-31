import {Service, KnexServiceOptions} from 'feathers-knex';
import {Application} from '../../declarations';

export interface UserData {
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    isGodfather: boolean;
    isAdmin: boolean;
}

export class Users extends Service<UserData> {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(options: Partial<KnexServiceOptions>, app: Application) {
        super({
            ...options,
            name: 'users'
        });
    }
}
