const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  Menu,
  Tray,
  dialog,
  globalShortcut,
} = require("electron");
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
      contextIsolation: false,
    },
  });
  //   const child = new BrowserWindow({ parent: win });
  //   child.loadFile("child.html");
  //   child.show();
  win.loadFile("index.html"); //load a local html file

  //DIALOG BOX
  // globalShortcut.register("Shift+K",()=>{
  // 		dialog.showOpenDialog({
  // 			defaultPath: app.getPath('desktop'),
  // 			buttonLabel: 'select file',
  // 		});
  // })
  // win.webContents.openDevTools();

  //GLOBAL SHORTCUT KEY
  // globalShortcut.register("K",()=>{
  //  win.loadFile('other.html')
  //  console.warn("K key pressed")
  // })

  let tray = new Tray("./image/orbit.png");
  tray.setToolTip("tray to elctron app");
  // tray.on('click',()=>{
  // 	win.isVisible()?win.hide():win.show()
  // })
  let template = [{ label: "item1", type: "radio" }, { label: "item2" }];
  let contextMenu = Menu.buildFromTemplate(template);
  tray.setContextMenu(contextMenu);
  let wc = win.webContents;
  wc.on("dom-ready", () => {
    console.warn("app dom is ready");
  });
  wc.on("did-finish-load", () => {
    console.warn("did finish load");
  });
  wc.on("new-window", () => {
    console.warn("new window open");
  });

  wc.on("before-input-event", () => {
    console.warn("some key is pressed");
  });
  win.webContents.on("context-menu", () => {
    contextMenu.popup();
  });
}

app.whenReady().then(createWindow); //return promise

//ADD MENU
// let template1=[{label:'item1'},{label:'item2'},{role:'quit',label:'Close'},{role:'minimize'}]

/*
let isMac=process.platform=="darwin"
let template2 = [
    ...isMac ?{ label: 'Blog', submenu: [{ label: 'About' }, { label: 'Version' }] }:[],
    { label: 'File' },
    { label: 'Operation', submenu: [isMac ?{ role: 'close',label:'Close' }:{ role: 'quit',label:'Quit' },
     { label: 'Zoom' }] },
];
let menu = Menu.buildFromTemplate(template2);
Menu.setApplicationMenu(menu)
*/
