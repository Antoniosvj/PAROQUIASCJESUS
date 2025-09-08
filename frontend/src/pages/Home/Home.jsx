import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import {
  carregarComunidades,
  carregarAcoes,
  carregarPalavra,
} from "../../services";
import face from "../../assets/icons/icons8-facebook.svg";
import insta from "../../assets/icons/icons8-instagram-96.svg";
import whats from "../../assets/icons/icons8-whatsapp-96.svg";
import Carousel from "react-bootstrap/Carousel";
import { HomePublicacao } from "../../components";
import { useNavigate } from "react-router-dom";

import style from "./Home.module.css";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [comunidades, setComunidades] = useState([]);
  const [palavra, setPalavra] = useState();
  const [acoes, setAcoes] = useState();
  const navigate = useNavigate();

  const urlImagem = `${import.meta.env.VITE_API_URL}uploads/palavra/`;
  const urlImagemComunidade = `${import.meta.env.VITE_API_URL}uploads/comunidades/`;
  const urlImagemAcao = `${import.meta.env.VITE_API_URL}uploads/acao/`;

  console.log(import.meta.env.VITE_API_URL); // Verifique se está sendo carregado corretamente

  const fetchPalavra = async () => {
    const response = await carregarPalavra();
    setPalavra(response[0]);
    console.log(palavra);
  };

  const fetchAcoes = async () => {
    const response = await carregarAcoes();
    setAcoes(response.data);
  };

  const fetchComunidades = async () => {
    setIsLoading(true);
    try {
      const response = await carregarComunidades();
      setComunidades(response.data);
      // await console.log(comunidades);
    } catch (error) {
      alert(`Erro ao carregar comunidades: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = (id) => {
    navigate(`/Comunidade/${id}`, { state: { id } });
  };

  useEffect(() => {
    fetchPalavra();
    fetchComunidades();
    fetchAcoes();
  }, []);

  return (
    <div className={style.Home}>
      {isLoading && <p>Carregando ...</p>}
      <HomePublicacao />
      <section className={style.FolderInicial}>
        <h1>Seja bem vindo(a) Paróquia Sagrado Coração de Jesus</h1>
      </section>

      <section className={style.Paroquia}>
        <h2>Palavra do Pastor</h2>
        <div className={style.AcaoCard}>
          <img src={`${urlImagem}${palavra ? palavra.foto : ""}`} alt="" />
          <div>
            <h3>{palavra ? palavra.titulo : ""}</h3>
            <p>{palavra ? palavra.texto : ""}</p>
            <small>{palavra ? palavra.padre : ""}</small>
          </div>
        </div>
      </section>

      <section className={style.ParoquiaAcao}>
        <h2>Paróquia em ação</h2>
        <Carousel
          interval={5000}
          controls={true}
          indicators={false}
          fade
          className={style.carousel}
        >
          {acoes &&
            acoes.map((acao) => (
              <Carousel.Item key={acao.id} className={style.carouselItem}>
                <div className={style.AcaoCard}>
                  <img src={`${urlImagemAcao}${acao.foto}`} alt={acao.titulo} />
                  <div>
                    <h3>{acao.titulo}</h3>
                    <p>{acao.texto}</p>
                  </div>
                </div>
              </Carousel.Item>
            ))}
        </Carousel>
      </section>

      <section className={style.ParoquiaAcao}>
        <p>
          Nossa paróquia abrange os municípios de Divino de São Lourenço e
          Ibitirama, sendo a Matriz Divino Espírito Santo e São Lourenço.
        </p>
        <Carousel
          interval={5000}
          controls={true}
          indicators={false}
          fade
          className={style.carousel}
        >
          {comunidades &&
            comunidades.map((comunidade) => (
              <Carousel.Item key={comunidade.id} className={style.carouselItem}>
                <button
                  className={style.AcaoCard}
                  onClick={() => handleClick(comunidade.id)}
                >
                  <img src={`${urlImagemComunidade}${comunidade.id}/${comunidade.fachada}`} />
                  <div>
                    <h3>{comunidade.nome}</h3>
                    <p className={style.textComunidade}>
                      {comunidade.descricao}
                    </p>
                    <small className={style.click}>Click e saiba mais...</small>
                  </div>
                </button>
              </Carousel.Item>
            ))}
        </Carousel>
      </section>

      <section className={style.ContainerContatos}>
        <div>
          <h2>Contato</h2>
          <p>Rua Monsenhor Miguel Sanctis, s/n</p>
          <p>Centro, Divino de São Lourenço-ES</p>
          <p>CEP: 29590-000</p>
          <p>Telefone: (28) 99942-5903</p>
        </div>
        <div>
          <h2>Acompanhe a Paróquia nas redes sociais:</h2>
          <div className={style.ContainerIcons}>
            <a href="https://www.instagram.com/paroquiasagrado_coracaodejesus/">
              <img src={insta} alt="" />
            </a>
            <a href="">
              <img src={face} alt="" />
            </a>
            <a href="https://wa.me/5528999425903">
              <img src={whats} alt="" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export { Home };
