import {Service, KnexServiceOptions} from 'feathers-knex';
import {Application} from '../../declarations';

export interface UserData {
    id?: number;
    token: number;
    userId: number;
}

export class Tokens extends Service {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(options: Partial<KnexServiceOptions>, app: Application) {
        super({
            ...options,
            name: 'tokens'
        });
    }
}
