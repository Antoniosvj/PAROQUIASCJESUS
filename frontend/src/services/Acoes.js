import { carregarPalavra } from ".";
const url = `${import.meta.env.VITE_API_URL}api/`;
const urlImagem = `${url}uploadImagemAcao.php`;

export const carregarAcoes = async () => {
    try {
      const response = await fetch(`${url}acao.php`);
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status}`);
      }
      const data = await response.json();
      return data
    } catch (error) {
      console.error(`Erro ao carregar ações: ${error}`);
    }
  };

export const carregarAcao = async () => {
  try {
    const response = await fetch(`${url}acao.php`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao carregar Ações: ", error);
  }
};

export const editarAcao = async (formData) => {
  console.log(formData);
  try {
    const response = await fetch(`${url}acao.php`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }
    const data = await response.json();
    console.log("Resposta do servidor: ", data);

  } catch (error) {
    console.error("Erro ao salvar a ação.", error);
  }

  carregarAcao();
};

export const adicionarAcao = async (formData) => {
  try {
    const response = await fetch(`${url}acao.php`, {
      method: "POST",
      body: JSON.stringify({
        titulo: formData.titulo,
        texto: formData.texto,
        foto: formData.foto,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Erro de requisição: ${response.status}`);
    }
    const data = await response.json();


    return data;

  } catch (error) {
    console.error(`Erro ao adicionar ação: ${error}`);
  }
};

export const deletarAcao = async (id) => {
  try {
    const response = await fetch(`${url}acao.php`, {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Erro ao deletar a ação: ${response.status}`);
    }
    carregarAcao();
    console.log(`Ação com ID ${id} excluída com sucesso.`);
  } catch (error) {
    console.error("Erro ao excluir a ação:", error);
  }

  carregarPalavra();
};

export const uploadImagemAcao = async (formData) =>{
  const response = await fetch (urlImagem, {
    method: 'POST',
    body: formData,
  });

  if(!response.ok){
    throw new Error(`Erro de requisição: ${response.status}`);
  }

  const data = await response.json();
  if(data.status !== 'success'){
    throw new Error(data.message || 'Erro ao enviar o arquivo');
  }
  return data;
}

export const deletarImagemAcao = async (fileName) =>{
  const response = await fetch(urlImagem, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileName }),
  });

  if(!response.ok){
    throw new Error(`Erro de requisição: ${response.status}`);
  }

  const data = await response.json();
  if(data.status !== 'success'){
    throw new Error(data.message || 'Erro ao deletar imagem');
  }

  return data;
}