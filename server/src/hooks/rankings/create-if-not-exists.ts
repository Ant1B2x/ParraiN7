// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';

// create the rank if it's unexistant
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        try {
            const result = await context.app.service('rankings').find({
                query: {
                    godfatherId: context.params.user.id,
                    godsonId: context.data.godsonId
                },
                user: context.params.user
            });
            if (result.length === 0)
                throw new Error('Attention !');
            context.id = result[0]['id']
        } catch (err) {
            const result = await context.app.service('rankings').create(context.data, {
                user: context.params.user
            });
            // context.data['id'] = result['id'];
            context.id = result['id']
        }

        return context;
    };
};
