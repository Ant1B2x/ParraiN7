// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {Timeout} from "@feathersjs/errors";

// check that the expiration date from config file is not reached and ensure
// that we still can create or update questions, answers and rankings
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {

        if (context.app.get('expirationDate')) { // only in production mode
            const expirationDate = new Date(context.app.get('expirationDate'));
            if (new Date() >= expirationDate)
                throw new Timeout(`Expiration date reached! (${expirationDate.toString()})`);
        }

        return context;
    };
};
