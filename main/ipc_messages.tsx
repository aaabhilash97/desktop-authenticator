const logger = require("electron-timber");
import { ipcMain } from "electron";
import { IpcMessageArg } from "../types/ipc";
export default function initIpcMainMessages() {
  ipcMain.on("messages", async (event, arg: IpcMessageArg) => {
    try {
      logger.log("ipc.Messages", "channel:", arg.channel);
      if (arg.channel == "channel_name11") {
        // Do some stuff
        event.reply(arg.response_channel, {});
      } else {
        event.reply("default", {});
      }
    } catch (error) {
      logger.error(error);
      event.reply(arg.response_channel, {
        error,
      });
    }
  });
}
