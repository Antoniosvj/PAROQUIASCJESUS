import face from "../../assets/icons/icons8-facebook.svg";
import insta from "../../assets/icons/icons8-instagram-96.svg";
import whats from "../../assets/icons/icons8-whatsapp-96.svg";
import foto1 from "../../assets/images/image.png";
import foto2 from "../../assets/images/foto1.png";
import foto3 from "../../assets/images/foto2.png";

import style from "./Home.module.css";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className={style.Home}>
      <section className={style.FolderInicial}>
        <h1> Seja bem vindo(a) Paróquia Sagrado Coração de Jesus</h1>
      </section>
      <div className={style.container}>
        <p>
          Nossa paróquia abrange os municípios de Divino de São Lourenço e
          Ibitirama, ela é composta por 25 comunidades, sendo a Matriz Divino
          Espírito Santo e São Lourenço.
        </p>
      </div>

      <section className={style.Paroquia}>
        <h2>Paróquia em ação</h2>

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
