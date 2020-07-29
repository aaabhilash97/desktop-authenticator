import { ipcRenderer } from "electron";

import { IpcMessageArg } from "../../types/ipc";

export function send(channel: string, payload) {
  return new Promise((resolve, reject) => {
    const response_channel = `response_${channel}_` + new Date().getTime();
    let arg: IpcMessageArg = {
      channel: channel,
      response_channel: response_channel,
      payload: payload
    };
    ipcRenderer.send("messages", arg);
    ipcRenderer.once(
      response_channel,
      (event, response: { error: any; result: any }) => {
        if (!response) {
          return reject("empty result.");
        }
        if (response.error) {
          return reject(response.error);
        } else {
          return resolve(response.result);
        }
      }
    );
  });
}
