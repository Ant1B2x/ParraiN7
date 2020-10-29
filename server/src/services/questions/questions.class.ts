import {Service, KnexServiceOptions} from 'feathers-knex';
import {Application} from '../../declarations';

interface QuestionData {
    content: string;
}

export class Questions extends Service<QuestionData> {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(options: Partial<KnexServiceOptions>, app: Application) {
        super({
            ...options,
            name: 'questions'
        });
    }
}
