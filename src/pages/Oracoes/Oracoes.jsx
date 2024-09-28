import { useState } from "react";
import oracoes from "../../assets/oracoes.json";
import menu from "../../assets/icons/menu-aberto.png";
import { Link } from "react-router-dom";

import style from './Oracoes.module.css';

const Oracoes = () => {
  const [oracaoAtual, setOracaoAtual] = useState(oracoes.PaiNosso);
  const [sTerco, setSTerco] = useState(false);
  const [misterioAtual, setMisterioAtual] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);


  const clickBotao = (oracaoKey) => {
    const oracao = oracoes[oracaoKey];
    setSTerco(false);
    setOracaoAtual(oracao);
    setMenuOpen(false);

  };

  const clickSTerco = (oracaoKey) => {
    const terco = oracoes[oracaoKey];
    setOracaoAtual(null);
    setSTerco(terco);
    setMenuOpen(false);
  };

  const clickMisterio = (contemplacaoKey) =>{
    const misterio = oracoes.STerco.contemplacoes[contemplacaoKey];
    setMisterioAtual(misterio);
  }

  const splitMisterio = (texto) =>{
    return texto.split("\n\n").map((paragrafo, index) =>(
        <p key={index}>{paragrafo}</p>
    ));
  };

  const clickMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={style.Oracoes}>
      <div className={style.containerOracao}>
        <h1>Orações</h1>
        <Link to="#" onClick={() => clickMenu()}>
          <img src={menu} alt="" className={style.menu} />
        </Link>
      </div>
      <section>
        <div className={style.containerLinks}>
          <a href="#" onClick={() => clickBotao("Apostolado")}>
            Apostolado da Oração
          </a>
          <a href="#" onClick={() => clickBotao("AveMaria")}>
            Ave Maria
          </a>
          <a href="#" onClick={() => clickBotao("Creio")}>
            Creio
          </a>
          <a href="#" onClick={() => clickBotao("Divino")}>
            Divino Espírito Santo
          </a>
          <a href="#" onClick={() => clickBotao("Gloria")}>
            Glória
          </a>
          <a href="#" onClick={() => clickBotao("PaiNosso")}>
            Pai Nosso
          </a>
          <a href="#" onClick={() => clickBotao("SalveRainha")}>
            Salve Rainha
          </a>
          <a href="#" onClick={() => clickBotao("SLourenco")}>
            São Lourenço
          </a>
          <a href="#" onClick={() => clickBotao("SMiguel")}>
            São Miguel
          </a>
          <a href="#" onClick={() => clickSTerco("STerco")}>
            Santo Terço
          </a>
        </div>
        {menuOpen && (
      <div className={style.menuOpen}>
        <a href="#" onClick={() => clickBotao("Apostolado")}>
            Apostolado da Oração
          </a>
          <a href="#" onClick={() => clickBotao("AveMaria")}>
            Ave Maria
          </a>
          <a href="#" onClick={() => clickBotao("Creio")}>
            Divino Espírito Santo
          </a>
          <a href="#" onClick={() => clickBotao("Divino")}>
            Creio
          </a>
          <a href="#" onClick={() => clickBotao("Gloria")}>
            Glória
          </a>
          <a href="#" onClick={() => clickBotao("PaiNosso")}>
            Pai Nosso
          </a>
          <a href="#" onClick={() => clickBotao("SalveRainha")}>
            Salve Rainha
          </a>
          <a href="#" onClick={() => clickBotao("SLourenco")}>
            São Lourenço
          </a>
          <a href="#" onClick={() => clickBotao("SMiguel")}>
            São Miguel
          </a>
          <a href="#" onClick={() => clickSTerco("STerco")}>
            Santo Terço
          </a>
      </div>
      )}
        <article id="cotainerOracao">
          {oracaoAtual ? (
            <div>
              <h2>{oracaoAtual.titulo}</h2>
              <p>{oracaoAtual.oracao}</p>
            </div>
          ) : sTerco ? (
            <div>
              <h2>{sTerco.titulo}</h2>
              <p>{sTerco.inicio}</p>
              <hr />
              <div className={style.Misterios}>
                <a href="#" onClick={() => clickMisterio("gozosos")}>Gozosos</a>
                <a href="#" onClick={() => clickMisterio("dolorosos")}>Dolorosos</a>
                <a href="#" onClick={() => clickMisterio("luminosos")}>Luminosos</a>
                <a href="#" onClick={() => clickMisterio("gloriosos")}>Gloriosos</a>
              </div>
              <hr />
              <p>{sTerco.misterios}</p>
              {misterioAtual ? (
                <div>
                    <p>Mistérios {misterioAtual.misterio}</p>
                    <p>dia: {misterioAtual.dia}</p>
                    <p>{splitMisterio(misterioAtual.contemplacao)}</p>
                </div>
              ) : (
              <p>Escolha um mistério</p>

              )}

              <hr />
              <p>{sTerco.final}</p>
            </div>
          ) : (
            <p>Orações aqui</p>
          )}
        </article>
      </section>
    </div>
  );
};

export { Oracoes };
