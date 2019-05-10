
const zkClient = require('node-zookeeper-client')

/**
 * connect to zk server
 * @param server
 * @returns {Promise<any>}
 */
function connect(server) {
  return new Promise((resolve, reject) => {
    let change = false
    const client = zkClient.createClient(server)
    client.once('connected', () => {
      if(change) return
      change = true
      resolve(client)
    })
    client.connect()

    setTimeout(()=> {
      if(!change) {
        change = true
        reject()
      }
    }, 1000)
  })
}

/**
 * get children nodes
 * @param client
 * @param path
 * @returns {Promise<any>}
 */
function getChildren(client, path) {
  return new Promise((resolve, reject) => {
    if(!client) {
      return
    }

    client.getChildren(path, (error, children, stats) => {
      if(error) {
        reject(error)
      }
      console.log(stats)

      resolve(children)
    })
  })
}

/**
 * get node data
 * @param client
 * @param path
 * @returns {Promise<any>}
 */
function getData(client, path) {
  return new Promise((resolve, reject) => {
    if(!client) {
      return
    }

    client.getData(path, (error, data, stats) => {
      if(error) {
        reject(error)
      }

      resolve({ data, stats })
    })
  })
}

/**
 * get node acl
 * @param client
 * @param path
 * @returns {Promise<any>}
 */
function getAcl(client, path) {
  return new Promise((resolve, reject) => {
    if(!client) {
      return
    }

    client.getACL(path, function (error, acls) {
      if (error) {
        reject(error)
      }

      resolve(acls)
    });
  })
}

/**
 * create a new node
 * @param client
 * @param path
 * @param data
 * @param acls
 * @param createModel
 * @returns {Promise<any>}
 */
function createNode(client, { path, data, acls, createModel }) {
  return new Promise((resolve, reject) => {
    if(!client) {
      return
    }
    if(typeof data !== 'undefined' && data !== null) {
      data = new Buffer(data)
    }

    client.create(path, data, acls, createModel, function (error, path) {
      if (error) {
        reject(error)
      }

      resolve(path)
    });
  })
}

/**
 * remove the node
 * @param client
 * @param path
 * @returns {Promise<any>}
 */
function removeNode(client, path) {
  return new Promise((resolve, reject) => {
    if(!client) {
      return
    }

    client.remove(path, -1, function (error) {
      if (error) {
        reject(error)
      }

      console.log(path + ' Node is deleted.');
      resolve()
    });
  })
}

/**
 * check if the path is valid
 * @param path
 * @returns {*|boolean}
 */
function checkPath (path) {
  console.log(path)
  let regex = new RegExp("^/([^/\\0]+(/)?)+$", "gi")
  let matchArr = path.match(regex)
  console.log(matchArr)

  return matchArr && matchArr.length > 0
}

export {
  zkClient,
  connect,
  getChildren,
  getData,
  getAcl,
  createNode,
  removeNode,
  checkPath
}
