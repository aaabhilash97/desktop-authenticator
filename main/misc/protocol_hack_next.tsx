import * as path from "path";
import { protocol } from "electron";

export default function nextJSProtocolHack(htmlRootDir: string) {
  protocol.interceptFileProtocol(
    "file",
    (request, callback) => {
      const url: string = request.url.substr(7); // strip "file://" out of all urls
      if (url.startsWith("/_next/")) {
        return callback(path.normalize(`${htmlRootDir}/${url}`));
      } else {
        return callback(url);
      }
    },
    (error: any) => {
      if (error) console.error(error);
    }
  );
}
