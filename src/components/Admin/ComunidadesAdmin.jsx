import { useEffect, useState } from "react";
import { Botao } from "../Botao";

export const ComunidadesAdmin = () => {
    const [comunidades, setComunidades] = useState([]);
    const [editComunidade, setEditComunidade] = useState(false);
    const [formData, setFormData] = useState({
        id: '',
        nome: '',
        descricao: '',
        fachada: '',
        inicioComunidade: '',
        imagemAltar: '',
        mapaUrl: ''
    });
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [error, setError] = useState(null); // Error state
    const url = 'https://www.paroquiascjesus.com.br/api/api/';
    const urlImagem = `https://www.paroquiascjesus.com.br/api/uploads/comunidades/`;


    const carregarComunidades = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}comunidade.php`);
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            const data = await response.json();
            setComunidades(data.data);
        } catch (error) {
            console.error(`Erro ao carregar comunidade: ${error}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeletarComunidade = async (id) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}comunidade.php`, {
                method: 'DELETE',
                body: JSON.stringify({ id: id }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`Erro de requisição: ${response.status}`);
            }

            carregarComunidades();
        } catch (error) {
            console.error('Erro ao deletar comunidade: Id ausente');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEditComunidade = (comunidade) => {
        setFormData({
            id: comunidade.id,
            nome: comunidade.nome,
            descricao: comunidade.descricao,
            fachada: comunidade.fachada,
            inicioComunidade: comunidade.inicioComunidade,
            imagemAltar: comunidade.imagemAltar,
            mapaUrl: comunidade.mapaUrl
        });
        setEditComunidade(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verificação de campos obrigatórios
        if (!formData.nome || !formData.descricao || !formData.fachada) {
            setError("Por favor, preencha todos os campos obrigatórios.");
            return;
        }

        setError(null); // Limpar erros anteriores

        if (editComunidade) {
            editarComunidade();
        } else {
            adicionarComunidade();
        }
    };

    const editarComunidade = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}comunidade.php`, {
                method: 'PUT',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`Erro de requisição: ${response.status}`);
            }

            const data = await response.json();

            setFormData({
                id: '',
                nome: '',
                descricao: '',
                fachada: '',
                inicioComunidade: '',
                imagemAltar: '',
                mapaUrl: ''
            });
        } catch (error) {
            console.error("Erro ao editar Comunidade", error);
            setError("Erro ao editar comunidade. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
            setEditComunidade(false);
            carregarComunidades();
        }
    };

    const adicionarComunidade = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${url}comunidade.php`, {
                method: 'POST',
                body: JSON.stringify({
                    nome: formData.nome,
                    descricao: formData.descricao,
                    fachada: formData.fachada,
                    inicioComunidade: formData.inicioComunidade,
                    imagemAltar: formData.imagemAltar,
                    mapaUrl: formData.mapaUrl
                }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error(`Erro de requisição: ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            carregarComunidades();

            setFormData({
                id: '',
                nome: '',
                descricao: '',
                fachada: '',
                inicioComunidade: '',
                imagemAltar: '',
                mapaUrl: ''
            });
        } catch (error) {
            console.error('Erro ao adicionar comunidade', error);
            setError("Erro ao adicionar comunidade. Tente novamente mais tarde.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitImagem = async (e) => {
        e.preventDefault(); // Impede o envio do formulário padrão
    
        const formData = new FormData();
        const fileInput = e.target.querySelector('input[type="file"]');
        
        if (fileInput && fileInput.files.length > 0) {
            formData.append("file", fileInput.files[0]); // Adiciona o arquivo ao FormData
    
            setIsLoading(true); // Ativa o estado de loading enquanto o arquivo está sendo enviado
    
            try {
                const response = await fetch(`${url}uploadImagemComunidade.php`, {
                    method: 'POST',
                    body: formData,
                });
    
                if (!response.ok) {
                    throw new Error(`Erro de requisição: ${response.status}`);
                }
    
                const data = await response.json();
    
                if (data.status === 'success') {
                    alert('Imagem enviada com sucesso.')
                    setError(null); // Limpa qualquer erro anterior
                } else {
                    // Caso o upload falhe, exibe o erro
                    setError('Falha ao enviar imagem. Tente novamente.');
                }
            } catch (error) {
                console.error('Erro ao enviar imagem:', error);
                setError('Erro ao enviar imagem. Tente novamente.');
            } finally {
                setFormData({
                    id: '',
                    nome: '',
                    descricao: '',
                    fachada: '',
                    inicioComunidade: '',
                    imagemAltar: '',
                    mapaUrl: ''
                });

                setIsLoading(false); // Desativa o estado de loading
            }
        } else {
            setError('Por favor, selecione um arquivo para enviar.');
        }
    };
    

    useEffect(() => {
        carregarComunidades();
    }, []);

    return (
        <div>
            <h2>Comunidades</h2>

            <h3>Subir Imagem no Servidor</h3>
            <form onSubmit={handleSubmitImagem}>
                <input type="file" />
                <Botao nomeBotao={"Enviar arquivo"} type="submit"/>
            </form>

            <h3>Formulario Edição Comunidade</h3>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe erro caso exista */}

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Id:</label>
                    <input 
                        type="text" 
                        value={formData.id} 
                        disabled 
                    />
                    <label htmlFor="">Nome da Comunidade:</label>
                    <input 
                        type="text" 
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    />
                </div>
                <div>
                    <label htmlFor="">Descrição:</label>
                    <textarea 
                        value={formData.descricao}
                        onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                    />
                </div>
                <div className="container-images">
                    <label htmlFor="">Imagem da Comunidade: </label>
                    <input 
                        type="" 
                        value={formData.fachada}
                        onChange={(e) => setFormData({ ...formData, fachada: e.target.value })}
                    />
                <img src={`${urlImagem}${formData.fachada}`} alt={`Foto da comunidade ${formData.nome}`} />
                    
                </div>
                <div>
                    <label htmlFor="">História do Santo Padroeiro: </label>
                    <textarea 
                        value={formData.inicioComunidade}
                        onChange={(e) => setFormData({ ...formData, inicioComunidade: e.target.value })}
                    />
                </div>
                <div className="container-images">
                    <label htmlFor="">Imagem Altar ou do Santo Padroeiro: </label>
                    <input 
                        type="text" 
                        value={formData.imagemAltar}
                        onChange={(e) => setFormData({ ...formData, imagemAltar: e.target.value })}
                    />
                    <img src={`${urlImagem}${formData.imagemAltar}`} alt={`Foto do altar da comunidade ${formData.nome}`} />
                </div>
                <div>
                    <label htmlFor="">Mapa url: </label>
                    <input 
                        type="text" 
                        value={formData.mapaUrl}
                        onChange={(e) => setFormData({ ...formData, mapaUrl: e.target.value })}
                    />
                </div>
                {isLoading ? (
                    <p>Carregando...</p>
                ) : (
                    <Botao nomeBotao={editComunidade ? "Editar Comunidade" : "Adicionar Comunidade"} type="submit" />
                )}
            </form>

            <h3>Tabela Comunidades</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nome da Comunidade</th>
                        <th>Descrição</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {comunidades.map((comunidade) => (
                        <tr key={comunidade.id}>
                            <td>{comunidade.nome}</td>
                            <td>
                                {comunidade.descricao}<br />
                                {comunidade.fachada}<br />
                                {comunidade.inicioComunidade}<br />
                                {comunidade.imagemAltar}<br />
                                {comunidade.mapaUrl}
                            </td>
                            <td>
                                <button onClick={() => handleEditComunidade(comunidade)}>Editar</button>
                                <button className="deletar" onClick={() => handleDeletarComunidade(comunidade.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
