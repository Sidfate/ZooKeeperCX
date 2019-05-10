import Vue from 'vue'
import Vuex from 'vuex'
import { getConnectionList, getConnectionMap, getSetting, setSetting, addConnection, deleteConnection, clearConnections } from '@/utils/localStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
      msg: '',
      status: false,
      isError: false,
      color: 'info'
    },
    modal: {
      status: false,
      title: 'Notice',
      description: '',
      sureBtn: 'Next',
      cancelBtn: 'Cancel',
      next: null
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
      state.connection.status = false
      state.connection.loading = false
      state.connection.handler = null
    },
    cleanUpNode (state) {
      state.node.status = false
      state.node.path = ''
      state.node.name = ''
    },
    updateNode (state, node) {
      state.node = node
    },
    openModal (state, modal) {
      for(let key in modal) {
        state.modal[key] = modal[key]
      }
      state.modal.status = true
      console.log(state.modal)
    },
  },
  actions: {
    showModal (context, modal) {
      context.commit('openModal', modal)
    },
    sendMsg (context, { msg, isError }) {
      context.commit('sendMsg', { msg, isError })
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
      // context.commit('updateConnection', connection)
    },
    deleteConnection(context, name) {
      deleteConnection(name)
      context.commit('updateConnections', {
        connectionList: getConnectionList(),
        connectionMap: getConnectionMap()
      })
      context.commit('cleanUpConnection')
    },
    clearConnections(context) {
      clearConnections()
      context.commit('updateConnections', {
        connectionList: [],
        connectionMap: {}
      })
      context.commit('cleanUpConnection')
    },
    connect (context, connection) {
      context.commit('cleanUpNode')
      connection.status = true
      connection.loading = true
      context.commit('updateConnection', connection)
    },
    stopLoadingConnection (context) {
      const connection = Object.assign({}, context.state.connection)
      connection.loading = false
      context.commit('updateConnection', connection)
    },
    changeTheme (context, theme) {
      setSetting('theme', theme)
      context.commit('changeTheme', theme)
    },
    selectNode (context, node) {
      node['status'] = true
      context.commit('updateNode', node)
    },
    closeConnection(context) {
      context.commit('cleanUpNode')
      context.commit('cleanUpConnection')
    },
    closeNode(context) {
      context.commit('cleanUpNode')
    }
  }
})
