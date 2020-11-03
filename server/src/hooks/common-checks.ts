// common checks used by different hooks

import {HookContext} from "@feathersjs/feathers";
import {UserData} from "../services/users/users.class";

export const checkAdmin = (context: HookContext): boolean => {
    const user: UserData = context.params.user;
    return user.isAdmin;
};

export const checkGodfather = (context: HookContext): boolean => {
    const user: UserData = context.params.user;
    return user.isGodfather;
};

export const checkGodson = (context: HookContext): boolean => {
    return !checkGodfather(context);
};
