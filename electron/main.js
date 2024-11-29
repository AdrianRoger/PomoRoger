import { ipcMain, app, BrowserWindow, Menu } from "electron";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config();

const createWindow = () => {
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;
  let oldSize = 600;

  try {
    const mainWindow = new BrowserWindow({
      width: 600,
      height: 450,
      frame: false,
      resizable: false,
      transparent: true,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        contextIsolation: true,
        nodeIntegration: false,
        enableRemoteModule: false,
      },
    });

    Menu.setApplicationMenu(null);

    if (process.env.NODE_ENV === "development") {
      // mainWindow.webContents.openDevTools();
      mainWindow.loadURL("http://localhost:5173");
    } else {
      mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
    }

    mainWindow.on('resize', () => {
      const {width, height} = mainWindow.getBounds();
      mainWindow.webContents.send('window-resized', {width, height});
    });

    ipcMain.on("start-drag", (event, clientX, clientY) => {
      // Start dragging
      isDragging = true;
      offsetX = clientX;
      offsetY = clientY;
    });

    ipcMain.on("drag-move", (event, clientX, clientY) => {
      if (isDragging) {
        const deltaX = clientX - offsetX;
        const deltaY = clientY - offsetY;

        // Move the window
        mainWindow.setBounds({
          x: mainWindow.getBounds().x + deltaX,
          y: mainWindow.getBounds().y + deltaY,
          width: mainWindow.getBounds().width,
          height: mainWindow.getBounds().height,
        });

        offsetX = clientX;
        offsetY = clientY;
      }
    });

    ipcMain.on("stop-drag", () => {
      // Stop dragging
      isDragging = false;
    });

    ipcMain.on("resize-large", () => {
      const size = 600;
      oldSize = size;
      mainWindow.setBounds({width: size, height: 450});
    });

    ipcMain.on("resize-medium", () => {
      const size = 320;
      oldSize = size;
      mainWindow.setBounds({width: size, height: 450});
    });

    ipcMain.on("resize-small", () => {
      mainWindow.setBounds({width: 300, height: 150});
    });
    
    ipcMain.on("resize-restore", () => {
      mainWindow.setBounds({width: oldSize, height: 450});
    });

    ipcMain.on("minimize-app", () => {
      mainWindow.minimize();
    });

  } catch (error) {
    console.log(`Error:: ${error.message}`);
  }
};

// Handle IPC events
ipcMain.on("close-app", () => {
  app.quit();
});

//APP life cycle
app.on("ready", createWindow);

app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());

app.on(
  "activate",
  () => BrowserWindow.getAllWindows().length === 0 && createWindow()
);
