<?php
class Publicacao
{
    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function getAll()
    {
        $stmt = $this->db->query("SELECT * FROM publicacao");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function post($data)
    {
        $stmt = $this->db->prepare("INSERT INTO `publicacao`(`imagem`) VALUES (:imagem)");
        $stmt->bindParam(":imagem", $data['imagem']);

        if ($stmt->execute()) {
            return 'Publicação adicionada com sucesso';
        } else {
            return 'Falha ao adicionar publicação';
        }
    }

    public function update($id, $data)
    {
        $stmt = $this->db->prepare("UPDATE publicacao SET imagem=:imagem WHERE id=:id");
        $stmt->bindParam(":imagem", $data['imagem']);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            return 'Publicação atualizada com sucesso';
        } else {
            return 'Falha ao atualizar publicação';
        }
    }

    //metodo para verificar se a ação existe pelo id
    public function exists($id)
    {
        $stmt = $this->db->prepare('SELECT COUNT(*) FROM publicacao WHERE id= :id');
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetchColumn() > 0; //retorna true se existir
    }

    // Retorna a última publicação cadastrada
    public function getLast()
    {
        $stmt = $this->db->query("SELECT * FROM publicacao ORDER BY id DESC LIMIT 1");
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    // Exclui a publicação pelo ID
    public function deleteById($id) {
        // Buscar a publicação pelo ID
        $stmt = $this->db->prepare('SELECT imagem FROM publicacao WHERE id = :id');
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        $publicacao = $stmt->fetch(PDO::FETCH_ASSOC);
    
        if ($publicacao && isset($publicacao['imagem'])) {
            $filePath = __DIR__ . '/../uploads/publicacao/' . $publicacao['imagem'];
            if (file_exists($filePath)) {
                unlink($filePath); // Exclui a imagem do servidor
            }
        }
    
        // Excluir do banco de dados
        $stmt = $this->db->prepare('DELETE FROM publicacao WHERE id = :id');
        $stmt->bindParam(':id', $id);
        return $stmt->execute();
    }
    

}

