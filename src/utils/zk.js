
const zkClient = require('node-zookeeper-client')

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

export {
  zkClient,
  connect,
  getChildren,
  getData,
  getAcl,
  createNode,
  removeNode
}
