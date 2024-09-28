import { useNavigate } from 'react-router-dom';
import style from './Botao.module.css';

const Botao = ({ nomeBotao }) =>{
    const navigate = useNavigate()

    const handleClick = () =>{
        navigate('/Comunidade', {state:{nomeComunidade:nomeBotao}});
    }

    return(
        <button 
            className={style.Botao}
            onClick={handleClick}
        >
            {nomeBotao}
        </button>
    )
};
export { Botao };