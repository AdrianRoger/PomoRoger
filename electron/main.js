import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { config } from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config();


const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    // maxWidth: 768,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
      nodeIntegration: true,
      openDevTools: true
    },
  });

  mainWindow.webContents.openDevTools();

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173");
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
};

app.on("ready", createWindow);

app.on("window-all-closed", () => process.platform !== "darwin" && app.quit());

app.on(
  "activate",
  () => BrowserWindow.getAllWindows().length === 0 && createWindow()
);
