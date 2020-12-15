// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {QuestionData} from '../../services/questions/questions.class';

// ensure that authorId is set as last author id
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const question: QuestionData = await context.app.service('questions').get(context.id, {
            user: context.params.user
        });
        context.data['authorId'] = context.params.user?.id;

        return context;
    };
};
