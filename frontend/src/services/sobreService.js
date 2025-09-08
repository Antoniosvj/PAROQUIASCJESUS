const url = `${import.meta.env.VITE_API_URL}api/`;

export const carregarSobre = async () => {
  try {
    const response = await fetch(`${url}paroquia.php`);
    if (!response.ok) {
      throw new Error(`Erro ao carregar sobre: ${response.status}`);
    }
    const data = await response.json();
    return data.data[0];
  } catch (error) {
    console.error("Erro ao carregar sobre: ", error);
    throw error;
  }
};

export const editarSobre = async (sobre) => {
  try {
    const response = await fetch(`${url}paroquia.php`, {
      method: "PUT",
      body: JSON.stringify(sobre),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao salvar sobre:", error);
    throw error;
  }
};

