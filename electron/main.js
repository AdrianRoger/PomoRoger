import { ipcMain, app, BrowserWindow, Menu } from "electron";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config();

const createWindow = () => {
  try {
    const mainWindow = new BrowserWindow({
      width: 800,
      // maxWidth: 768,
      height: 600,
      frame: false,
      webPreferences: {
        preload: path.join(__dirname, "preload.js"),
        contextIsolation: true,
        nodeIntegration: false,
        enableRemoteModule: false,
      },
    });

    Menu.setApplicationMenu(null);

    if (process.env.NODE_ENV === "development") {
      mainWindow.webContents.openDevTools();
      mainWindow.loadURL("http://localhost:5173");
    } else {
      mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
    }

    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

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
