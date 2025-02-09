import { useState } from "react";

export const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Adicionando o estado de carregamento

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true); // Inicia o carregamento
    setError(""); // Limpa o erro anterior
    
    try {
      const response = await fetch("https://www.paroquiascjesus.com.br/api/api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok && data.status === "success") {
        const isAdmin = data.isAdmin;
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", isAdmin.toString()); // Converte o boolean para string
        onLogin(true, isAdmin); // Notifica o componente pai com os estados
      } else {
        setError(data.message || "Erro desconhecido");
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Erro ao conectar-se ao servidor. Tente novamente.");
    } finally {
      setLoading(false); // Finaliza o carregamento, independentemente de erro ou sucesso
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input 
            type="password" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" disabled={loading}>Entrar</button> {/* Desabilita o botão durante o carregamento */}
      </form>
    </div>
  );
};
