import * as feathersAuthentication from '@feathersjs/authentication';
import * as local from '@feathersjs/authentication-local';
import checkEmail from '../../hooks/users/check-email';
import checkName from '../../hooks/users/check-name';
import unsetAdmin from '../../hooks/users/unset-admin';
import checkModifyingUser from '../../hooks/users/check-modifying-user';
import checkSettingAdminUser from '../../hooks/users/check-setting-admin-user';
import hideGodsonName from '../../hooks/users/hide-godson-name';
import hideGodsonsNames from '../../hooks/users/hide-godsons-names';
import addToken from '../../hooks/users/add-token';
import hideToken from '../../hooks/users/hide-token';
import {add} from "winston";
// Don't remove this comment. It's needed to format import lines nicely.

const {authenticate} = feathersAuthentication.hooks;
const {hashPassword, protect} = local.hooks;

export default {
    before: {
        all: [],
        find: [authenticate('jwt')],
        get: [authenticate('jwt')],
        create: [checkEmail(), checkName(), unsetAdmin(), addToken(), hashPassword('password')],
        update: [authenticate('jwt'), checkModifyingUser(), checkSettingAdminUser(), checkEmail(), checkName(), hashPassword('password')],
        patch: [authenticate('jwt'), checkModifyingUser(), checkSettingAdminUser(), checkEmail(), checkName(), hashPassword('password')],
        remove: [authenticate('jwt'), checkModifyingUser()]
    },

    after: {
        all: [
            // Make sure the password field is never sent to the client
            // Always must be the last hook
            protect('password')
        ],
        find: [hideGodsonsNames(), hideToken()],
        get: [hideGodsonName(), hideToken()],
        create: [hideToken()],
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
