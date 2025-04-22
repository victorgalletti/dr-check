const { contextBridge, ipcRenderer } = require("electron");

// Expõe APIs seguras do Electron para a aplicação web
contextBridge.exposeInMainWorld("electron", {
  // Funções para sincronização de dados
  syncData: (data) => ipcRenderer.invoke("sync-data", data),
  
  // Funções para verificar status de conexão
  isOnline: () => navigator.onLine,
  
  // Eventos de conexão
  onOnline: (callback) => {
    window.addEventListener("online", callback);
    return () => window.removeEventListener("online", callback);
  },
  onOffline: (callback) => {
    window.addEventListener("offline", callback);
    return () => window.removeEventListener("offline", callback);
  },
});
