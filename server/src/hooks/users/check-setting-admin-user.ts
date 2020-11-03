// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from '../../services/users/users.class';
import {Forbidden} from "@feathersjs/errors";

// check that an user could only be set admin by an admin
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const currentUser: UserData = await context.app.service('users').get(context.id);
        const loggedUser: UserData = context.params.user;
        if (currentUser.isAdmin && !loggedUser.isAdmin)
            throw new Forbidden(`User ${loggedUser.email} can't modify ${currentUser.email}!`);

        return context;
    };
};
