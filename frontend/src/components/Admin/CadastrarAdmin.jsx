import { useEffect, useState } from "react";
import {
  carregarUsuarios,
  deletarUsuario,
  cadastrarUsuario,
  editarUsuario,
} from "../../services";
import { Botao } from "../index";

export const CadastrarAdmin = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    email: "",
    isAdmin: false,
    senha: "",
    repetirSenha: "",
  });

  const fetchUsuarios = async () => {
    const response = await carregarUsuarios();
    setUsuarios(response);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.senha !== formData.repetirSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    try {
      //criando um objeto sem repetir senha
      const { repetirSenha, ...dataToSubmit } = formData;
      dataToSubmit.isAdmin = formData.isAdmin ? 1 : 0;

      if (isEditing) {
        const { senha, ...usuarioEdit } = dataToSubmit;
        await editarUsuario(usuarioEdit);
        setUsuarios((prevUsuarios) =>
          prevUsuarios.map((usuario) =>
            usuario.id === formData.id ? usuarioEdit : usuario
          )
        );
        setIsEditing(false);
      } else {
        const { id, ...usuario } = dataToSubmit;
        await cadastrarUsuario(usuario);
        fetchUsuarios();
      }

      setFormData({
        id: "",
        nome: "",
        email: "",
        isAdmin: false,
        senha: "",
        repetirSenha: "",
      });
    } catch (error) {
      alert(`Erro ao cadastrar usuario. Tente novamente: ${error}`);
    }
  };

  const handleEditar = (usuario) => {
    setFormData({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      isAdmin: usuario.isAdmin === 1,
      senha: "",
      repetirSenha: "",
    });
    setIsEditing(true);
  };

  const handleDeletar = async (id) => {
    try {
      await deletarUsuario(id);
    } catch (error) {
      alert("Erro ao deletar usuário, tente novamente: ", error);
    } finally {
      fetchUsuarios();
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <>
      <h2>Cadastro de Usuários</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="">
          Nome:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          É Administrador?
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
          />
        </label>
        {!isEditing && (
          <>
            <label>
              Senha:
              <input
                type="password"
                name="senha"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Repita a senha:
              <input
                type="password"
                name="repetirSenha"
                value={formData.repetirSenha}
                onChange={handleChange}
                required
              />
            </label>
          </>
        )}

        <Botao nomeBotao={isEditing ? "Salvar" : "Cadastrar"} type="submit" />
      </form>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Administrador?</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>{usuario.isAdmin === 1 ? "Sim" : "Não"}</td>
              <td>
                {/* <button onClick={() => handleEditar(usuario)}>Editar</button> */}
                <button
                  className="deletar"
                  onClick={() => handleDeletar(usuario.id)}
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
