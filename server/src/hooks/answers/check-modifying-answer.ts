// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {AnswerData} from '../../services/answers/answers.class';
import {Forbidden} from "@feathersjs/errors";

// check that an answer can only be modified by its author
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const loggedUser = context.params.user;
        const answer: AnswerData = await context.app.service('answers').get(context.id, {user: loggedUser});
        if (loggedUser && answer.userId !== loggedUser.id)
            throw new Forbidden(`User ${loggedUser.email} can't modify answer to question ${answer.questionId}!`);

        return context;
    };
};
