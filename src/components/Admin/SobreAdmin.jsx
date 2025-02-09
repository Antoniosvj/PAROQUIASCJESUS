import { useState, useEffect } from "react";
import { Botao } from "../../components/Botao";

export const SobreAdmin = () => {
  const [sobre, setSobre] = useState({
    logoParoquia: "",
    logoPassionista: "",
    foto1: "",
    foto2: "",
    texto1: "",
    historia1: "",
    historia2: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Para o estado de loading
  const [error, setError] = useState(null); // Para o estado de erro

  const url = "https://www.paroquiascjesus.com.br/api/api/";
  const urlImagem = `https://www.paroquiascjesus.com.br/api/uploads/paroquia/`;

  const carregarSobre = async () => {
    try {
      const response = await fetch(`${url}paroquia.php`);
      const data = await response.json();
      setSobre(data.data[0]); // Preenche com os dados do banco
    } catch (error) {
      console.error("Erro ao obter Sobre: ", error);
    }
  };

  const handleSubmitImagem = async (e) => {
    e.preventDefault(); // Impede o envio do formulário padrão

    const formData = new FormData();
    const fileInput = e.target.querySelector('input[type="file"]');

    if (fileInput && fileInput.files.length > 0) {
      formData.append("file", fileInput.files[0]); // Adiciona o arquivo ao FormData

      setIsLoading(true); // Ativa o estado de loading enquanto o arquivo está sendo enviado

      try {
        const response = await fetch(`${url}uploadImagemParoquia.php`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Erro de requisição: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success") {
          alert("Imagem enviada com sucesso.");
          setError(null); // Limpa qualquer erro anterior
        } else {
          setError("Falha ao enviar imagem. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao enviar imagem:", error);
        setError("Erro ao enviar imagem. Tente novamente.");
      } finally {
        setIsLoading(false); // Desativa o estado de loading
      }
    } else {
      setError("Por favor, selecione um arquivo para enviar.");
    }
  };

  useEffect(() => {
    carregarSobre();
  }, []);

  const salvarSobre = async (e) => {
    e.preventDefault(); // Previne o recarregamento da página ao enviar o formulário

    try {
      console.log("Dados enviados ao servidor:", sobre); // Log dos dados
      const response = await fetch(`${url}paroquia.php`, {
        method: "PUT",
        body: JSON.stringify(sobre),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      const data = await response.json();
      console.log("Resposta do servidor:", data);
      alert('Sobre editado com sucesso.')
    } catch (error) {
      console.error("Erro ao atualizar o sobre:", error);
    }
  };

  return (
    <>
      <h2>SOBRE</h2>
      <h3>Subir Imagem no Servidor</h3>
      <form onSubmit={handleSubmitImagem}>
        <input type="file" />
        <Botao nomeBotao={"Enviar arquivo"} type="submit" />
      </form>

      
      <form onSubmit={salvarSobre}>
        <div>
          <label htmlFor="texto1">Texto 1:</label>
          <textarea
            name="texto1"
            value={sobre.texto1}
            onChange={(e) => setSobre({ ...sobre, texto1: e.target.value })}
          />
        </div>
        <div className="container-images">
          <label htmlFor="foto1">Foto 1:</label>
          <input
            type="text"
            value={sobre.foto1}
            onChange={(e) => setSobre({ ...sobre, foto1: e.target.value })}
          />
          {sobre.foto1 && <img src={`${urlImagem}${sobre.foto1}`} alt="foto1" />}
        </div>
        <div>
          <label htmlFor="historia1">História 1:</label>
          <textarea
            name="historia1"
            value={sobre.historia1}
            onChange={(e) => setSobre({ ...sobre, historia1: e.target.value })}
          />
        </div>
        <div className="container-images">
          <label htmlFor="foto2">Foto 2:</label>
          <input
            type="text"
            value={sobre.foto2}
            onChange={(e) => setSobre({ ...sobre, foto2: e.target.value })}
          />
          {sobre.foto2 && <img src={`${urlImagem}${sobre.foto2}`} alt="foto2" />}
        </div>
        <div>
          <label htmlFor="historia2">História 2:</label>
          <textarea
            name="historia2"
            value={sobre.historia2}
            onChange={(e) => setSobre({ ...sobre, historia2: e.target.value })}
          />
        </div>
        <div>
          <Botao nomeBotao="Salvar Alterações" type="submit" />
        </div>
      </form>
    </>
  );
};
