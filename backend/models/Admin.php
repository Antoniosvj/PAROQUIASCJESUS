<?php

class Admin {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    // Método para criar um novo administrador
    public function create($data) {
        $stmt = $this->db->prepare("INSERT INTO admins (nome, email, senha, isAdmin) VALUES (:nome, :email, :senha, :isAdmin)");

        $senhaHash = password_hash($data['senha'], PASSWORD_DEFAULT); // Hash da senha
        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':senha', $senhaHash);
        $stmt->bindParam(':isAdmin', $data['isAdmin'], PDO::PARAM_BOOL);

        if ($stmt->execute()) {
            return 'Administrador cadastrado com sucesso!';
        } else {
            throw new Exception('Erro ao cadastrar administrador.');
        }
    }

    // Método para autenticar um administrador
    public function login($email, $senha) {
        $stmt = $this->db->prepare("SELECT * FROM admins WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $admin = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($admin && password_verify($senha, $admin['senha'])) {
            return [
                'status' => 'success',
                'message' => 'Login bem-sucedido',
                'admin' => $admin // Retorna os dados do administrador, se necessário
            ];
        } else {
            return [
                'status' => 'error',
                'message' => 'Credenciais inválidas'
            ];
        }
    }

    public function getAll(){
        $stmt = $this->db->query("SELECT * FROM admins");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function delete($id){
        $stmt = $this->db->prepare("DELETE FROM admins WHERE id=:id");
        $stmt->bindParam(':id', $id);
        
        if($stmt->execute()){
            return 'Cadastro removido com sucesso.';
        } else{
            throw new Exception('Erro ao remover cadastro.');
        }
    }

    public function editar($data) {
    
        // Se o ID existe, fazer a atualização
        $stmt = $this->db->prepare("UPDATE admins SET
            nome=:nome,
            email=:email,
            isAdmin=:isAdmin
            WHERE id=:id
        ");
        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':isAdmin', $data['isAdmin'], PDO::PARAM_BOOL);
        $stmt->bindParam(':id', $data['id'], PDO::PARAM_INT);
    
        $stmt->execute();
        
        if ($stmt->rowCount() > 0) {
            return 'Administrador editado com sucesso!';
        } else {
            return 'Nenhuma alteração realizada ou erro ao editar.';
        }
    }
    
    
}
