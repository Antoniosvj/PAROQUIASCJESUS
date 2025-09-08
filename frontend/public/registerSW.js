// if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/sw.js', { scope: '/' })})}

//codigo novo

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js", { scope: "/" }).then((registration) => {
      // Verifica se há uma nova versão do Service Worker
      registration.onupdatefound = () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.onstatechange = () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              console.log("Nova versão disponível. Atualizando...");
              newWorker.postMessage({ type: "SKIP_WAITING" });
              window.location.reload(); // Recarrega a página automaticamente
            }
          };
        }
      };
    });
  });
}
