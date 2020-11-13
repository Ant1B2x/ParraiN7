// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {Forbidden, NotAcceptable} from "@feathersjs/errors";

// create the rank if it's unexistant
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        if (!context.data['godsonId'])
            throw new NotAcceptable('You have to provide a godsonId!');

        if (!context.params.user)
            throw new Forbidden('You have to be logged in!')

        const result = await context.app.service('rankings').find({
            query: {
                godfatherId: context.params.user.id,
                godsonId: context.data.godsonId
            },
            user: context.params.user
        });
        if (result.length === 0) {
            const result = await context.app.service('rankings').create(context.data, {
                user: context.params.user
            });
            context.id = result['id'];
        } else {
            context.id = result[0]['id']
        }

        return context;
    };
};
