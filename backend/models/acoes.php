<?php
class Acao{
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    public function getAll(){
        $stmt = $this->db->query("SELECT * FROM Acoes");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function post($data){
        $stmt = $this->db->prepare("INSERT INTO `Acoes`(`foto`, `titulo`, `texto`) VALUES (:foto,:titulo,:texto)");
        $stmt->bindParam(":foto", $data['foto']);
        $stmt->bindParam(":titulo", $data['titulo']);
        $stmt->bindParam(":texto", $data['texto']);
        
        if($stmt->execute()){
            return 'Ação adicionada com sucesso';
        } else{
            return 'Falha ao adicionar ação';
        }
    }
    
    public function update($id, $data){
        $stmt = $this->db->prepare("UPDATE Acoes SET foto=:foto, titulo=:titulo, texto=:texto WHERE id=:id");
        $stmt->bindParam(":foto", $data['foto']);
        $stmt->bindParam(":titulo", $data['titulo']);
        $stmt->bindParam(":texto", $data['texto']);
        $stmt->bindParam(":id", $id);
        
        if($stmt->execute()){
            return 'Ação atualizada com sucesso';
        } else{
            return 'Falha ao atualizar Ação';
        }
    }
    
    //metodo para verificar se a ação existe pelo id
    public function exists($id){
        $stmt = $this->db->prepare('SELECT COUNT(*) FROM Acoes WHERE id= :id');
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        
        return $stmt->fetchColumn() > 0; //retorna true se existir
    }
    
    public function delete($id){
        $stmt = $this->db->prepare('DELETE FROM Acoes WHERE id= :id');
        $stmt->bindParam(':id', $id);
        
        return $stmt->execute(); //retorna true se bem sucedida
    }
}