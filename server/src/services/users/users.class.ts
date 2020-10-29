import {Service, KnexServiceOptions} from 'feathers-knex';
import {Application} from '../../declarations';
import {Params} from '@feathersjs/feathers';

interface UserData {
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    isGodFather: boolean;
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

    setAdmin(data: UserData) : UserData {
        return {...data, 'isAdmin':true};
    }

    unsetAdmin(data: UserData) : UserData {
        return {...data, 'isAdmin':false};
    }

    async create(data: UserData, params? : Params) {
        // user isn't admin by default
        data = this.unsetAdmin(data);

        return super.create(data, params);
    }


}
