import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import $ from 'jquery';
import electron from 'electron';
import html from './index.html';

electron.ipcRenderer.send("ready");
electron.ipcRenderer.on("data", (event, data) => {
  data.forEach(e => console.log(e));
});

$("#app").html(html)

window.openConfig = () => {
  electron.ipcRenderer.send("apri.config.open");
  $(event.target).blur();
}
