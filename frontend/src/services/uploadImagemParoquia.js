const url = `${import.meta.env.VITE_API_URL}api/uploadImagemParoquia.php`;

export const uploadImagemParoquia = async (formData) => {
  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erro de requisição: ${response.status}`);
  }

   const data = await response.json();

  if (data.status !== "success") {
    throw new Error(data.message || 'Erro ao enviar o arquivo');
  }

  return data;
};

export const deleteImagemParoquia = async (fileName) =>{
  const response = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify({fileName}),
  });

  if (!response.ok){
    throw new Error(`Erro de requisição: ${response.status}`);
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error('Erro ao analisar a resposta JSON: ', error);
  }

  if (data.status !== "success") {
    throw new Error(data.message || 'Erro ao deletar o arquivo');
  }

  return data;
}


const urlImagemPadre = `${import.meta.env.VITE_API_URL}api/imagemPadre.php`;

export const deletarImagemPadre = async (fileName) => {
  const response = await fetch(urlImagemPadre, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fileName }),
  });
  
  if (!response.ok) {
    throw new Error(`Erro de requisição: ${response.status}`);
  }

  const data = await response.json();
  if (data.status !== 'success') {
    throw new Error(data.message || 'Erro ao deletar o arquivo');
  }

  return data;
};
export const uploadImagemPadre = async (formData) =>{
  const response = await fetch(urlImagemPadre, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Erro de requisição: ${response.status}`);
  }

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error('Erro ao analisar a resposta JSON', error);
  }

  if (data.status !== "success") {
    throw new Error(data.message || 'Erro ao enviar o arquivo');
  }

  return data;
}