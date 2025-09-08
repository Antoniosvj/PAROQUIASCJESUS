import { useState } from 'react';
import { Botao } from '../index';

export const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', senha: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data)

      if (response.ok && data.status === 'success') {
        // Sucesso no login
        alert('Login bem-sucedido');
        localStorage.setItem("IsLoggedIn", "true");
        localStorage.setItem("isAdmin", data.admin.isAdmin.toString());
        onLogin(true, data.admin.isAdmin === 1); //notifica o componente pai com o estado
      } else {
        setError('Email ou senha incorretos!');
      }
    } catch (err) {
      console.error('Erro ao fazer login:', err);
      setError('Erro ao conectar-se ao servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <small>email teste: admin@admin.com</small><br/>
      <small>senha teste: senha123</small>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Senha:
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
          />
        </label>
        <Botao nomeBotao="Entrar" type="submit" disabled={loading} />
      </form>
    </div>
  );
};