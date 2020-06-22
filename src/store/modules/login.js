export default {
    state: {
        uname: null,
        oldUpwd: null
    },
    mutations: {
        setUname(state, value) {
            state.uname = value;
        },
        setOldUpwd(state, value) {
            state.oldUpwd = value;
        }
    },
    actions: {
        setUname(context, value) {
            context.commit('setUname', value)
        },
        setOldUpwd(context, value) {
            context.commit('setOldUpwd', value)
        }
    }
}