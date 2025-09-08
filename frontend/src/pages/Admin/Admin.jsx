import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { HomeAdmin, OracoesAdmin, SobreAdmin, DevocoesAdmin, ComunidadesAdmin, Botao, CadastrarAdmin, Login } from "../../components";

import style from './Admin.module.css';

const Admin = () => {
  
  // Estado que controla qual seção será exibida
  const [activeSection, setActiveSection] = useState('home');
  const {isLoggedIn, isAdmin, handleLogin} = useContext(AuthContext);  

  const handleButtonClick = (section) => {
    setActiveSection(section); // Atualiza a seção ativa ao clicar no botão
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return <Login onLogin={handleLogin} />;
    }

    return (
      <>
        <h1>Bem-vindo ao painel de Administrador.
        </h1>
        <div className={style.ContainerPainel}>
          <Botao nomeBotao={'Editar Comunidade'} onClick={() => handleButtonClick('comunidades')} />
          {/* Renderiza o botão "Cadastrar" apenas se o usuário for administrador */}
          {isAdmin && (
            <>
            <Botao nomeBotao={'Cadastrar Usuário'} onClick={() => handleButtonClick('cadastrar')} />
            <Botao nomeBotao={'Editar Home'} onClick={() => handleButtonClick('home')} />
            <Botao nomeBotao={'Editar Sobre'} onClick={() => handleButtonClick('sobre')} />
            <Botao nomeBotao={'Editar Orações'} onClick={() => handleButtonClick('oracoes')} />
            <Botao nomeBotao={'Editar Devoções'} onClick={() => handleButtonClick('devocoes')} />
            </>
          )}
        </div>

        {isAdmin && activeSection === 'home' && <HomeAdmin />}
        {isAdmin && activeSection === 'sobre' && <SobreAdmin />}
        {activeSection === 'comunidades' && <ComunidadesAdmin />}
        {isAdmin && activeSection === 'oracoes' && <OracoesAdmin />}
        {isAdmin && activeSection === 'devocoes' && <DevocoesAdmin />}
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
