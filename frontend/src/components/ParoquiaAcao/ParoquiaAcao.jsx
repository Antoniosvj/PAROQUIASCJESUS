
import { useEffect, useState } from 'react';
import { carregarAcoes, deletarAcao, adicionarAcao, editarAcao, uploadImagemAcao, deletarImagemAcao } from '../../services';
import { Botao } from '../index';
import style from './ParoquiaAcao.module.css';

export const ParoquiaAcao = () =>{
    const [acoes, setAcoes] = useState([]);
    const urlImagem = `${import.meta.env.VITE_API_URL}uploads/acao/`
    const [isEditing, setIsEditing] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        titulo: '',
        texto: '',
        foto: '',
    });

    const fetchAcoes = async () =>{
        const response = await carregarAcoes();
        // console.log(response)
        setAcoes(response.data)
    }

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData((prevData) =>({
            ...prevData,
            [name]: value,
        }));
    }

    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        setFile(file);

        // Gerar URL de pré-visualização
        const fileUrl = URL.createObjectURL(file);
        setPreviewUrl(fileUrl);
    }

    const handleEditar = async (acao) =>{
        setFormData({
            id: acao.id,
            titulo: acao.titulo,
            texto: acao.texto,
            foto: acao.foto,
        });
        setPreviewUrl(`${urlImagem}${acao.foto}`);
        setIsEditing(true);
    }

    const handleDeletar = async (id) =>{
        try{
            //encontrar a ação correspondente ao id para obter o nome da imagem
            const acaoParaDeletar = acoes.find((acao) => acao.id ===id);

            if(acaoParaDeletar && acaoParaDeletar.foto){
                //deletar a imagem associada
                await deletarImagemAcao(acaoParaDeletar.foto);
            }
            await deletarAcao(id);
        } catch (error){
            alert(`Erro ao deletar Ação. ${error}`);
        }finally{
            fetchAcoes();
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        setLoading(true);
        try{
            let fotoFileName = formData.foto;

            if(file){
                //deletar a imagem antiga se existir
                if(isEditing && formData.foto){
                    await deletarImagemAcao(formData.foto);
                }

                //fazer upload da nova imagem
                const formDataToSend = new FormData();
                formDataToSend.append('file', file);

                const response = await uploadImagemAcao(formDataToSend);
                fotoFileName = response.data.fileName;
            }
            
            //atualizar o formData com nome da imagem
            const updateFormData = {
                ...formData,
                foto: fotoFileName,
            };

            if(isEditing){
                await editarAcao(updateFormData);
                alert("Ação editada com sucesso.");
                setIsEditing(false);
            } else{
                    await adicionarAcao(updateFormData);
                    alert("Ação adicionada com sucesso.");
            }

            fetchAcoes();
            setFormData({
                id: "",
                titulo: "",
                texto: "",
                foto: "",
            });
            setPreviewUrl(null);
            setFile(null);

        }catch (error){
            alert(`Erro ao Salvar ação: ${error}`);
            return;
        } finally{
            setLoading(false);
        }
    }

    useEffect(() =>{
        fetchAcoes();
    }, [])
    return (
        <section className={style.containerParoquiaAcao}>
            <h2>Paróquia em Ação</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Título:
                    <input 
                        type="text" 
                        name="titulo"
                        value={formData.titulo || ''}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Texto:
                    <textarea
                        type="text"
                        name="texto"
                        value={formData.texto || ''}
                        onChange={handleChange} 
                    ></textarea>
                </label>
                <label>
                    <input 
                        type="file"
                        onChange={handleFileChange}
                    />
                </label>
                {previewUrl && (
                    <img 
                        src={previewUrl}
                        className={style.imagemAcao}

                    />
                )}
                <Botao nomeBotao={isEditing ? 'Editar': 'Salvar'}/>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Titulo</th>
                        <th>Imagem</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {acoes.map((acao)=>
                        <tr key={acao.id}>
                            <td>{acao.titulo}</td>
                            <td><img src={`${urlImagem}${acao.foto}`} alt="" className={style.imagemTabela}/></td>
                            <td>
                                <button
                                    onClick={() => handleEditar(acao)}
                                >Editar</button>
                                <button 
                                    className='deletar'
                                    onClick={() => handleDeletar(acao.id)}
                                >Excluir</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}