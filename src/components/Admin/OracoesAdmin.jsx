import { useEffect, useState } from "react"
import { Botao } from "../Botao"

export const OracoesAdmin = () => {
    const [oracoes, setOracoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        titulo: "",
        oracao: ""
    })

    const url = 'https://www.paroquiascjesus.com.br/api/api/';

    const carregarOracoes = async () =>{
        try{
            const response = await fetch(`${url}oracao.php`);
            if (!response.ok){
                throw new Error(`Erro ao carregar orações: ${response.status}`);
            }

            const data = await response.json();
            // console.log(data.data)
            setOracoes(data.data);
            setLoading(false);

        }catch(error){
            console.error("Erro ao carregar orações: ", error);
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();  // Impede o recarregamento da página ao submeter
        if (editMode) {
            salvarOracao();
        } else {
            adicionarOracao();
        }
    }
    

    const salvarOracao = async () =>{
        try{
            const response = await fetch(`${url}oracao.php`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            });

            if(!response.ok){
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const data = await response.json();
            console.log("Resposta do servidor: ",data);

            setFormData({
                id: '',
                titulo: '',
                oracao: ''
            })
            setEditMode(false);
            await carregarOracoes();
        } catch (error) {
            console.error("Erro ao editar oração:", error);
        }

    }        
        
    const adicionarOracao = async () => {
        try {
            const requestData = {
                titulo: "Nova devoção",
                oracao: "editada"
            };
            console.log("Enviando dados para o servidor:", requestData);  // Verifique os dados antes do envio
            const response = await fetch(`${url}oracao.php`, {
                method: 'POST',
                body: JSON.stringify(requestData),
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            const data = await response.json();
            console.log("Resposta do servidor:", data);
    
            if (data.status === "success") {
                alert("Oração adicionada com sucesso.");
                setFormData({ id: "", titulo: "", oracao: "" });
                await carregarOracoes();
            } else {
                console.error("Erro do backend:", data.message);
            }
        } catch (error) {
            console.error("Erro ao adicionar oração:", error);
        }
    };
        
    
    
    const editarOracao = (oracao) =>{
        setFormData({
            id: oracao.id,
            titulo: oracao.titulo,
            oracao: oracao.oracao,
        });
        setEditMode(true);
    }

    const deletarOracao = async (id) =>{
        try{
            const response = await fetch(`${url}oracao.php`, {
                method: 'DELETE',
                body: JSON.stringify({id: id}),
                headers: {'Content-Type': 'application/json'}
            });

            if(!response.ok){
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const data = response.json();
            console.log(data);

            carregarOracoes();

        } catch (error) {
            console.error("Erro ao deletar oração:", error);
        }
    }

    useEffect(() =>{
        carregarOracoes();
    }, []);


    return(
        <>
            <div>
            <h2>Orações</h2>
            <h3>Formulario Orações</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Id: </label>
                    <input type="text" value={formData.id} disabled/>
                    <label htmlFor="">Titulo: </label>
                    <input 
                        type="text" 
                        value={formData.titulo} 
                        onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                    />
                </div>
                <div>
                    <label htmlFor="">Oração: </label>
                    <textarea
                        value={formData.oracao} 
                        onChange={(e) => setFormData({...formData, oracao: e.target.value})}   
                    />
                </div>
                    {editMode ? (
                        <Botao type="submit" nomeBotao="Salvar Oracao" />
                    ): (
                        <Botao type="submit" nomeBotao="Adicionar Oracao" />
                    )}
                </form>
            </div>

            <div>
                <h3>Lista Orações</h3>
                {loading ? (
                    <p>Carregando orações</p>
                    ): oracoes.length > 0 ?(
                        <table>
                            <thead>
                                <tr>
                                    <th>Titulo</th>
                                    <th>Oração</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {oracoes.map((oracao) =>(
                                    <tr key={oracao.id}>
                                        <td>{oracao.titulo}</td>
                                        <td>{oracao.oracao}</td>
                                        <td>
                                            <button onClick={() => editarOracao(oracao)}>Editar</button>
                                            <button onClick={() => deletarOracao(oracao.id)} className="deletar">Excluir</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ):(
                        <p>Nenhuma oração encontrada</p>
                    )}
            </div>
        </>
    )
}