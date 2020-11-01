// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import {Hook, HookContext} from '@feathersjs/feathers';
import {RankingData} from '../../services/rankings/rankings.class';

// ensure that userId and questionId cannot be modified for an answer
export default (options = {}): Hook => {
    return async (context: HookContext): Promise<HookContext> => {
        const ranking: RankingData = context.app.service('rankings').get(context.id);
        context.data['godfatherId'] = ranking.godfatherId;
        context.data['godsonId'] = ranking.godsonId;

        return context;
    };
};
