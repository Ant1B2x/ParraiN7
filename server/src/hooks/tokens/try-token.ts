// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';

// I'm trusting Esteban for this one.
// Not anymore. I did it alllllllll over again. Was very hard. Love, Yvan.

// check that user has entered a conform institutional email
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {

        const user = context.params.user;

        console.log(context.id);
        if (context.id)
            console.log(await context.service.get(context.id));

        console.log(context.params.user);

        console.log(context.data);

        return context;
    };
};
