import {Service, KnexServiceOptions} from 'feathers-knex';
import {Application} from '../../declarations';

export interface QuestionData {
    id?: number;
    content: string;
    placeholder?: string;
    authorId: number;
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
