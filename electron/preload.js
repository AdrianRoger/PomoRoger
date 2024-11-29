// import { contextBridge, ipcRenderer } from 'electron';
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('electron', {
  send: (channel, data) => ipcRenderer.send(channel, data),
  receive: (channel, callback) => ipcRenderer.on(channel, callback),
  closeApp: () => ipcRenderer.send("close-app"),
  startDrag: (clientX, clientY) => ipcRenderer.send("start-drag", clientX, clientY),
  moveDrag: (clientX, clientY) => ipcRenderer.send("drag-move", clientX, clientY),
  stopDrag: () => ipcRenderer.send("stop-drag"),
  setSizeLarge: () => ipcRenderer.send('resize-large'),
  setSizeMedium: () => ipcRenderer.send('resize-medium'),
  setSizeSmall: () => ipcRenderer.send('resize-small'),
  setSizeRestore: () => ipcRenderer.send('resize-restore'),
  setMinimized: () => ipcRenderer.send('minimize-app'),
  onWindowResize: (callback) => ipcRenderer.on("window-resized", (event, data) => callback(data)),
});