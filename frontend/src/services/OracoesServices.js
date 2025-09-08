const url = `${import.meta.env.VITE_API_URL}api/`;

export const carregarOracoes = async () => {
  try {
    const response = await fetch(`${url}oracao.php`);
    if (!response.ok) {
      throw new Error(`Erro ao carregar orações: ${response.status}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Erro ao carregar orações: ", error);
    throw error;
  }
};

export const adicionarOracao = async (oracao) => {
  try {
    const response = await fetch(`${url}oracao.php`, {
      method: 'POST',
      body: JSON.stringify(oracao),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao adicionar oração:", error);
    throw error;
  }
};

export const editarOracao = async (oracao) => {
  try {
    const response = await fetch(`${url}oracao.php`, {
      method: 'PUT',
      body: JSON.stringify(oracao),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao editar oração:", error);
    throw error;
  }
};

export const deletarOracao = async (id) => {
  try {
    const response = await fetch(`${url}oracao.php`, {
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
    console.error("Erro ao deletar oração:", error);
    throw error;
  }
};