import { useEffect, useState } from 'react';
import { carregarPublicacao } from '../../services';
import style from './HomePublicacao.module.css';

export const HomePublicacao = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [publicacao, setPublicacao] = useState(null); // Inicialmente como null
    const urlImagem = `${import.meta.env.VITE_API_URL}uploads/publicacao/`;

    const closeMedia = () => {
        setIsVisible(false);
    };

    useEffect(() => {
        carregarPublicacao(setPublicacao, setIsVisible);
    }, []);

    const isVideo = (url) => {
        return url && (url.endsWith('.mp4') || url.includes('youtube.com') || url.includes('vimeo.com'));
    };

    return (
        <div>
            {isVisible && publicacao && publicacao.imagem ? (
                <div className={style.HomePublicacao}>
                    {isVideo(publicacao.imagem) ? (
                        <video autoPlay controls>
                            <source src={`${urlImagem}${publicacao.imagem}`} type="video/mp4" />
                            Seu navegador não suporta o elemento de vídeo.
                        </video>
                    ) : (
                        <img src={`${urlImagem}${publicacao.imagem}`} />
                    )}
                    <button onClick={closeMedia}>X</button>
                </div>
            ) : null}
        </div>
    );
};
