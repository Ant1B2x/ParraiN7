import {Service, KnexServiceOptions} from 'feathers-knex';
import {Application} from '../../declarations';
import createApplication from "@feathersjs/feathers";

export interface QuestionData {
    id?: number;
    content: string;
    placeholder?: string;
    authorId: number;
}

export class Questions extends Service<QuestionData> {
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    constructor(options: Partial<KnexServiceOptions>, private app: Application) {
        super({
            ...options,
            name: 'questions'
        });
    }

    async get(id: createApplication.Id, params?: createApplication.Params): Promise<QuestionData> {
        let question: any = await super.get(id, params);

        const db = this.app.get('knexClient');

        const author = ( await db('users').select('firstname', 'lastname')
            .where('id', question.authorId) )[0];
        question['authorFirstname'] = author['firstname'];
        question['authorLastname'] = author['lastname'];

        return question;
    }

    // I want to die round 2
    async find(params?: createApplication.Params): Promise<QuestionData[] | createApplication.Paginated<QuestionData>> {

        const withAnswers: boolean = params?.query?.answers;
        const godsonId: number = params?.query?.godsonId;
        delete params?.query?.answers;
        delete params?.query?.godsonId;

        let questions: any = await super.find(params);

        const db = this.app.get('knexClient');

        if (withAnswers && godsonId) {
            const answers = await db('answers').select('id as answerId', 'content as answerContent', 'questionId')
                .where('userId', godsonId);

            for (let question of questions) {
                const answer = answers.find((answer: any) => answer.questionId === question.id);
                question['answerId'] = answer?.answerId;
                question['answerContent'] = answer?.answerContent;
            }
        }

        for (let question of questions) {
            const author = ( await db('users').select('firstname', 'lastname')
                .where('id', question.authorId) )[0];
            question['authorFirstname'] = author['firstname'];
            question['authorLastname'] = author['lastname'];
        }

        return questions;
    }

}
