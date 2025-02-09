import { useEffect, useState } from "react";
import { Botao } from "../Botao"

export const DevocoesAdmin = () =>{
    const [devocoes, setdevocoes] = useState([]);
    const [editDevocao, setEditDevocao] = useState(false);
    const [formData, setFormData] = useState({
        id:'',
        titulo:'',
        subtitulo:'',
        devocao: '',
        font: '',
    });
    
    const url = 'https://www.paroquiascjesus.com.br/api/api/';

    const carregarDevocoes = async () =>{
        try{
            const response = await fetch(`${url}devocao.php`);
            const data = await response.json()
            // console.log(data)
            setdevocoes(data.data)
        }catch(error){
            console.error("Erro ao carregar devoções: ", error);
        }
    }

    const deletar = async (id) =>{
        try{
            const response = await fetch(`${url}devocao.php`,{
                method: 'DELETE',
                body: JSON.stringify({id: id}),
                headers: {'Content-Type': 'application/json'}
            });

            if(!response){
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const data = await response.json();
            // console.log(data)

            carregarDevocoes();

        } catch(error){
            console.error("Erro ao deletar devoção: Id ausente");
        }
    }


    const editar = (devocao) =>{
        setFormData({
            id: devocao.id,
            titulo: devocao.titulo,
            subtitulo: devocao.subtitulo,
            devocao: devocao.devocao,
            font: devocao.font
        })
        setEditDevocao(true);
    }

    const handleSubmit = (e) =>{
        e.preventDefault(); //impede o recarregamento da pagina
        if(editDevocao) {
            editarDevocao();
        } else {
            adicionarDevocao();
        }
    }

    const adicionarDevocao = async () =>{
        try{
            const response = await fetch(`${url}devocao.php`, {
                method: 'POST',
                body: JSON.stringify({
                    titulo: formData.titulo,
                    subtitulo: formData.subtitulo,
                    devocao: formData.devocao,
                    font: formData.font
                }),
                headers: {'Content-Type': 'application/json'}
            });
    
            if(!response.ok){
                throw new Error(`Erro de requisição: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            setFormData({
                id: '',
                titulo: '',
                subtitulo: '',
                devocao: '',
                font: ''
            })
        }catch(error){
            console.error(`Erro ao adicionar devoção: ${error}`)
        }


        carregarDevocoes();
    }

    const editarDevocao = async () =>{
        try{
            const response = await fetch(`${url}devocao.php`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: {'Content-Type': 'application/json'}
            });

            if(!response.ok){
                throw new Error(`Erro de requisição: ${response.error}`);
            }

            const data = await response.json();

            setFormData({
                id: '',
                titulo: '',
                subtitulo: '',
                devocao: '',
                font: ''
            })
            
        }catch(error){
            console.error("Erro ao editar devoção");
        }
        
        
        await carregarDevocoes();
    }

    useEffect(() =>{
        carregarDevocoes();
    }, [])



    return (
        <>
            <h2>Devoções</h2>

            <h3>Formulario Devoções</h3>
            <form onSubmit={handleSubmit}>
                <div>
                <label htmlFor="">Id: </label>
                <input 
                    type="text" 
                    value={formData.id}
                    disabled
                />
                
                <label htmlFor="">Titulo: </label>
                <input 
                    type="text"
                    value={formData.titulo}
                    onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                />
                </div>
                <div>

                <label htmlFor="">Subtitulo: </label>
                <input 
                    type="text" 
                    value={formData.subtitulo}
                    onChange={(e)=> setFormData({...formData, subtitulo: e.target.value})}
                />

                <label htmlFor="">Fonte:</label>
                <input 
                    type="text" 
                    value={formData.font}
                    onChange={(e)=> setFormData({...formData, font: e.target.value})}    
                />

                </div>
                <div>
                <label htmlFor="">Devoção: </label>
                <textarea
                    value={formData.devocao}
                    onChange={(e)=> setFormData({...formData, devocao: e.target.value})}
                />
                </div>
                {editDevocao ? (
                    <Botao nomeBotao="Editar Devoção" type="submit"/>
                ) : (
                    <Botao nomeBotao="Adicionar Devoção" type="submit"/>
                )}
            </form>

            <h3>Lista Devoções</h3>
            <table>
                <thead>
                    <tr>
                        <th>Titulo / subtitulo</th>
                        <th>Devoção</th>
                        <th>Fonte / Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {devocoes.map((devocao) =>(

                        <tr key={devocao.id}>
                            <td>{devocao.titulo} / {devocao.subtitulo}</td>
                            <td>{devocao.devocao}</td>
                            <td>
                                {devocao.font}
                                <button onClick={() => editar(devocao)}>Editar</button>
                                <button className="deletar" onClick={() => deletar(devocao.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}