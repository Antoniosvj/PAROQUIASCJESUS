import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { carregarComunidades } from "../../services";
import { Botao } from "../Botao";
import style from './Comunidades.module.css';

const Comunidades = () => {
    const [comunidades, setComunidades] = useState([]);
    const [Loading, setLoading] = useState(false);
    const urlImagem = `${import.meta.env.VITE_API_URL}/uploads/comunidades/`

    const navigate = useNavigate();

    const fetchComunidades = async () =>{
        setLoading(true);
        try {
          const response = await carregarComunidades();
          setComunidades(response.data);
          // await console.log(comunidades);
        } catch (error) {
          alert(`Erro ao carregar comunidades: ${error}`);
        } finally {
          setLoading(false);
        }    
    }

    useEffect(() => {
        fetchComunidades();
    }, []);

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
                            <div className={style.cardComunidade} key={id} onClick={() => handleClick(comunidade.id)}>
                                <img src={`${urlImagem}${comunidade.id}/${comunidade.fachada}`} alt="" />
                                <h3>{comunidade.nome}</h3>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export { Comunidades };
