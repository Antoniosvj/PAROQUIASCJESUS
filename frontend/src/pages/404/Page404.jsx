const  logo = '/images/logo_preto.png';
import style from './Page404.module.css';

const Page404 = () =>{
    return (
        <div className={style.Page404}>
            <h1>Pagina não encontrada!</h1>
            <img src={logo} alt="" />
        </div>
    )
}
export { Page404 };