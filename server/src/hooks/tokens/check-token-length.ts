// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {NotAcceptable} from "@feathersjs/errors";

// check that a new token is 6 digit long
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const tokenString = String(context.data['token']);

        if (tokenString.length != 6)
            throw new NotAcceptable('Token must be 6 digit long!');

        return context;
    };
};
