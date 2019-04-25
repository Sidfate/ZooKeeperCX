
const zkClient = require('node-zookeeper-client');

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

export {
  connect,
  getChildren,
  getData
}
