import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import React, { useEffect } from 'react';
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  useEffect(() => {
    let deferredPrompt;

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      deferredPrompt = e;

      const installAlert = document.createElement('div');
      installAlert.innerHTML = `
        <div style="position: fixed; bottom: 0; left: 0; width: 100%; background: #000; color: #fff; padding: 10px; text-align: center;">
          Deseja instalar este app? <button id="installBtn">Instalar</button>
        </div>
      `;
      document.body.appendChild(installAlert);

      const installBtn = document.getElementById('installBtn');
      installBtn.addEventListener('click', async () => {
        installAlert.remove();

        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            console.log('Usuário aceitou instalar o PWA');
          } else {
            console.log('Usuário rejeitou instalar o PWA');
          }
          deferredPrompt = null;
        }
      }); 
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  return (
    <AuthProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    </AuthProvider>
  );
};

export { App };
