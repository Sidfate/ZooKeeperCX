const axios = require('axios');

function checkUpdate() {
  return axios.get('https://api.github.com/repos/Sidfate/ZooKeeperCX/releases/latest', {
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  });
}

module.exports.checkUpdate = checkUpdate

