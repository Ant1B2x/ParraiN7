// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import * as local from '@feathersjs/authentication-local';
import {UserData} from '../../services/users/users.class';
import {checkAdmin} from '../common-checks';
import {checkGodfather} from '../common-checks';

const {protect} = local.hooks;

// check that non-admin godfathers can't get or find users names
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        if (context.params.user && checkGodfather(context) && !checkAdmin(context) && Array.isArray(context.result))
            for (let sentUser of context.result) {
                sentUser['email'] = "hidden";
                sentUser['firstname'] = "hidden";
                sentUser['lastname'] = "hidden";
            }

        return context;
    };
};
