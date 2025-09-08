import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import menu from "../../assets/icons/menu-aberto.png";

import style from "./Header.module.css";

const logo = `${import.meta.env.VITE_API_URL}uploads/paroquia/logo_preto.png`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, handleLogout } = useContext(AuthContext);


  const clickMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () =>{
    setMenuOpen(false);
  }

  return (
    <header className={style.Header}>
      <div className={style.containerLogo}>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className={style.containerLinks}>
        <Link className={style.Link} to="/Home">
          Home
        </Link>
        <Link className={style.Link} to="/Sobre">
          Sobre
        </Link>
        <Link to="/Liturgia">Liturgia</Link>
        <Link to="/Oracoes">Orações</Link>
        <Link to="/Devocoes">Devoções<br/>e Carismas</Link>
        {isLoggedIn ? (
          <>
          <Link to="/Admin" className={style.Link} onClick={closeMenu}>Editar Site</Link>
          <Link to="/Home" className={style.Link} onClick={() => {handleLogout(); closeMenu()}}>Sair</Link>
          </>        ) : (
          <Link className={style.Link} to="/Admin" onClick={closeMenu}>Login</Link>
        )}
        <Link to="#" onClick={() => clickMenu()}>
          <img src={menu} alt="" className={style.menu} />
        </Link>
      </div>

      {menuOpen && (
      <div className={style.menuOpen}>
        <Link to="/Home" onClick={closeMenu}>Home</Link>
        <Link to="/Sobre" onClick={closeMenu}>Sobre</Link>
        {isLoggedIn ? (
          <>
          <Link to="/Admin" onClick={closeMenu}>Editar Site</Link>
          <Link to="/Home" onClick={() => {handleLogout(); closeMenu()}}>Sair</Link>
          </>
        ) : (
          <Link to="/Admin" onClick={closeMenu}>Login</Link>
        )}

      </div>
      )}

    </header>
  );
};

export { Header };
