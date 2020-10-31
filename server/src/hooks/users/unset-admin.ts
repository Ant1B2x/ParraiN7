// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';

// a user shouldn't be admin by default
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        context.data['isAdmin'] = false;
        return context;
    }
};
