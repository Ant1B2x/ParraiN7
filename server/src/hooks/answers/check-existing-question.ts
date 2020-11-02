// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {AnswerData} from '../../services/answers/answers.class';
import {QuestionData} from '../../services/questions/questions.class';

// check if the provided questionId exists or not in questions table
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const answer: AnswerData = context.data;
        await context.app.service('questions').find({
            query: {
                id: answer.questionId
            }
        }).then((questions: Array<QuestionData>) => {
            if(!questions.length)
                throw new Error(`There's no question of id ${answer.questionId}!`);
        });

        return context;
    };
};
