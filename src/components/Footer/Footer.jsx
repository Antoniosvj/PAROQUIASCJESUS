import { Link } from "react-router-dom";
import style from "./Footer.module.css";
import logo1 from "../../assets/images/logo_paroquia.png";
import logo2 from "../../assets/images/logo_paroquia2.png";
import logo3 from "../../assets/images/passionista.gif";

const Footer = () => {
  return (
    <div className={style.containerFooter}>
      <div className={style.containerLinks}>
        <Link to="/Home">Home</Link>
        <Link to="/Sobre">Sobre</Link>
      </div>
      <div className={style.containerLinks}>
        <Link to="/Liturgia">Liturgia</Link>
        <Link to="/Oracoes">Orações</Link>
        <Link to="/Devocoes">Devoções e Carismas</Link>
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
