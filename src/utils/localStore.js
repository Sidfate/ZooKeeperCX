import Store from 'electron-store'
import _ from 'lodash'

const store = new Store()
const CONNECTION_LIST = 'connectionList'
const CONNECTION_MAP = 'connectionMap'
const SETTINGS = 'settings'

function setConnectionList(connectionList) {
  store.set(CONNECTION_LIST, connectionList)
}

function setConnectionMap(connectionMap) {
  store.set(CONNECTION_MAP, connectionMap)
}

export function getConnectionList() {
  return store.has(CONNECTION_LIST) ? store.get(CONNECTION_LIST) : []
}

export function getConnectionMap() {
  return store.has(CONNECTION_MAP) ? store.get(CONNECTION_MAP) : {}
}

export function addConnection(connection) {
  let list = getConnectionList()
  let map = getConnectionMap()

  if(_.has(map, connection.name)) {
    return
  }

  list.unshift(connection)
  connection.index = list.length
  map[connection.name] = connection

  setConnectionList(list)
  setConnectionMap(map)
}

export function deleteConnection(name) {
  let list = getConnectionList()
  let map = getConnectionMap()

  if(!_.has(map, name)) {
    return
  }

  const temp = Object.assign({}, map[name])
  _.unset(map, name)
  _.pullAt(list, list.length - temp.index)

  setConnectionList(list)
  setConnectionMap(map)
}

export function clearConnections() {
  setConnectionList([])
  setConnectionMap({})
}

export function getConnection(key) {
  const map = getConnectionMap()
  return _.get(map, key, null)
}

export function getSettings() {
  return store.has(SETTINGS) ? store.get(SETTINGS) : {}
}

export function setSettings(settings) {
  return store.set(SETTINGS, settings)
}

export function getSetting(key, defaultValue) {
  const settings = getSettings()

  return _.get(settings, key, defaultValue)
}

export function setSetting(key, value) {
  const settings = getSettings()

  _.set(settings, key, value)
  setSettings(settings)
}

export function cleanStore() {
  store.clear()
}
