import style from './Botao.module.css';

const Botao = (props) =>{
    const {nomeBotao} = props
    return(
        <a 
            className={style.Botao}
            href="#"
        >
            {nomeBotao}
        </a>
    )
};
export { Botao };