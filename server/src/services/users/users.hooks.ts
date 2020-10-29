import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import {HookContext} from "@feathersjs/feathers";
import {HashPasswordOptions} from "@feathersjs/authentication-local/lib/hooks/hash-password";
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;
const {hashPassword, protect} = local.hooks;

const institutionalEmailRegexp = RegExp('^.*@etu\.toulouse-inp\.fr');
const checkEmail = () => {
    return async (context : HookContext) => {
        if (!institutionalEmailRegexp.test(context.data['email']))
            throw new Error('Email does not respect instutional email regexp');

        return context;
    }
}

const unsetAdmin = () => {
    return async (context : HookContext) => {
        context.data['isAdmin'] = false;
    }
}

export default {
    before: {
        // all: [authenticate('jwt')], TODO : implement authentication
        all: [],
        find: [],
        get: [],
        create: [checkEmail(), unsetAdmin(), hashPassword('password')],
        update: [hashPassword('password')],
        patch: [hashPassword('password')],
        remove: []
    },

    after: {
        all: [
            // Make sure the password field is never sent to the client
            // Always must be the last hook
            protect('password')
        ],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    },

    error: {
        all: [],
        find: [],
        get: [],
        create: [],
        update: [],
        patch: [],
        remove: []
    }
};
