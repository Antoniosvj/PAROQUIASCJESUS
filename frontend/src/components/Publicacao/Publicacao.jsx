import { useState, useEffect } from "react";
import { Botao } from '../index';
import { uploadImagemPublicacao, deletarPublicacao } from "../../services";
import style from './Publicacao.module.css';

export const Publicacao = () => {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [previousFileName, setPreviousFileName] = useState(null);
  const [publicacoes, setPublicacoes] = useState([]);

  const urlImagem = `${import.meta.env.VITE_API_URL}uploads/publicacao/`;

  useEffect(() => {
    fetchPublicacoes();
  }, []);

  const fetchPublicacoes = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}api/publicacao.php`);
      const data = await response.json();
      if (data.status === 'success') {
        setPublicacoes(data.data);
        if (data.data.length > 0) {
          setPreviousFileName(data.data[0].imagem);
          setPreviewUrl(`${urlImagem}${data.data[0].imagem}`);
        }
      }
    } catch (err) {
      console.error('Erro ao carregar publicações:', err);
    }
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFormData(file);

    // Gerar URL de pré-visualização temporária
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
  };

  const handleSubmitImagem = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', formData);

      const response = await uploadImagemPublicacao(formDataToSend, previousFileName);
      setPreviousFileName(response.data.fileName);
      setPreviewUrl(`${urlImagem}${response.data.fileName}`);
      fetchPublicacoes(); // Atualiza a lista após upload
      alert('Arquivo enviado com sucesso');
    } catch (err) {
      console.error('Erro ao enviar arquivo:', err);
      setError('Erro ao enviar arquivo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={style.containerPublicacao}>
      <h2>Push de Publicação</h2>
      <form onSubmit={handleSubmitImagem}>
        {previewUrl && (
          <div className={style.containerImagem}>
            <img src={previewUrl}/>
          </div>
        )}
        <input 
          type="file" 
          name="file"
          onChange={handleChange}
        />
        <Botao 
          nomeBotao="Salvar"
          type="submit"
          disabled={loading}
        />
        <button className="deletar" type='button' onClick={deletarPublicacao}>
          Excluir
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  );
};
