const schedule = require('node-schedule');
const api = require('@/apis/checkUpdate');
const { shell, remote } = require('electron');

const checkCallback = () => {
  console.log('first time')
  api.checkUpdate()
    .then(function (response) {
      const data = response.data;
      let remoteVersion = data['tag_name'];
      const localVersion = remote.getGlobal('version');
      remoteVersion = remoteVersion.slice(1);

      console.log(localVersion)
      if (remoteVersion > localVersion) {
        remote.dialog.showMessageBox({
          title: 'Update Notice',
          type: 'info',
          buttons: ['GO FOR DETAIL', 'CANCEL'],
          message: `We have released a new version [${remoteVersion}], your version [${localVersion}].Go for downloading and updating now!`,
        }, (number) => {
          if(number === 0) {
            shell.openExternal(data['html_url'])
          }
        })
      }
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
}
schedule.scheduleJob('* * */6 * * *', checkCallback());
checkCallback();
