import {Service, KnexServiceOptions} from 'feathers-knex';
import {Application} from '../../declarations';
import {Params} from '@feathersjs/feathers';

const institutionalEmail = '@etu.toulouse-inp.fr'

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

    create(data: UserData, params? : Params) {
        data = this.unsetAdmin(data); // user isn't admin by default

        console.log("user created", data);

        return super.create(data, params);
    }


}
