import { useEffect, useState } from "react";
import menu from "../../assets/icons/menu-aberto.png";
import style from "./Devocoes.module.css";
import { Link } from "react-router-dom";
import { PcomQuebraLinha } from "../../components";

const Devocoes = () => {
  const [devocaoAtual, setDevocaoAtual] = useState();
  const [menuOpen, setMenuOpen] = useState(false);
  const [receberDevocao, setReceberDevocao] = useState([]);

  const url = 'https://www.paroquiascjesus.com.br/api/api/';

  const carregarDevocoes = async () => {
    try {
      const response = await fetch(`${url}devocao.php`);

      if(!response.ok){
        throw new Error(`Erro: ${response.status}`);
      }
      
      const data = await response.json();
      setReceberDevocao(data.data);
      // console.log(data.data);
    } catch (error) {
      console.error("Erro ao carregar devoções: ", error);
    }
  };

  const clickBotao = (devocaoId) =>{
    const devocaoSelecionada = receberDevocao.find((devocao) => devocao.id ===devocaoId);
    if(devocaoSelecionada){
      setDevocaoAtual(devocaoSelecionada);
    } 
    setMenuOpen(false);
  }
  
  
     const clickMenu = () => {
       setMenuOpen(!menuOpen);
     };

      useEffect (() => {
          carregarDevocoes();
        }, []);
     

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
           {receberDevocao.length === 0 ?(
            <p>Carregando Devoções...</p>
           ): (
            receberDevocao.map((devocao) => (
              <a
                href="#"
                key={devocao.id}
                onClick={() =>clickBotao(devocao.id)}
              >
                {devocao.titulo}
              </a>
            ))
           )}
         </div>

         {menuOpen && (
          <div className={style.menuOpen}>
            {receberDevocao.length === 0 ?(
            <p>Carregando Devoções...</p>
           ): (
            receberDevocao.map((devocao) => (
              <a
                href="#"
                key={devocao.id}
                onClick={() =>clickBotao(devocao.id)}
              >
                {devocao.titulo}
              </a>
            ))
           )}
          </div>
         )}
         
         <article id="cotainerOracao">
          {devocaoAtual ? (
            <div>
              <h2>{devocaoAtual.titulo}</h2>
              <h3>{devocaoAtual.subtitulo}</h3>
              <PcomQuebraLinha texto={devocaoAtual.devocao}/>
              <a><small>{devocaoAtual.font}</small></a>
            </div>
          ): (
            <p>Clique em uma devoção para abrir...</p>
          )}
         </article>
       </section>
     </div>
   );
 };
export { Devocoes };
