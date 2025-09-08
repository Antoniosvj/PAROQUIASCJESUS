import { useEffect, useState } from 'react';
import { Botao } from '../index';
import { adicionarDevocao, carregarDevocoes, deletarDevocao, editarDevocao } from '../../services';
export const DevocoesAdmin = () =>{
    const [devocoes, setDevocoes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        titulo: '',
        subtitulo: '',
        devocao: '',
        font: ''
    });

    const fetchDevocoes = async () =>{
        const  response = await carregarDevocoes();
        setDevocoes(response);
    }
    useEffect(() =>{
        fetchDevocoes();
    }, [])

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData((prevData) =>({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditar = (devocao) =>{
        setFormData({
            id: devocao.id,
            titulo: devocao.titulo,
            subtitulo: devocao.subtitulo,
            devocao: devocao.devocao,
            font: devocao.font,
        });
        setIsEditing(true);
    }

    const handleDeletar = async (id) =>{
        try{
            await deletarDevocao(id);
        } catch (error){
            console.error('Erro ao deletar devoção. Tente novamente.', error)
        } finally{
            fetchDevocoes();
        }
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if(isEditing){
                await editarDevocao(formData)
                setDevocoes((prevDevocoes) =>
                prevDevocoes.map((devocao) =>
                    devocao.id === formData.id ? formData : devocao
                ));
                setIsEditing(false);
            } else{
                const response = await adicionarDevocao(formData);
                console.log(response);
                fetchDevocoes();
            }
            setFormData({
                id: '',
                titulo: '',
                subtitulo: '',
                devocao: '',
                font: ''
            });
        } catch (error){
            alert(`Erro ao salvar devoção. Tente novamente: ${error}`);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}> 
                <label>
                    Titulo:  
                    <input 
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        required 
                    />
                </label>
                <label>
                    Subtítulo:  
                    <input 
                        type="text" 
                        name="subtitulo"
                        value={formData.subtitulo}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Texto:  
                    <textarea 
                        name="devocao"
                        value={formData.devocao}
                        onChange={handleChange}
                    ></textarea>
                </label>
                <label>
                    Fonte:  
                    <input  
                        type="text" 
                        name="font"
                        value={formData.font}
                        onChange={handleChange}
                    />
                </label>
                <Botao 
                    nomeBotao= {isEditing ? 'Atualizar': 'Salvar'}
                    type="submit"
                />
            </form>
            <table>
                <thead>
                    <tr>
                        <th>
                            Título/Subtitulo
                        </th>
                        <th className="mostrarTd">
                            Texto/Fonte
                        </th>
                        <th>
                            Funções
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {devocoes.map((devocao) =>(
                        <tr key={devocao.id}>
                            <td>
                                {devocao.titulo}
                            </td>
                            <td className="mostrarTd">
                                {devocao.devocao}<br />
                                {devocao.font}
                            </td>
                            <td>
                                <button
                                    onClick={() => handleEditar(devocao)}
                                >
                                    Editar
                                </button>
                                <button 
                                    className="deletar"
                                    onClick={() => handleDeletar(devocao.id)}
                                >
                                    Excluir
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                
            </table>
        </>
    )
}