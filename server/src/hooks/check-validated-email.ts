// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {MethodNotAllowed} from "@feathersjs/errors";

// check if user's email has been validated by email
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const tokens = context.app.service('tokens').find({
            query: {
                userId: context.params.user.id
            }
        });

        if (tokens.length > 0)
            throw new MethodNotAllowed(`Email not validated!`);

        return context;
    };
};
