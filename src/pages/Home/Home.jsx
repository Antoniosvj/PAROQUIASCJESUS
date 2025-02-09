import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import face from "../../assets/icons/icons8-facebook.svg";
import insta from "../../assets/icons/icons8-instagram-96.svg";
import whats from "../../assets/icons/icons8-whatsapp-96.svg";
import Carousel from 'react-bootstrap/Carousel';
import { HomePublicacao } from '../../components';
const foto1 = "/images/image.png";
const foto2 = "/images/foto1.png";
const foto3 = "images/foto2.png";

import style from "./Home.module.css";

const Home = () => {
  const [comunidades, setComunidades] = useState([]);
  const [comunidade, setComunidade] = useState([]);
  const [palavraPastor, setPalavraPastor] = useState();
  const [acoes, setAcoes] = useState();

  const url = 'https://www.paroquiascjesus.com.br/api/api/';
  const urlImagem = `https://www.paroquiascjesus.com.br/api/uploads/paroquia/`;
  const urlImagemComunidade = `https://www.paroquiascjesus.com.br/api/uploads/comunidades/`;


  const carregarPalavraPastor = async () => {
    try {
      const response = await fetch(`${url}PalavraPastor.php`);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      setPalavraPastor(data.data[0]);
    } catch (error) {
      console.error(`Erro ao carregar a palavra: ${error}`);
    }
  };

  const carregarComunidades = async () => {
    try {
      const response = await fetch(`${url}comunidade.php`);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      setComunidades(data);
      setComunidade(data.data);
    } catch (error) {
      console.error(`Erro ao carregar comunidade: ${error}`);
    }
  };

  const carregarAcoes = async () => {
    try {
      const response = await fetch(`${url}acao.php`);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      setAcoes(data.data);
    } catch (error) {
      console.error(`Erro ao carregar ações: ${error}`);
    }
  };

  useEffect(() => {
    carregarPalavraPastor();
    carregarComunidades();
    carregarAcoes();
  }, []);

  return (
    <div className={style.Home}>
      <HomePublicacao />
      <section className={style.FolderInicial}>
        <h1>Seja bem vindo(a) Paróquia Sagrado Coração de Jesus</h1>
      </section>

      <section className={style.Paroquia}>
        <h2>Palavra do Pastor</h2>
        <div className={style.AcaoCard}>
          <img src={`${urlImagem}${palavraPastor ? palavraPastor.foto : ""}`} alt="" />
          <div>
            <h3>{palavraPastor ? palavraPastor.titulo : ""}</h3>
            <p>{palavraPastor ? palavraPastor.texto : ""}</p>
            <small>{palavraPastor ? palavraPastor.padre : ""}</small>
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
          {acoes && acoes.map((acao) => (
            <Carousel.Item key={acao.id} className={style.carouselItem}>
              <div className={style.AcaoCard}>
                <img src={`${urlImagem}${acao.foto}`} alt={acao.titulo} />
                <div>
                  <h3>{acao.titulo}</h3>
                  <p>{acao.texto}</p>
                </div>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>
{/* 

      <section className={style.Paroquia}>
        <h2>Fotos Eventos</h2>
        <div className={style.ContainerParoquiaCard}>
          <Link className={style.ParoquiaCard}>
            <img src={foto2} alt="" />
            <p>No dia 24 de agosto, as comunidades da paróquia Sagrado Coração de Jesus...</p>
          </Link>
          <Link className={style.ParoquiaCard}>
            <img src={foto1} alt="" />
            <p>Os municípios de Divino de São Lourenço e Ibitirama se reunem para celebrar a festa do padroeiro paroquial Sagrado coração de Jesus!</p>
          </Link>
          <Link className={style.ParoquiaCard}>
            <img src={foto3} alt="" />
            <p>No dia 02 de maio de 2024, Pe. Roberto, CP, presidiu Santa Missa em ação de graças pelo seu vigésimo quarto aniversário de ordenação presbiteral, na igreja Matriz Divino Espírito Santo e São Lourenço</p>
          </Link>
        </div>
      </section> */}

      <section className={style.ParoquiaAcao}>
        <p>
          Nossa paróquia abrange os municípios de Divino de São Lourenço e Ibitirama, ela é composta por {comunidades && comunidades.data ? comunidades.data.length : "..."} comunidades, sendo a Matriz Divino Espírito Santo e São Lourenço.
        </p>
        <Carousel
        interval={5000} 
        controls={true} 
        indicators={false} 
        fade 
        className={style.carousel} 
        >
          {comunidade && comunidade.map((comunidade)=>(
            <Carousel.Item key={comunidade.id} className={style.carouselItem}>
              <div className={style.AcaoCard}>
                <img src={`${urlImagemComunidade}${comunidade.fachada}`}/>
                <div>
                  <h3>{comunidade.nome}</h3>
                  <p>{comunidade.descricao}</p>
                </div>
              </div>
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
