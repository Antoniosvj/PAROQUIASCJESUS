import { Link } from "react-router-dom";

import logo from "../../assets/images/logo_preto.png";
import menu from "../../assets/icons/menu-aberto.png";

import style from "./Header.module.css";
import { useState } from "react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);


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
        <Link to="#" onClick={() => clickMenu()}>
          <img src={menu} alt="" className={style.menu} />
        </Link>
      </div>

      {menuOpen && (
      <div className={style.menuOpen}>
        <Link to="/Home" onClick={closeMenu}>Home</Link>
        <Link to="/Sobre" onClick={closeMenu}>Sobre</Link>
      </div>
      )}

    </header>
  );
};

export { Header };
