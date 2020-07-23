import { app } from "electron";
const path = require("path");
const homeFolder = app.getPath("home");

// Type 3: Persistent datastore with automatic loading
var Datastore = require("nedb");

export const customers = new Datastore({
  filename: path.join(homeFolder, ".susu/db/customers.db"),
  autoload: true
});
