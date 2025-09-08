import { useState, useEffect } from "react";
import { carregarSobre, deleteImagemParoquia, editarSobre, uploadImagemParoquia } from "../../services";
import { Botao } from "../index";

export const SobreAdmin = () => {
  const [sobre, setSobre] = useState();
  const [loading, setLoading] = useState(false);
  const [previewUrl1, setPreviewUrl1] = useState(null);
  const [previewUrl2, setPreviewUrl2] = useState(null);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [previousFileName1, setPreviousFileName1] = useState(null);
  const [previousFileName2, setPreviousFileName2] = useState(null);

  const urlImagem = `${import.meta.env.VITE_API_URL}uploads/paroquia/`;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSobre((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange1 = (e) => {
    const file = e.target.files[0];
    setFile1(file);

    // Gerar URL de pré-visualização
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl1(fileUrl);
  };

  const handleFileChange2 = (e) => {
    const file = e.target.files[0];
    setFile2(file);

    // Gerar URL de pré-visualização
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl2(fileUrl);
  };

  const fetchSobre = async () => {
    try {
      const response = await carregarSobre();
      setSobre(response);
      setPreviousFileName1(response.foto1 || null);
      setPreviousFileName2(response.foto2 || null);
      setPreviewUrl1(`${urlImagem}${response.foto1}`);
      setPreviewUrl2(`${urlImagem}${response.foto2}`);
    } catch (err) {
      console.error(`Erro ao carregar sobre: ${err}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Upload da primeira imagem
      if (file1) {
        const formData1 = new FormData();
        formData1.append("file", file1);

        const response1 = await uploadImagemParoquia(formData1);
        if(response1.status !== 'success'){
          throw new Error(response1.message || "Erro ao fazer upload da imagem 1.");
        }
        sobre.foto1 = response1.data.fileName;

        // Excluir a imagem antiga
        if (previousFileName1) {
          await deleteImagemParoquia(previousFileName1);
        }
      }

      // Upload da segunda imagem
      if (file2) {
        const formData2 = new FormData();
        formData2.append("file", file2);

        const response2 = await uploadImagemParoquia(formData2);
        if(response2.status !== 'success'){
          throw new Error(response2.message || 'Erro ao fazer upload da imagem 2.');
        }
        sobre.foto2 = response2.data.fileName;

        // Excluir a imagem antiga
        if (previousFileName2) {
          await deleteImagemParoquia(previousFileName2);
        }
      }

      // Salvar as alterações
      await editarSobre(sobre);
      alert("Editado com sucesso.");
    } catch (error) {
      alert(`Erro ao editar. Tente novamente: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSobre();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        {sobre && (
          <>
            <textarea
              name="texto1"
              value={sobre.texto1}
              onChange={handleChange}
            ></textarea>
            <input type="file" onChange={handleFileChange1} />
            {previewUrl1 && (
              <img
                src={previewUrl1}
                alt="Foto da Paróquia Sagrado Coração de Jesus"
              />
            )}
            <textarea
              name="historia1"
              value={sobre.historia1}
              onChange={handleChange}
            ></textarea>
            <input type="file" onChange={handleFileChange2} />
            {previewUrl2 && (
              <img
                src={previewUrl2}
                alt="Foto da Paróquia Sagrado Coração de Jesus"
              />
            )}
            <textarea
              name="historia2"
              value={sobre.historia2}
              onChange={handleChange}
            ></textarea>
            <Botao nomeBotao="Salvar" type="submit" />
          </>
        )}
      </form>
    </>
  );
};