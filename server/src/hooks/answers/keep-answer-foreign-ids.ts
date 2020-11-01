// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {AnswerData} from '../../services/answers/answers.class';

// ensure that userId and questionId cannot be modified for an answer
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const answer: AnswerData = context.app.service('answers').get(context.id);
        context.data['userId'] = answer.userId;
        context.data['questionId'] = answer.questionId;

        return context;
    };
};
