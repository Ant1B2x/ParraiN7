// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {UserData} from '../../services/users/users.class';
import {checkAdmin} from '../common-checks';
import {checkGodfather} from '../common-checks';

// hide godson name from non-admin godfathers on get requests
// warning : has to be included AFTER authenticate hook
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        let sentUser: UserData = context.result;
        sentUser['token'] = Number("hidden");
        return context;
    };
};
