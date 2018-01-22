var electron = require('electron');

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

electron.ipcRenderer.send("ready");
electron.ipcRenderer.on("data", (event, data) => {
  data.forEach(e => console.log(e));
})
