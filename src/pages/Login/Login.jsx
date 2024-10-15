import { useState } from "react";
import style from './Login.module.css';

export const Login = ({ onLogin }) =>{
    const [ email, setEmail ] = useState('');
    const [ senha, setSenha ] = useState('');
    const [ error, setError ] = useState('');

    const handleSubmit = async (event) =>{
        event.preventDefault();

        try{
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({ email, senha }),
            });
            const data = await response.json();
            if (response.ok){
                onLogin(data.token);
            } else {
                setError(data.message || 'Login falhou. Verifique suas credenciais.');
            }
        } catch (err){
            console.error('Erro de login: ', err);
            setError('Ocorreu um erro ao fazer login, Tente novamente.');
        }
    };
    
    return(
        <div className={style.container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div className={style.containerInput}>
                    <label>Email: </label>
                    <input
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={style.containerInput}>
                    <label>Senha: </label>
                    <input
                        type="password" 
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)} />
                </div>
                {error && <p style={{color:'red'}}>{error}</p>}
                <button type='submit'>Entrar</button>
            </form>
        </div>
    )
}