const url = `${import.meta.env.VITE_API_URL}api/`;

 export const carregarPalavra = async () => {
  
    try {
      const response = await fetch(`${url}PalavraPastor.php`);
      const data = await response.json();
      const palavra=data.data;
      return palavra;
    } catch (error) {
      console.error("Erro ao obter Palavra: ", error);
    }
  };

 export const salvarPalavra = async (palavra) => {
    try {
      const response = await fetch(`${url}PalavraPastor.php`, {
        method: "PUT",
        body: JSON.stringify(palavra),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      return data;
      // console.log("Resposta do servidor:", data);
    } catch (error) {
      console.error("Erro ao atualizar a Palavra do Pastor", error);
    }
  };