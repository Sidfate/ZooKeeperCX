import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      msg: '',
      status: false,
      isError: false,
      color: 'info'
    },
    connection: {
      loading: false
    }
  },
  mutations: {
    sendMsg (state, { msg, isError }) {
      state.snackbar.status = true
      state.snackbar.msg = msg
      state.snackbar.isError = !!isError
      state.snackbar.color = state.snackbar.isError ? 'error' : 'info'
    },
    toggleConnectLoading (state) {
      state.connection.loading = !state.connection.loading
    }
  },
  actions: {
    sendMsg (context, { msg, isError }) {
      context.commit('sendMsg', { status, msg, isError })
    },
    toggleConnectLoading (context) {
      context.commit('toggleConnectLoading')
    }
  }
})
