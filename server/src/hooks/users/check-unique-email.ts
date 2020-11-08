// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {Conflict} from '@feathersjs/errors';

// ensure that user has entered a non-existent email
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {

        if (context.data['email']) {
            const emails = await context.app.service('users').find({
                query: {
                    email: context.data['email']
                }
            });
            if (emails.length > 0)
                throw new Conflict('A user already has this email!');
        }

        return context;
    };
};
