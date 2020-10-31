// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import app from '../../app';
import {UserData} from '../../services/users/users.class';
import {checkAdmin} from '../common-checks';

// check if an user is admin, throw an error if he isn't
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const user: UserData = context.params.user;
        const questionAuthor: number = (await app.service('questions').get(context.data['idQuestion'])).authorId;
        if (!checkAdmin(context) || user.id !== questionAuthor)
            throw new Error(`User ${user.email} isn't allowed to edit this question!`);

        return context;
    };
};
