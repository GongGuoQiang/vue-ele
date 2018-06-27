/**
 * Created by admin on 2017/1/12.
 */
 import * as types from './mutation_type';

export default {
    [types.LOGIN] (state , user) {
        if (user) {
            state.userInfo.name = user.name;
            state.userInfo.password = user.password;
        }
    }
}
