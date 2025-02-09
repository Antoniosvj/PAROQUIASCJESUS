import { useEffect, useState } from 'react';
import style from './HomePublicacao.module.css';

export const HomePublicacao = () => {
    const [isVisible, setIsVisible] = useState(true); // Estado para controlar a visibilidade da imagem
    const [imagem, setImagem] = useState({});
    const urlImagem = "https://www.paroquiascjesus.com.br/api/uploads/paroquia/";
    const url = "https://www.paroquiascjesus.com.br/api/api/publicacao.php";

    const getPublicacaoComMaiorId = (publicacoes) => {
        return publicacoes.reduce((max, item) => {
          return item.id > max.id ? item : max;
        }, { id: -Infinity });
    };

    const carregarImagem = async () => {
        try {
            const response = await fetch(`${url}`);
            const data = await response.json();
            
            // Usando a função para pegar a publicação com o maior id
            const ultimaPublicacao = getPublicacaoComMaiorId(data.data);
            console.log(ultimaPublicacao);

            // Verificar se a imagem está vazia e atualizar a visibilidade
            if (ultimaPublicacao.imagem === "") {
                setIsVisible(false); // Se a imagem estiver vazia, esconder a div
            } else {
                setIsVisible(true);
            }

            setImagem(ultimaPublicacao);
        } catch (error) {
            console.error("Erro ao carregar publicação: ", error);
        }
    };

    const closeImage = () => {
        setIsVisible(false); // Fecha a imagem ao clicar no botão
    };

    useEffect(() => {
        carregarImagem();
    }, []);

    return (
        <div>
            {isVisible && (
                <div className={style.HomePublicacao}>
                    <img src={`${urlImagem}${imagem.imagem}`} alt="Imagem Push" />
                    <button onClick={closeImage}>X</button>
                </div>
            )}
        </div>
    );
};
