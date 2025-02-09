import { useEffect, useState } from "react";
import menu from "../../assets/icons/menu-aberto.png";
import { Link } from "react-router-dom";
import style from './Oracoes.module.css';
import { PcomQuebraLinha } from "../../components";

const Oracoes = () => {
  const [oracaoAtual, setOracaoAtual] = useState();
  const [sTerco, setSTerco] = useState(null);
  const [misterioAtual, setMisterioAtual] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [receberOracoes, setReceberOracoes] = useState([]);
  const [receberTerco, setReceberTerco] = useState(null);

  const url = 'https://www.paroquiascjesus.com.br/api/api/';

  // Função para carregar as orações
const carregarOracoes = async () => {
  try {
    const response = await fetch(`${url}oracao.php`)
     if(!response.ok){
       throw new Error(`Erro: ${response.status}`);
     }
     const data = await response.json();
     setReceberOracoes(data.data);
   } catch (error) {
     console.error("Erro ao carregar orações:", error); 
   }
 };


   const carregarTerco = async () =>{
     try{
       const response = await fetch(`${url}terco.php`);
       const data = await response.json();
       setReceberTerco(data.data);
       // console.log(data.data)
     }catch{
       console.log("Erro ao receber terço");
     }
   }

   // Função de clique para mudar a oração
   const clickBotao = (oracaoId) => {
     const oracaoSelecionada = receberOracoes.find((oracao) => oracao.id === oracaoId); // Encontrando a oração correta
     if (oracaoSelecionada) {
       setOracaoAtual(oracaoSelecionada); // Atualizando a oração atual com a correta
     }
     setSTerco(false);
     setMenuOpen(false);
   };

   // Função de clique para o Terço
   const clickSTerco = () => {
     if (receberTerco){
         setOracaoAtual(null);
         setSTerco(receberTerco);
         setMenuOpen(false);
     } else console.log("terço não carregado")
   };

   const clickMisterio = (contemplacaoKey) => {
     if(sTerco && sTerco.contemplacoes){
       const misterio = sTerco.contemplacoes[contemplacaoKey];
       setMisterioAtual(misterio);
     }
   };

   const splitMisterio = (texto) => {
     return texto.split("\n\n" || "\n").map((paragrafo, index) => (
       <p key={index}>{paragrafo}</p>
     ));
   };

   const clickMenu = () => {
     setMenuOpen(!menuOpen);
   };
  
     useEffect(() => {
       carregarOracoes();
      carregarTerco();
  }, []);

     //definindo oração inicial
     useEffect(() => {
       if (receberOracoes.length > 0) {
         // Definindo uma oração padrão (por exemplo, o Santo Terço ou a primeira oração)
         setOracaoAtual(receberOracoes[5]);  // Aqui, a primeira oração será a padrão
       }
      
     }, [receberOracoes]);
  
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
           {/* Verificando se as orações estão carregadas */}
           {receberOracoes.length === 0 ? (
             <p>Carregando orações...</p> // Mensagem enquanto não há orações
           ) : (
             receberOracoes.map((oracao) => (
               <a
                 href="#"
                 key={oracao.id} // Usando o ID como chave para cada link de oração
                 onClick={() => clickBotao(oracao.id)} // Passando o ID para o clique
               >
                 {oracao.titulo}
               </a>
             ))
           )}
           {/* Links fixos para orações adicionais */}
           <a href="#" onClick={() => clickSTerco("STerco")}>Oração do Santo Terço</a>
         </div>
         {menuOpen && (
           <div className={style.menuOpen}>
             {/* Verificando se as orações estão carregadas */}
           {receberOracoes.length === 0 ? (
             <p>Carregando orações...</p> // Mensagem enquanto não há orações
           ) : (
             receberOracoes.map((oracao) => (
               <a
                 href="#"
                 key={oracao.id} // Usando o ID como chave para cada link de oração
                 onClick={() => clickBotao(oracao.id)} // Passando o ID para o clique
               >
                 {oracao.titulo}
               </a>
             ))
           )}
           {/* Links fixos para orações adicionais */}
           <a href="#" onClick={() => clickSTerco("STerco")}>Santo Terço</a>
           </div>
         )}
         <article id="cotainerOracao">
           {oracaoAtual ? (
             <div>
               <h2>{oracaoAtual.titulo}</h2>
               <PcomQuebraLinha texto={oracaoAtual.oracao}/>
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
                   <p>Dia: {misterioAtual.dia}</p>
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
