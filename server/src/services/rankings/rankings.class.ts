import {Service, KnexServiceOptions} from 'feathers-knex';
import {Application} from '../../declarations';

export interface RankingData {
    id?: number;
    godfatherId: number;
    godsonId: number;
    rank?: number;
}

export class Rankings extends Service<RankingData> {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(options: Partial<KnexServiceOptions>, app: Application) {
        super({
            ...options,
            name: 'rankings'
        });
    }
}
