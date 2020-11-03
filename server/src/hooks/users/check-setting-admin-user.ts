// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from '../../services/users/users.class';
import {Forbidden} from "@feathersjs/errors";

// ensure that a non-admin user cannot set himself as admin
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const newData: UserData = context.data;
        const loggedUser: UserData = context.params.user;
        if (!loggedUser.isAdmin && newData['isAdmin'])
            throw new Forbidden(`User ${loggedUser.email} can't set himself as admin!`);

        return context;
    };
};
