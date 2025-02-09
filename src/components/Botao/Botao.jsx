import style from './Botao.module.css';

const Botao = ({ nomeBotao, onClick }) =>{

    return(
        <button 
            className={style.Botao}
            onClick={onClick}
        >
            {nomeBotao}
        </button>
    )
};
export { Botao };