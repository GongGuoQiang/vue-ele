/**
 * Created by admin on 2017/1/12.
 */
import * as types from './mutation_type';

export default {
    login({ commit }, user){
        commit(types.LOGIN , user)
    },
}
