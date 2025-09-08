const url = `${import.meta.env.VITE_API_URL}api/admin.php`;

export const carregarUsuarios = async () =>{
    try{
        const response = await fetch(url);
        
        if(!response.ok){
            throw new Error(`Erro ao carregar usuários: ${response.status}`);
        }

        const data = await response.json();
        return data.data

    } catch(error){
        console.error(`Erro ao carregar usuários: ${error}`);
    }
}

export const cadastrarUsuario = async(usuario) =>{
    try{
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(usuario),
            headers: { 'Content-Type': 'application/json'}
        });
        
        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch(error){
        console.error("Erro ao cadastrar usuário: ", error);
    }
}

export const editarUsuario = async (usuario) =>{
    console.log(usuario)
    try{
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(usuario),
            headers: { 'Content-Type': 'application/json'}
        });

        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;

    } catch(error){
        console.error("Erro ao editar usuário: ", error);
    }
}

export const deletarUsuario = async (id) =>{
    try{
        const response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
            headers: { 'Content-Type': 'application/json'}
        });

        if(!response.ok){
            throw new Error(`Erro na requisição: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error){
        console.error("erro ao deletar usuario: ", error);
    }
}