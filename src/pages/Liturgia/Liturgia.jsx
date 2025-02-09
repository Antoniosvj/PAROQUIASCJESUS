import axios from "axios";
import { useEffect, useState } from "react";
import style from "./Liturgia.module.css";

const Liturgia = () => {
  const url = "https://liturgia.up.railway.app/";
  const [leituras, setLeituras] = useState(null);
  const [leituraAtual, setLeituraAtual] = useState("primeiraLeitura"); // Estado para controlar a leitura atual

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setLeituras(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function primeiraLeitura() {
    return (
      <div>
        <h2>{leituras?.primeiraLeitura?.titulo}</h2>
        <p>{leituras?.primeiraLeitura?.referencia}</p>
        <p>{leituras?.primeiraLeitura?.texto}</p>
      </div>
    );
  }

  function salmo() {
    const splitSalmo = (texto) =>{
      return texto.split("\n").map((paragrafo, index) =>(
        <p key={index}>{paragrafo}</p>
      ))
    }
    return (
      <div>
        <h2>{leituras?.salmo?.referencia}</h2>
        <p>{leituras?.salmo?.refrao}</p>
        <p>{splitSalmo(leituras?.salmo?.texto)}</p>
      </div>
    );
  }

  function segundaLeitura() {
    if (leituras?.segundaLeitura.titulo) {
      return (
        <div>
          <h2>{leituras?.segundaLeitura?.titulo}</h2>
          <p>{leituras?.segundaLeitura?.referencia}</p>
          <p>{leituras?.segundaLeitura?.texto}</p>
        </div>
      );
    }
    return <p>Não há segunda leitura hoje.</p>; // Caso não haja segunda leitura
  }

  function evangelho() {
    return (
      <div>
        <h2>{leituras?.evangelho?.titulo}</h2>
        <p>{leituras?.evangelho?.referencia}</p>
        <p>{leituras?.evangelho?.texto}</p>
      </div>
    );
  }

  // Função para renderizar a leitura baseada no estado leituraAtual
  function renderLeitura() {
    switch (leituraAtual) {
      case "primeiraLeitura":
        return primeiraLeitura();
      case "salmo":
        return salmo();
      case "segundaLeitura":
        return segundaLeitura();
      case "evangelho":
        return evangelho();
      default:
        return primeiraLeitura();
    }
  }

  return (
    <div>
      <h1>Liturgia Diária</h1>
      <p className={style.subtitulo}>{leituras?.data} - {leituras?.liturgia}</p>
      <section className={style.containerLiturgia}>
        <div className={style.containerLinks}>
          <a href="#" onClick={() => setLeituraAtual("primeiraLeitura")}>1ª Leitura</a>
          <a href="#" onClick={() => setLeituraAtual("salmo")}>Salmo</a>
          <a href="#" onClick={() => setLeituraAtual("segundaLeitura")}>2ª Leitura</a>
          <a href="#" onClick={() => setLeituraAtual("evangelho")}>Evangelho</a>
        </div>
        <article className={style.containerLeituras}>
          {renderLeitura()} {/* Renderiza a leitura correspondente ao estado leituraAtual */}
        </article>
      </section>
    </div>
  );
};

export { Liturgia };
