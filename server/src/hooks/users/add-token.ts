// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';

export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        context.data['token'] = Math.floor(100000 + Math.random() * 900000);
        return context;
    };
};
