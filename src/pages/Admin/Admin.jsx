import { useState, useEffect } from "react";
import { HomeAdmin, OracoesAdmin, SobreAdmin, DevocoesAdmin, ComunidadesAdmin, Botao, CadastrarAdmin, Login } from "../../components";

import style from './Admin.module.css';

const Admin = () => {
  
  // Estado que controla qual seção será exibida
  const [activeSection, setActiveSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Verifica se o usuário está logado e se é administrador ao montar o componente
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const admin = localStorage.getItem("isAdmin") === "true"; // Verifica o status de administrador
    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
  }, []);

  const handleButtonClick = (section) => {
    setActiveSection(section); // Atualiza a seção ativa ao clicar no botão
  };

  const handleLogin = (loggedIn, admin) => {
    setIsLoggedIn(loggedIn);
    setIsAdmin(admin);
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} />;
    }

    return (
      <>
        <h1>Bem-vindo ao painel de Administrador.</h1>
        <div className={style.ContainerPainel}>
          <Botao nomeBotao={'Editar Home'} onClick={() => handleButtonClick('home')} />
          <Botao nomeBotao={'Editar Sobre'} onClick={() => handleButtonClick('sobre')} />
          <Botao nomeBotao={'Editar Comunidade'} onClick={() => handleButtonClick('comunidades')} />
          <Botao nomeBotao={'Editar Orações'} onClick={() => handleButtonClick('oracoes')} />
          <Botao nomeBotao={'Editar Devoções'} onClick={() => handleButtonClick('devocoes')} />
          {/* Renderiza o botão "Cadastrar" apenas se o usuário for administrador */}
          {isAdmin && <Botao nomeBotao={'Cadastrar Usuário'} onClick={() => handleButtonClick('cadastrar')} />}
        </div>

        {/* Renderização condicional das seções com base no estado activeSection */}
        {activeSection === 'home' && <HomeAdmin />}
        {activeSection === 'sobre' && <SobreAdmin />}
        {activeSection === 'comunidades' && <ComunidadesAdmin />}
        {activeSection === 'oracoes' && <OracoesAdmin />}
        {activeSection === 'devocoes' && <DevocoesAdmin />}
        {/* Renderiza a seção "Cadastrar" apenas se o usuário for administrador */}
        {isAdmin && activeSection === 'cadastrar' && <CadastrarAdmin />}
      </>
    );
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
};

export { Admin };
