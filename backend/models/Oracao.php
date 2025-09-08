<?php
class Oracao {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM oracoes");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($id, $data) {
        $stmt = $this->db->prepare("UPDATE oracoes SET titulo = :titulo, oracao = :oracao where id = :id");
        $stmt->bindParam(":titulo", $data['titulo']);
        $stmt->bindParam(":oracao", $data['oracao']);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);

        if($stmt->execute()){
            //verifica se alguma linha foi alterada
            if($stmt->rowCount() > 0){
                return true;
            }else{
                return 'Nenhuma linha foi alterada. verifique se o id é valido.';
            }
        };
    }

    public function post($data) {
        $stmt = $this->db->prepare('INSERT INTO oracoes (titulo, oracao) VALUES (:titulo, :oracao)');
        $stmt->bindParam(':titulo', $data['titulo']);
        $stmt->bindParam('oracao', $data['oracao']);

        if($stmt->execute()){
            return 'Oração adicionada com sucesso';
        }else{
            return 'Falha ao adicionar oração.';
        };
    }

    public function delete($id) {
        $stmt = $this->db->prepare('DELETE FROM oracoes WHERE ID = :id');
        $stmt->bindParam(':id', $id);

        if($stmt->execute()){
            return 'Oração deletada com sucesso';
        } else{
            return 'Falha ao deletar oração';
        }
    }
}

