import { useState } from "react";
import { Botao } from "../Botao";

export const CadastrarAdmin = () => {
    const url = 'https://www.paroquiascjesus.com.br/api/api/';

    // Estado para armazenar os dados do formulário
    const [formData, setFormData] = useState({
        nome: "",
        email: "",
        senha: "",
        isAdmin: false,
    });

    // Estado para controlar o carregamento
    const [loading, setLoading] = useState(false);

    // Função para validar os dados antes do envio
    const validateForm = () => {
        if (!formData.nome.trim()) {
            alert("O nome é obrigatório.");
            return false;
        }
        if (!formData.email.includes("@")) {
            alert("Informe um email válido.");
            return false;
        }
        if (formData.senha.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return false;
        }
        return true;
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Valida o formulário antes de enviar
        if (!validateForm()) return;

        setLoading(true); // Inicia o estado de carregamento

        try {
            const response = await fetch(`${url}admin.php`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Erro ao cadastrar: ${response.status}`);
            }

            const data = await response.json();
            alert(data.message || "Usuário cadastrado com sucesso!");

            // Reseta o formulário após o cadastro
            setFormData({
                nome: "",
                email: "",
                senha: "",
                isAdmin: false,
            });
        } catch (error) {
            console.error("Erro ao cadastrar usuário: ", error);
            alert(error.message || "Erro ao cadastrar o usuário.");
        } finally {
            setLoading(false); // Finaliza o estado de carregamento
        }
    };

    // Função para lidar com alterações nos campos do formulário
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value, // Atualiza o valor do checkbox ou do input normal
        }));
    };

    return (
        <>
            <h2>Cadastrar</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="nome">Nome: </label>
                    <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="senha">Senha: </label>
                    <input
                        type="password"
                        name="senha"
                        value={formData.senha}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="isAdmin">Tipo usuário (Admin): </label>
                    <input
                        type="checkbox"
                        name="isAdmin"
                        checked={formData.isAdmin}
                        onChange={handleChange}
                    />
                </div>
                <Botao
                    type="submit"
                    nomeBotao={'Cadastrar'}
                />
            </form>
        </>
    );
};
