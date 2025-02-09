import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Botao } from "../Botao";
import style from './Comunidades.module.css';

const Comunidades = () => {
    const [comunidades, setComunidades] = useState([]);

    const navigate = useNavigate();

    const url = 'https://www.paroquiascjesus.com.br/api/api/';

    const carregarComunidades = async () => {
        try {
            const response = await fetch(`${url}comunidade.php`);
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            const data = await response.json();
            setComunidades(data.data);
            // console.log(data.data);
        } catch (error) {
            console.error("Erro ao carregar comunidade.", error);
        }
    };

    useEffect(() => {
        carregarComunidades();
    }, []);

    //função click botao
    const handleClick = (id) =>{
        navigate(`/Comunidade/${id}`, {state: { id }});
    }

    return (
        <section className={style.Comunidades}>
            <h2>Comunidades Paroquial</h2>
            <p>Esta Paróquia é composta por {comunidades.length} comunidades.</p>
            <div className={style.containerComunidades}>
                <div className={style.containerBotao}>
                    {/* Condicional para verificar se as comunidades estão sendo carregadas */}
                    {comunidades.length === 0 ? (
                        <p>Carregando Comunidades...</p>
                    ) : (
                        comunidades.map((comunidade, id) => (
                            <Botao key={id} nomeBotao={comunidade.nome} onClick={() => handleClick(comunidade.id)}/>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export { Comunidades };
