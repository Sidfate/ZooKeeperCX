import Vue from 'vue'
import Vuex from 'vuex'
import { getConnectionList, getConnectionMap, getSetting, setSetting, addConnection, deleteConnection } from '@/utils/localStore'

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
      loading: false,
      server: '',
      name: '',
      handler: null,
      status: false
    },
    node: {
      status: false,
      path: '',
    },
    setting: {
      theme: getSetting('theme', 'dark')
    },
    connectionList: getConnectionList(),
    connectionMap: getConnectionMap()
  },
  mutations: {
    sendMsg (state, { msg, isError }) {
      state.snackbar.status = true
      state.snackbar.msg = msg
      state.snackbar.isError = !!isError
      state.snackbar.color = state.snackbar.isError ? 'error' : 'info'
    },
    closeMsg (state) {
      state.snackbar.status = false
    },
    toggleConnectLoading (state) {
      state.connection.loading = !state.connection.loading
    },
    updateConnections (state, { connectionList, connectionMap }) {
      state.connectionList = connectionList
      state.connectionMap = connectionMap
    },
    updateConnection (state, connection) {
      state.connection = Object.assign(state.connection, connection)
    },
    changeTheme (state, theme) {
      state.setting.theme = theme
    },
    cleanUpConnection (state) {
      state.connection.name = ''
      state.connection.server = ''
      state.status = false
      state.loading = false
      state.handler = null
    },
    updateNode (state, node) {
      state.node = node
    }
  },
  actions: {
    sendMsg (context, { msg, isError }) {
      context.commit('sendMsg', { status, msg, isError })
    },
    closeMsg (context) {
      context.commit('closeMsg')
    },
    toggleConnectLoading (context) {
      context.commit('toggleConnectLoading')
    },
    createConnection (context, connection) {
      addConnection(connection)
      context.commit('updateConnections', {
        connectionList: getConnectionList(),
        connectionMap: getConnectionMap()
      })
      context.commit('updateConnection', connection)
    },
    deleteConnection(context, name) {
      deleteConnection(name)
      context.commit('updateConnections', {
        connectionList: getConnectionList(),
        connectionMap: getConnectionMap()
      })
      context.commit('cleanUpConnection')
    },
    connect (context, connection) {
      connection.status = true
      context.commit('updateConnection', connection)
    },
    changeTheme (context, theme) {
      setSetting('theme', theme)
      context.commit('changeTheme', theme)
    },
    selectNode (context, node) {
      node['status'] = true
      context.commit('updateNode', node)
    }
  }
})
