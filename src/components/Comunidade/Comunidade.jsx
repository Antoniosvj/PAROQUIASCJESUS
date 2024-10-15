import { useEffect, useState } from 'react';

import comunidades from '../../assets/comunidades.json'

import style from './Comunidade.module.css';

const Comunidade = ({ nomeComunidade }) =>{
    const [comunidade, setComunidade] = useState(null);

    useEffect(()=>{
        const comunidadeData = comunidades[nomeComunidade];

        if(comunidadeData){
            setComunidade({ ...comunidadeData});
        }
    }, [nomeComunidade]);

    return(
        <div className={style.Comunidade}>
            <h1>Comunidade {nomeComunidade}</h1>

            {comunidade && (
                <>
                    <img src={comunidade.imagem} alt={nomeComunidade} />
                    <p>{comunidade.descricao}</p>
                    <iframe 
                        className={style.iframe}
                        src={comunidade.mapaUrl}
                        allowfullscreen="" 
                        loading="lazy" 
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                    
                </>
            )}
        </div>
    )
}
export {Comunidade};