import { ipcMain } from "electron";

ipcMain.on("messages", (event, arg) => {
  event.reply("asynchronous-reply", "pong");
});
