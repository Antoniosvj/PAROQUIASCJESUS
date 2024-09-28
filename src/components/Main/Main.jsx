import style from './Main.module.css';

const Main = (props) =>{
    const { children } = props;
    return(
        <main className={style.Main}>
            {children}
        </main>
    )
}
export { Main };