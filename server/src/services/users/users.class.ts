import {Service, KnexServiceOptions} from 'feathers-knex';
import {Application} from '../../declarations';
import createApplication from "@feathersjs/feathers";

export interface UserData {
    id: number;
    email: string;
    password: string;
    firstname?: string;
    lastname?: string;
    isGodfather: boolean;
    isAdmin: boolean;
    token: number;
}

export class Users extends Service<UserData> {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(options: Partial<KnexServiceOptions>, private app: Application) {
        super({
            ...options,
            name: 'users'
        });
    }

    // I want to die
    async find(params?: createApplication.Params): Promise<UserData[] | createApplication.Paginated<UserData>> {

        const withAnswers: boolean = params?.query?.answers;
        delete params?.query?.answers;

        let users: any = await super.find(params);

        if (withAnswers) {
            users = users.filter((user: any) => !user.isGodfather);

            const db = this.app.get('knexClient');
            const questions = await db('questions').select('id as questionId', 'content as questionContent');

            for (let user of users) {
                user['questions'] = [];
                for (let question of questions) {
                    const answer = ( await db('answers').select('id as answerId', 'content as answerContent')
                        .where({'userId': user.id, 'questionId': question.questionId}) )[0];
                    user['questions'].push( {...question, ...answer} )
                }
            }
        }

        return users;
    }

}
