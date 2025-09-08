import { useEffect, useState } from 'react';
import { Botao } from '../index';
import { carregarPalavra, uploadImagemPadre, salvarPalavra, deletarImagemPadre } from '../../services';

export const PalavraPastor = () => {
  const urlImagem = `${import.meta.env.VITE_API_URL}/uploads/palavra/`;
  const [palavra, setPalavra] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previousFileName, setPreviousFileName] = useState(null);
  const [file, setFile] = useState(null);

  const fetchPalavra = async () => {
    try {
      const response = await carregarPalavra();
      setPalavra(response[0]);
      setPreviousFileName(response[0].foto);
      setPreviewUrl(`${urlImagem}${response[0].foto}`);
    } catch (err) {
      console.error(`Erro ao carregar palavra: ${err}`);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPalavra((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);

    // Gerar URL de pré-visualização
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const response = await uploadImagemPadre(formData);
        palavra.foto = response.data.fileName;

        // Excluir a imagem antiga
        if (previousFileName) {
          await deletarImagemPadre(previousFileName);
        }
      }

      await salvarPalavra(palavra);
      alert('Editado com sucesso.');
    } catch (error) {
      alert(`Erro ao editar. Tente novamente: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPalavra();
  }, []);

  return (
    <>
      <h2>Palavra do Pastor</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Titulo:
          <input
            type="text"
            name="titulo"
            value={palavra.titulo || ''}
            onChange={handleChange}
          />
        </label>
        <label>
          Imagem:
          <input type="file" onChange={handleFileChange} />
        </label>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Pré-visualização"
            style={{ maxWidth: '100%', maxHeight: '300px' }}
          />
        )}
        <label>
          Texto:
          <textarea
            name="texto"
            value={palavra.texto || ''}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Padre:
          <input
            type="text"
            name="padre"
            value={palavra.padre || ''}
            onChange={handleChange}
          />
        </label>
        <Botao nomeBotao="Salvar" type="submit" />
      </form>
    </>
  );
};