// common checks used by different hooks

import {HookContext} from "@feathersjs/feathers";
import {UserData} from "../services/users/users.class";

export const checkAdmin = (context: HookContext): boolean => {
    const user = context.params.user;
    if (user)
        return user.isAdmin;
    return false;
};

export const checkGodfather = (context: HookContext): boolean => {
    const user = context.params.user;
    if (user)
        return user.isGodfather;
    return false;
};

export const checkGodson = (context: HookContext): boolean => {
    return !checkGodfather(context);
};
