// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {checkAdmin} from '../common-checks';
import {checkGodfather} from '../common-checks';

// hide godsons names from non-admin godfathers on find requests
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        if (context.params.user && checkGodfather(context) && !checkAdmin(context))
            for (let sentUser of context.result)
                if (!sentUser.isGodfather) {
                    sentUser['email'] = "hidden";
                    sentUser['firstname'] = "hidden";
                    sentUser['lastname'] = "hidden";
                }

        return context;
    };
};
