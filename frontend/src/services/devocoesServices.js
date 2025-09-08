const url = `${import.meta.env.VITE_API_URL}api/`;

export const carregarDevocoes = async () => {
  try {
    const response = await fetch(`${url}devocao.php`);
    if (!response.ok) {
      throw new Error(`Erro ao carregar devoções: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erro ao carregar devoções: ", error);
    throw error;
  }
};

export const adicionarDevocao = async (devocao) => {
  try {
    const response = await fetch(`${url}devocao.php`, {
      method: 'POST',
      body: JSON.stringify(devocao),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao adicionar devoção:", error);
    throw error;
  }
};

export const editarDevocao = async (devocao) => {
  try {
    const response = await fetch(`${url}devocao.php`, {
      method: 'PUT',
      body: JSON.stringify(devocao),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao editar devoção:", error);
    throw error;
  }
};

export const deletarDevocao = async (id) => {
  try {
    const response = await fetch(`${url}devocao.php`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao deletar devoção:", error);
    throw error;
  }
};