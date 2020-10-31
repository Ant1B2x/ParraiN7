// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from '../../services/users/users.class';

// set logged user as author of the question
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const user: UserData = context.params.user;
        context.data['authorId'] = user.id;
        console.log(user);

        return context;
    };
};
