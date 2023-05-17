const { app, BrowserWindow, Menu, ipcMain } = require("electron");
ipcMain.on("msg", (event, data) => {
  console.warn(data);
  event.reply("reply", "thank you for data");
});

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // backgroundColor: "#ff0000",
    title: "awasome app",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  //   const child = new BrowserWindow({ parent: win });
  //   child.loadFile("child.html");
  //   child.show();
  win.loadFile("index.html"); //load a local html file
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow); //return promise
