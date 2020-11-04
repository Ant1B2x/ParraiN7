// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from '../services/users/users.class';
import {checkGodfather} from './common-checks';
import {Forbidden} from "@feathersjs/errors";

// check if an user is godfather, throw an error if he isn't
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const user: UserData = context.params.user;
        if (!checkGodfather(context))
            throw new Forbidden(`User ${user.email} isn't godfather!`);

        return context;
    };
};
