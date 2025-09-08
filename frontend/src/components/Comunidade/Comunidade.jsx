import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import style from './Comunidade.module.css';

const Comunidade = () => {
    const location = useLocation();
    const [comunidade, setComunidade] = useState(null);
    const { id } = location.state || {}; // Acessa o 'id' passado pelo estado

    const url = `${import.meta.env.VITE_API_URL}api/`;
    const urlImagem = `${import.meta.env.VITE_API_URL}uploads/comunidades/`;
    
    useEffect(() => {
        if (id) {
            const carregarComunidade = async () => {
                const urlComunidade = `${url}comunidade.php`;
                
                try {
                    const response = await fetch(urlComunidade);
                    if (!response.ok) {
                        throw new Error(`Erro na requisição: ${response.status}`);
                    }
                    const data = await response.json();
                    
                    //filtra a comunidade
                    const comunidadeFiltrada = data.data.find(com => com.id === parseInt(id));

                    if (comunidadeFiltrada){
                        setComunidade(comunidadeFiltrada);
                    } else{
                        throw new Error("Comunidade não encontrada");
                    }


                } catch (error) {
                    console.error("Erro ao carregar comunidade:", error.message);
                }
            };
            carregarComunidade();
        }
    }, [id]);
    

    return (
        <div className={style.Comunidade}>
            {comunidade ? (
                <>
                    <h1>Comunidade {comunidade.nome}</h1>
                    <img
                        className={style.imagem}
                        src={`${urlImagem}${comunidade.fachada}`}
                        alt="Foto da igreja"
                    />

                    <p>{comunidade.descricao}</p>
                    <img
                        className={style.imagem}
                        src={`${urlImagem}${comunidade.imagemAltar}`}
                        alt="Foto do altar da comunidade"
                    />
                    <p>{comunidade.inicioComunidade}</p>
                    
                     {comunidade.mapaUrl ?(
                        <iframe
                        className={style.iframe}
                        src={`${comunidade.mapaUrl}`}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    ): null} 
                    {/* AIzaSyCwzPojvuNEzbVQA6ia2hDvbcgCfgZy5Kc    - chave api */}
                </>
            ) : (
                <p>Carregando dados da comunidade...</p>
            )}
        </div>
    );
};

export { Comunidade };
