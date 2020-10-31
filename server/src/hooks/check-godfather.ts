// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from '../services/users/users.class';

// check if an user is godfather, throw an error if he isn't
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const user: UserData = context.params.user;
        if (!user.isGodfather)
            throw new Error(`User ${user.email} isn't godfather!`);

        return context;
    };
};
