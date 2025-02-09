import { Link } from "react-router-dom";
import style from "./Footer.module.css";
const logo1 = "../../../public/images/logo_paroquia.png";
const logo2 = "../../../public/images/logo_paroquia2.png";
const logo3 = "../../../public/images/passionista.gif";

const Footer = () => {
  return (
    <div className={style.containerFooter}>
      <div className={style.containerLinks}>
        <Link to="/Home">Home</Link>
        <Link to="/Sobre">Sobre</Link>
        <Link to="/Liturgia">Liturgia</Link>
      </div>
      <div className={style.containerLinks}>
        <Link to="/Oracoes">Orações</Link>
        <Link to="/Devocoes">Devoções e Carismas</Link>
        <Link to="/Admin">Login</Link>
      </div>

      

      <div className={style.containerImage}>
        <img src={logo1} alt="" />
        <img src={logo2} alt="" />
        <img src={logo3} alt="" />
      </div>
    </div>
  );
};
export { Footer };
