// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from '../../services/users/users.class';
import {checkAdmin} from '../common-checks';

// check that an user is modified either by himself, either by an admin
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const currentUser: UserData = context.app.service('users').get(context.id);
        const loggedUser: UserData = context.params.user;
        if (!checkAdmin(context) && currentUser.id !== loggedUser.id)
            throw new Error(`User ${loggedUser.email} can't modify ${currentUser.email}!`);

        return context;
    };
};
