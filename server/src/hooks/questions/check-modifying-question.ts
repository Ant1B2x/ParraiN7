// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from '../../services/users/users.class';
import {QuestionData} from '../../services/questions/questions.class';
import {checkAdmin} from '../common-checks';
import {Forbidden} from "@feathersjs/errors";

// check that a question can only be modified by its author or an admin
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const question: QuestionData = await context.app.service('questions').get(context.id);
        const loggedUser = context.params.user;
        if (loggedUser && question.authorId !== loggedUser.id && !checkAdmin(context))
            throw new Forbidden(`User ${loggedUser.email} can't modify question ${question.id}!`);

        return context;
    };
};
