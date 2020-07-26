// Native
const { format } = require("url");

// Packages
const isDev = require("electron-is-dev");
const { resolve } = require("app-root-path");
const prepareRenderer = require("electron-next");

import { BrowserWindow, app } from "electron";
import initIpcMainMessages from "./ipc_messages";
import nextJSProtocolHack from "./misc/protocol_hack_next";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
  const devPath = "http://localhost:3000/";
  const prodPath = format({
    pathname: resolve("renderer/out/index.html"),
    protocol: "file:",
    slashes: true,
  });
  const url = isDev ? devPath : prodPath;
  if (isDev) {
    await prepareRenderer("./renderer", 3000);
  } else {
    const htmlRootDir = resolve("renderer/out/");
    nextJSProtocolHack(htmlRootDir);
  }

  const mainWindow = new BrowserWindow({
    width: isDev ? 900 : 400,
    height: 600,
    fullscreen: false,
    resizable: isDev ? true : false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
  console.log();
  mainWindow.loadURL(url);
  initIpcMainMessages();
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);
