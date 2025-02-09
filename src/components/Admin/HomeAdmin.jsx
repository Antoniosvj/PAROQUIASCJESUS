import { useEffect, useState } from "react";
import { Botao } from "../Botao";

export const HomeAdmin = () => {
  const [acoes, setAcoes] = useState([]);
  const [editAcao, setEditAcao] = useState(false);
  const [publicacao, setPublicacao] = useState({
    id: "",
    imagem: ""
});

  const [palavra, setPalavra] = useState({
    id: "",
    titulo: "",
    texto: "",
    padre: "",
    foto: "",
  });
  const [formData, setFormData] = useState({
    id: "",
    foto: "",
    titulo: "",
    texto: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = "https://www.paroquiascjesus.com.br/api/api/";
  const urlImagem = `https://www.paroquiascjesus.com.br/api/uploads/paroquia/`;

  {/** FUNÇÕES DA PUBLICAÇÃO*/}
 // Função para pegar o objeto com o maior ID
  const getPublicacaoComMaiorId = (publicacoes) => {
    return publicacoes.reduce((max, item) => {
      return item.id > max.id ? item : max;
    }, { id: -Infinity });
  };

  const carregarPublicacao = async () => {
    try {
      const response = await fetch(`${url}publicacao.php`);
      const data = await response.json();
      
      // Usando a função para pegar a publicação com o maior id
      const ultimaPublicacao = getPublicacaoComMaiorId(data.data);
      //console.log(ultimaPublicacao);
  
      setPublicacao(ultimaPublicacao);
    } catch (error) {
      console.error("Erro ao carregar publicação: ", error);
    }
  };
  
  const salvarPublicacao = async(e) =>{
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

  {/*FUNÇÕES DA PALAVRA */}
  const carregarPalavra = async () => {
    try {
      const response = await fetch(`${url}PalavraPastor.php`);
      const data = await response.json();
      setPalavra(data.data[0]);
      //console.log(palavra)
    } catch (error) {
      console.error("Erro ao obter Palavra: ", error);
    }
  };

  const salvarPalavra = async (e) => {
    e.preventDefault();
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
      console.log("Resposta do servidor:", data);
      alert('Palavra do pastor editada com sucesso.');
    } catch (error) {
      console.error("Erro ao atualizar a Palavra do Pastor", error);
    }
  };
  
  {/** FUNÇÕES PARA AÇÃO DA IGREJA */}
  const carregarAcao = async () => {
    try {
      const response = await fetch(`${url}acao.php`);
      const data = await response.json();
      setAcoes(data.data);
    } catch (error) {
      console.error("Erro ao carregar Ações: ", error);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editAcao) {
      editarAcao();
    } else {
      adicionarAcao();
    }
  };

  const editar = (acao) => {
    setFormData({
      id: acao.id,
      foto: acao.foto,
      titulo: acao.titulo,
      texto: acao.texto,
    });
    setEditAcao(true);
  };

  const editarAcao = async (e) => {
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

      alert('Ação editada com sucesso.');

      setFormData({
        id: "",
        foto: "",
        titulo: "",
        texto: "",
      });
    } catch (error) {
      console.error("Erro ao salvar a ação.", error);
    }

    carregarAcao();
    setEditAcao(false);
  };

  const adicionarAcao = async (e) => {
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

      alert('Ação adicionada com sucesso.');

      setFormData({
        id: "",
        titulo: "",
        texto: "",
        foto: "",
      });
    } catch (error) {
      console.error(`Erro ao adicionar ação: ${error}`);
    }
  };

  const deletar = async (id) => {
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

  const handleSubmitImagem = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const fileInput = e.target.querySelector('input[type="file"]');

    if (fileInput && fileInput.files.length > 0) {
      formData.append("file", fileInput.files[0]);

      setIsLoading(true);

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
          setError(null);
        } else {
          setError("Falha ao enviar imagem. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro ao enviar imagem:", error);
        setError("Erro ao enviar imagem. Tente novamente.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Por favor, selecione um arquivo para enviar.");
    }
  };

  useEffect(() => {
    carregarPalavra();
    carregarAcao();
    carregarPublicacao();
  }, []);

  return (
    <>
      <h2>Home</h2>

      <h3>Subir Imagem no Servidor</h3>
      <form onSubmit={handleSubmitImagem}>
        <input type="file" />
        <Botao nomeBotao={"Enviar arquivo"} type="submit" />
      </form>

      {/*Imagem publicação */}
      <h3>Publicação Home</h3>
      <form onSubmit={salvarPublicacao}>
        <input 
          type="text" 
          value={publicacao.id} 
          onChange={(e) => setPublicacao({... publicacao, id: e.target.value})}
          disabled
        />
        <label>Imagem publicação: </label>
        <input 
          type="text" 
          value={publicacao.imagem} 
          onChange={(e) => setPublicacao({... publicacao, imagem: e.target.value})}
        />
         <img
            src={`${urlImagem}${publicacao.imagem}`}
            width="250"
            alt="Imagem de publicação evento"
          />
        <Botao nomeBotao="Salvar" type="submit" />
      </form>

      {/* Palavra do Pastor */}
      <h3>Palavra do Pastor</h3>
      <form onSubmit={salvarPalavra}>
        <div>
          <label>Id:</label>
          <input type="text" value={palavra.id} disabled />
        </div>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={palavra.titulo}
            onChange={(e) => setPalavra({ ...palavra, titulo: e.target.value })}
          />
        </div>
        <div>
          <label>Texto:</label>
          <textarea
            value={palavra.texto}
            onChange={(e) => setPalavra({ ...palavra, texto: e.target.value })}
          />
        </div>
        <div>
          <label>Nome do Padre:</label>
          <input
            type="text"
            value={palavra.padre}
            onChange={(e) => setPalavra({ ...palavra, padre: e.target.value })}
          />
        </div>
        <div className="container-images">
          <label>Imagem:</label>
          <input
            type="text"
            value={palavra.foto}
            onChange={(e) => setPalavra({ ...palavra, foto: e.target.value })}
          />
          <img
            src={`${urlImagem}${palavra.foto}`}
            width="250"
            alt="Imagem da Palavra do Pastor"
          />
        </div>
        <Botao nomeBotao="Salvar" type="submit" />
      </form>

      {/* Paróquia em Ação */}
      <h3>Paróquia em Ação</h3>
      <form onSubmit={handleSubmit}>
        <div className="container-images">
          <label>Imagem:</label>
          <input
            type="text"
            value={formData.foto}
            onChange={(e) => setFormData({ ...formData, foto: e.target.value })}
          />
          <img src={`${urlImagem}${formData.foto}`} alt="Imagem de Ação" width="250" />
        </div>
        <div>
          <label>ID:</label>
          <input type="text" value={formData.id} disabled />
        </div>
        <div>
          <label>Título:</label>
          <input
            type="text"
            value={formData.titulo}
            onChange={(e) =>
              setFormData({ ...formData, titulo: e.target.value })
            }
          />
        </div>
        <div>
          <label>Texto:</label>
          <textarea
            value={formData.texto}
            onChange={(e) =>
              setFormData({ ...formData, texto: e.target.value })
            }
          />
        </div>
        {editAcao ? (
          <Botao nomeBotao="Editar Ação" type="submit" />
        ) : (
          <Botao nomeBotao="Adicionar Ação" type="submit" />
        )}
      </form>

      {/* Lista de Ações */}
      <h3>Lista Ações</h3>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Texto</th>
            <th>Foto</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {acoes.map((acao) => (
            <tr key={acao.id}>
              <td>{acao.titulo}</td>
              <td>{acao.texto}</td>
              <td>
                <img
                  src={`${urlImagem}${acao.foto}`}
                  width="100"
                  alt={`Foto de ${acao.titulo}`}
                />
              </td>
              <td>
                <button onClick={() => editar(acao)}>Editar</button>
                <button className="deletar" onClick={() => deletar(acao.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
