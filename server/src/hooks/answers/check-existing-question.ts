// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {AnswerData} from '../../services/answers/answers.class';
import {QuestionData} from '../../services/questions/questions.class';

// set logged user as author of the question
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        let answer: AnswerData = context.data;
        await context.app.service('questions').find({
            query: {
                id: answer.questionId
            }
        }).then((data: Array<QuestionData>) => {
            if(!data.length)
                throw new Error(`There's no question of id ${answer.questionId}!`);
        });

        return context;
    };
};
