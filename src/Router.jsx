import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {
  ComunidadePage,
  Devocoes,
  Home,
  Liturgia,
  Oracoes,
  Sobre,
  Page404,
  Login,
} from "./pages";
import { LayoutWeb } from "./layouts";
import { AdminDashboard } from "./Admin/AdminDashboard";

const Router = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleLogin = (token) =>{
    setToken(token);
    navigate('/Admin');
  };

  return (
    <Routes>
        <Route path="/" element={<LayoutWeb />}>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Sobre" element={<Sobre />} />
          <Route path="/Liturgia" element={<Liturgia />} />
          <Route path="/Oracoes" element={<Oracoes />} />
          <Route path="/Devocoes" element={<Devocoes />} />
          <Route path="/Comunidade" element={<ComunidadePage />} />
          <Route path="/Login" element={<Login onLogin={handleLogin}/>} />

          {/* */}
          <Route 
            path="/Admin" 
            element={token ? <AdminDashboard />: <Login onLogin={handleLogin}/>}
          />
            
          <Route path="*" element={<Page404 />}/>
        </Route>
    </Routes>
  );
};
export { Router };
