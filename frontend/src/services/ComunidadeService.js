
const url = `${import.meta.env.VITE_API_URL}api/`;


export const carregarComunidades = async () => {
    try {
        const response = await fetch(`${url}comunidade.php`);
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Erro ao carregar comunidade: ${error}`);
    }
};

export const DeletarComunidade = async (id) => {
    try {
        const response = await fetch(`${url}comunidade.php`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Erro de requisição: ${response.status}`);
        };

    } catch (error) {
        console.error('Erro ao deletar comunidade: Id ausente: ', error);
    }
};


export const editarComunidade = async (formData) => {
    console.log(formData)
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
        return data
    } catch (error) {
        console.error("Erro ao editar Comunidade", error);
    }
};
editarComunidade();

export const adicionarComunidade = async (formData) => {
    
        const response = await fetch(`${url}comunidade.php`, {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`Erro de requisição: ${response.status}`);
        }

        const data = await response.json();
        if(data.status !== 'success'){
            throw new Error(data.message || 'Erro ao adicionar comunidade.');
        }
    
        return data;
};

//tratamento das imagens

export const uploadImagemComunidade = async (id, formData) =>{
        formData.append("id", id);

        const response = await fetch(`${url}uploadImagemComunidade.php`, {
            method: 'POST',
            body: formData
        });

        if(!response.ok){
            throw new Error(`Erro de requisição: ${response.status}`);
        }

        const data = await response.json();
        if(data.status !== 'success'){
            throw new Error (data.message || 'Erro ao enviar arquivo.');
        }

        return data;
}

export const deletarImagemComunidade = async (id, fileName) =>{
    const response = await fetch(`${url}uploadImagemComunidade.php`, {
        method: 'DELETE',
        body: JSON.stringify({ id, fileName }),
        headers: { 'Content-Type': 'application/json'},
    });

    if (!response.ok) {
        throw new Error(`Erro de requisição: ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== 'success') {
        throw new Error(data.message || 'Erro ao deletar arquivo.');
    }

    return data;
}