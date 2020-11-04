// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {NotAcceptable} from "@feathersjs/errors";

// check that a rank is between 1 and 5
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const rank: number = context.data['rank'];
        if (rank && (context.data['rank'] < 1 || context.data['rank'] > 5))
            throw new NotAcceptable('Rank must be between 1 and 5');

        return context;
    };
};
