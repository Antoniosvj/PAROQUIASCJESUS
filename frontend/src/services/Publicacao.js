
const url = `${import.meta.env.VITE_API_URL}api/`;

export const salvarPublicacao = async(e, publicacao) =>{

    e.preventDefault();
    try{
        const response = await fetch(`${url}publicacao.php`, {
          method: "PUT",
          body: JSON.stringify(publicacao),
          headers: { "Content-Type": "application/json" },
        });
        alert('Publicação editada com sucesso.');
      
    } catch (error){
      console.error("Erro ao atualizar a publicação.")
    }
  };

export  const carregarPublicacao = async (setPublicacao, setIsVisible) => {
  
  try {
      const response = await fetch(`${url}publicacao.php`);
      const data = await response.json();
      
      // Usando a função para pegar a publicação com o maior id
      const ultimaPublicacao = getPublicacaoComMaiorId(data.data);
      //console.log(ultimaPublicacao);

      // Verificar se o conteúdo é uma imagem ou um vídeo
      if (ultimaPublicacao.imagem === "") {
        setIsVisible(false); // Se não houver conteúdo, esconder a div
    } else {
        setIsVisible(true);
    }

  
      setPublicacao(ultimaPublicacao);
    } catch (error) {
      console.error("Erro ao carregar publicação: ", error);
    }
  };

   // Função para pegar o objeto com o maior ID
   const getPublicacaoComMaiorId = (publicacoes) => {
    return publicacoes.reduce((max, item) => {
      return item.id > max.id ? item : max;
    }, { id: -Infinity });
  };


  //upload imagem

export const uploadImagemPublicacao = async (formData, previousFileName) => {
  if (previousFileName) {
    formData.append('previousFileName', previousFileName);
  }

  const response = await fetch(`${url}publicacao.php`, {
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
    throw new Error('Erro ao analisar a resposta JSON');
  }

  if (data.status !== "success") {
    throw new Error(data.message || 'Erro ao enviar o arquivo');
  }

  return data;
};

//deletar publicação
export const deletarPublicacao = async () => {
  try {
    const response = await fetch(`${url}publicacao.php`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    // Verifica se a resposta tem conteúdo antes de tentar converter para JSON
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (data.status === "success") {
      alert("Publicação excluída com sucesso!");
      setPreviewUrl(null); // Remove a pré-visualização
      setPreviousFileName(null); // Remove o nome do arquivo salvo
    } else {
      alert("Erro ao excluir publicação.");
    }
  } catch (error) {
    console.error("Erro ao excluir publicação:", error);
  }
};
