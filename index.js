const electron = require("electron");
const { app, BrowserWindow } = electron; // app represent the overall running process of electron

app.on("ready", () => {
  const mainWindow = new BrowserWindow({}); //it shows the content to the user, it create a new window
  mainWindow.loadURL(`file://${__dirname}/index.html`);
});
