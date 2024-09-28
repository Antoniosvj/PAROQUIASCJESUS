import { useState } from "react";
import devocoes from "../../assets/devocoes.json";
import menu from "../../assets/icons/menu-aberto.png";

import style from "./Devocoes.module.css";
import { Link } from "react-router-dom";

const Devocoes = () => {
  const [devocaoAtual, setDevocaoAtual] = useState(devocoes.SCJesus);
  const [menuOpen, setMenuOpen] = useState(false);

  const clickBotao = (devocaoKey) => {
    const devocao = devocoes[devocaoKey];
    setDevocaoAtual(devocao);
    setMenuOpen(false);
  };

  const splitDevocao = (texto) =>{
    return texto.split("\n\n").map((paragrafo, index) =>(
      <p key={index}>{paragrafo}</p>
    ))
  }

  const clickMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={style.Devocoes}>
      <div className={style.containerDevocao}>
        <h1>Devoções e Carismas</h1>
        <Link to="#" onClick={() => clickMenu()}>
        <img src={menu} alt="" className={style.menu} />
        </Link>
      </div>

      <section>
        <div className={style.containerLinks}>
          <a href="#" onClick={() => clickBotao("SCJesus")}>
            Sagrado Coração de Jesus
          </a>
          <a href="#" onClick={() => clickBotao("SLourenco")}>
            São Lourenço
          </a>
          <a href="#" onClick={() => clickBotao("Passionistas")}>
            Carisma Passionista
          </a>
        </div>
        { menuOpen && (
          <div className={style.menuOpen}>
          <a href="#" onClick={() => clickBotao("SCJesus")}>
            Sagrado Coração de Jesus
          </a>
          <a href="#" onClick={() => clickBotao("SLourenco")}>
            São Lourenço
          </a>
          <a href="#" onClick={() => clickBotao("Passionistas")}>
            Carisma Passionista
          </a>
        </div>
        )}
        <article id="cotainerOracao">
          {devocaoAtual ? (
            <div>
              <h2>{devocaoAtual.titulo}</h2>
              <h3>{devocaoAtual.subtitulo}</h3>
              <p>{splitDevocao(devocaoAtual.devocao)}</p>
            </div>
          ) : (
            <p>Orações aqui</p>
          )}
        </article>
      </section>
    </div>
  );
};
export { Devocoes };
