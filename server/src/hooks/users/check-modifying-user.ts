// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from '../../services/users/users.class';
import {checkAdmin} from '../common-checks';
import {Forbidden} from "@feathersjs/errors";

// check that an user is modified either by himself, either by an admin
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const currentUser: UserData = await context.app.service('users').get(context.id);
        const loggedUser = context.params.user;
        if (loggedUser && !checkAdmin(context) && currentUser.id !== loggedUser.id)
            throw new Forbidden(`User ${loggedUser.email} can't modify ${currentUser.email}!`);

        return context;
    };
};
