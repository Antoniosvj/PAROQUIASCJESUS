import { Botao } from "../index";
import {
  adicionarComunidade,
  carregarComunidades,
  editarComunidade,
  uploadImagemComunidade,
  deletarImagemComunidade,
  DeletarComunidade,
} from "../../services";
import { useEffect, useState } from "react";

export const ComunidadesAdmin = () => {
  const [comunidades, setComunidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [previewUrl1, setPreviewUrl1] = useState(null);
  const [previewUrl2, setPreviewUrl2] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [previousFileName1, setPreviousFileName1] = useState(null);
  const [previousFileName2, setPreviousFileName2] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    inicioComunidade: "",
    mapaUrl: "",
    fachada: "",
    imagemAltar: "",
  });
  const urlImagem = `${import.meta.env.VITE_API_URL}uploads/comunidades/`;

  const fetchComunidades = async () => {
    setLoading(true);
    try {
      const response = await carregarComunidades();
      setComunidades(response.data);
      // await console.log(comunidades);
    } catch (error) {
      alert(`Erro ao carregar comunidades: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    setFile1(file);

    //gerar pre visualização
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl1(fileUrl);
  };

  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    setFile2(file);

    //gerar pre visualização
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl2(fileUrl);
  };

  const handleEditar = (comunidade) => {
    setFormData({
      id: comunidade.id,
      nome: comunidade.nome,
      descricao: comunidade.descricao,
      inicioComunidade: comunidade.inicioComunidade,
      mapaUrl: comunidade.mapaUrl,
    });
    setPreviousFileName1(comunidade.fachada || null);
    setPreviousFileName2(comunidade.imagemAltar || null);
    setPreviewUrl1(`${urlImagem}${comunidade.id}/${comunidade.fachada}`);
    setPreviewUrl2(`${urlImagem}${comunidade.id}/${comunidade.imagemAltar}`);
    setIsEditing(true);
  };

  const handleDeletar = async (comunidade) => {
    setLoading(true);

    try{
        await DeletarComunidade(comunidade.id);
    }catch(error){
        alert(`Erro ao deletar comunidade: ${error}`);
    }finally{
        setLoading(false);
        fetchComunidades();
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const updatedFormData = { ...formData };
  
      if (isEditing) {
        // Upload da primeira imagem
        if (file1) {
          const formData1 = new FormData();
          formData1.append("file", file1);
          formData1.append("id", formData.id);
  
          const response1 = await uploadImagemComunidade(updatedFormData.id, formData1);
          console.log("Resposta do upload da imagem 1:", response1);
  
          if (response1 && response1.fileName) {
            updatedFormData.fachada = response1.fileName;
            console.log("Imagem enviada com sucesso:", response1.fileName);
          } else {
            console.error("Erro: Resposta inválida do upload da imagem 1", response1);
            throw new Error("Erro ao fazer upload da imagem 1: resposta inválida.");
          }
        }

        // Upload da segunda imagem
        if (file2) {
          const formData2 = new FormData();
          formData2.append("file", file2);
          formData2.append("id", formData.id);
  
          const response2 = await uploadImagemComunidade(updatedFormData.id, formData2);
          console.log("Resposta do upload da imagem 1:", response2);
  
          if (response2 && response2.fileName) {
            updatedFormData.imagemAltar = response2.fileName;
            console.log("Imagem enviada com sucesso:", response2.fileName);
          } else {
            console.error("Erro: Resposta inválida do upload da imagem 1", response2);
            throw new Error("Erro ao fazer upload da imagem 1: resposta inválida.");
          }
        }
  
        const response = await editarComunidade(updatedFormData);
        setComunidades((prevComunidades) =>
          prevComunidades.map((comunidade) =>
            comunidade.id === updatedFormData.id ? updatedFormData : comunidade
          )
        );
  
        alert(response.message || "Comunidade atualizada com sucesso.");
        setIsEditing(false);
      } else {
        const response = await adicionarComunidade(updatedFormData);
        setComunidades((prevComunidades) => [...prevComunidades, response.data]);
        alert("Comunidade adicionada com sucesso.");
      }
  
      // Limpar o formulário
      setFormData({
        nome: "",
        descricao: "",
        inicioComunidade: "",
        mapaUrl: "",
        fachada: "",
        imagemAltar: "",
      });
      setFile1(null);
      setFile2(null);
      setPreviewUrl1(null);
      setPreviewUrl2(null);
    } catch (error) {
      console.error("Erro ao salvar comunidade:", error);
      alert(`Erro ao salvar comunidade: ${error.message}`);
    } finally {
      setLoading(false);
      fetchComunidades();
    }
  };
  
  

  useEffect(() => {
    fetchComunidades();
  }, []);

  return (
    <section>
      <h2>Administrar Comunidade</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome da Comunidade:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </label>
        {isEditing && (
          <>
            <input type="file" onChange={handleFileChange1} />
            {previewUrl1 && (
              <img
                src={previewUrl1}
                alt={`Imagem da comunidade ${formData.nome}`}
              />
            )}
          </>
        )}

        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
        ></textarea>
        {isEditing && (
          <>
            <input type="file" onChange={handleFileChange2} />
            {previewUrl2 && (
              <img
              className="imagemEdicao"
                src={previewUrl2}
                alt={`Imagem da comunidade ${formData.nome}`}
              />
            )}
          </>
        )}
        <textarea
          type="text"
          onChange={handleChange}
          name="inicioComunidade"
          value={formData.inicioComunidade}
        ></textarea>

        <label>
          Localização:<br></br>
          <input
            type="text"
            name="mapaUrl"
            onChange={handleChange}
            value={formData.mapaUrl}
          />
        </label>
        <Botao nomeBotao={isEditing ? "Salvar" : "Adicionar"} type="submit" />
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome da Comunidade</th>
            <th>Descricao</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
  {comunidades && comunidades.length > 0 ? (
    comunidades.map((comunidade) => (
      comunidade && (
        <tr key={comunidade.id}>
          <td>{comunidade.nome}</td>
          <td className="mostrarTd">
            {comunidade.descricao}<br></br>
            {comunidade.inicioComunidade}
          </td>
          <td>
            <button onClick={() => handleEditar(comunidade)}>Editar</button>
            <button onClick={() => handleDeletar(comunidade)} className="deletar">Excluir</button>
          </td>
        </tr>
      )
    ))
  ) : (
    <tr>
      <td colSpan="2">Nenhuma comunidade encontrada.</td>
    </tr>
  )}
</tbody>
      </table>
    </section>
  );
};
