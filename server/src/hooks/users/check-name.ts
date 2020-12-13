/* eslint-disable indent */
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {BadRequest} from "@feathersjs/errors";

const nameValidity =
    RegExp("^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$");

// check that user's firstname and lastname are well-formed
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        if (context.data['firstname'] && !nameValidity.test(context.data['firstname']))
            throw new BadRequest('Firstname does not respect the expected format!');

        if (context.data['lastname'] && !nameValidity.test(context.data['lastname']))
            throw new BadRequest('Lastname does not respect the expected format!');

        return context;
    };
};
