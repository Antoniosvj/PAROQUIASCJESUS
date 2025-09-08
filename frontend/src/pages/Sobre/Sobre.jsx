import { useEffect, useState } from "react";
import { Comunidades } from "../../components/index";
import { PcomQuebraLinha } from "../../components";

import style from "./Sobre.module.css";

const Sobre = () => {
  // Definir estado para armazenar os dados da paróquia
  const [paroquia, setParoquia] = useState(null);
  
  const url = `${import.meta.env.VITE_API_URL}api/`;
  const urlImagem = `${import.meta.env.VITE_API_URL}/uploads/paroquia/`;
  
  const logoParoquia = 'paroquia.png';
  const logoPassionista = 'passionista.gif'

  // Função para carregar os dados da paróquia
  const carregarSobre = async () => {
    try {
      const response = await fetch(`${url}paroquia.php`);

      if(!response.ok){
        throw new Error(`Erro: ${response.status}`);
      }

      const data = await response.json();
      // console.log(data.data[0]);
      setParoquia(data.data[0]);
      
    } catch (error) {
      console.error("Erro ao carregar paroquia: ", error);
    }
  };

 

  // Usar useEffect para chamar a API quando o componente for montado
  useEffect(() => {
    carregarSobre();
  }, []); 

  // Se os dados ainda não estiverem carregados, exibe um carregamento
  if (!paroquia) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={style.Sobre}>
      <h1>Paróquia Sagrado Coração de Jesus</h1>
      <div className={style.containerSobre}>
        <img src={`${urlImagem}${logoParoquia}`} alt="Logo da Paróquia Sagrado Coração de Jesus" />
        <img src={`${urlImagem}${logoPassionista}`} alt="Logo dos Passionistas" /> 
        <PcomQuebraLinha texto={paroquia.texto1} />
        <img src={`${urlImagem}${paroquia.foto1}`} alt="foto da Paróquia Sagrado Coração de Jesus" />
        <PcomQuebraLinha texto={paroquia.historia1} />
        <img src={`${urlImagem}${paroquia.foto2}`} alt="Foto da Paróquia Sagrado Coração de Jesus" />
        <PcomQuebraLinha texto={paroquia.historia2}/>
      </div>
      <section className={style.Padres}>
        <div>
          <h3>Pároco:</h3>
          <p>Padre Adilson Santana do Carmo, CP</p>
        </div>
        <div>
          <h3>Vigários:</h3>
          <p>Padre Roberto Luíz Ferreira, CP</p>
          <p>Padre Victor Franco Soares, CP</p>
        </div>
      </section>
      <Comunidades />
    </div>
  );
};

export { Sobre };
