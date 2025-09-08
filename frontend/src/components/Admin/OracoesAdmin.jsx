import { useEffect, useState } from "react";
import { adicionarOracao, carregarOracoes, deletarOracao, editarAcao, editarOracao } from "../../services";
import { Botao } from '../index';

export const OracoesAdmin = () =>{
    const [oracoes, setOracoes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        titulo: '',
        oracao: ''
    })

    const fetchOracoes = async () =>{
        const response = await carregarOracoes();
        setOracoes(response);
    }

    const handleChange = (e) =>{
        const { name, value } = e.target;
        setFormData((prevData) =>({
            ...prevData,
            [name]: value,
        }));
    }

    const handleEditar = async (oracao) =>{
        setFormData({
            id: oracao.id,
            titulo: oracao.titulo,
            oracao: oracao.oracao,
        });
        setIsEditing(true);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            if(isEditing){
                await editarOracao(formData)
                setOracoes((prevOracoes)=>
                prevOracoes.map((oracao)=>
                    oracao.id ===formData.id ? formData : oracao
                ));
                setIsEditing(false);
            } else{
                const response = await adicionarOracao(formData);
                console.log(response);
                fetchOracoes();
            }

            setFormData({
                id: '',
                titulo: '',
                oracao: ''
            });
        } catch (error){
            alert(`Erro ao salvar oração. Tente novamente: ${error}`)
        }
    }

    const handleDeletar = async (id) =>{
        try{
            await deletarOracao(id);
        } catch (error){
            alert('Erro ao deletar oração', error)
        } finally{
            fetchOracoes();
        }
    }

    useEffect(() =>{
        fetchOracoes();
    }, [])
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
                />
            </label>
            <label>
                Oração:
                <textarea 
                    name="oracao"
                    value={formData.oracao}
                    onChange={handleChange}
                ></textarea>
            </label>
            <Botao 
                nomeBotao={isEditing ? 'Editar': 'Salvar'}
            />
        </form>
        <table>
            <thead>
                <tr>
                    <th>Titulo</th>
                    <th className="mostrarTd">Oração</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {oracoes.map((oracao) =>(
                    <tr key={oracao.id}>
                        <td>{oracao.titulo}</td>
                        <td className="mostrarTd">{oracao.oracao}</td>
                        <td>
                            <button
                                onClick={() => handleEditar(oracao)}
                            >Editar</button>
                            <button
                                className="deletar"
                                onClick={() => handleDeletar(oracao.id)}
                            >Excluir</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </>
    )
}