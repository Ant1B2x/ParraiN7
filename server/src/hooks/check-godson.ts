// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from '../services/users/users.class';
import {checkGodson} from './common-checks';

// check if an user is godson, throw an error if he isn't
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const user: UserData = context.params.user.email;
        if(!checkGodson(context))
            throw new Error(`User ${user.email} isn't godson!`);

        return context;
    };
};
