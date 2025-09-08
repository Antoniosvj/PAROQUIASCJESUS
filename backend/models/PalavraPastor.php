<?php

class PalavraPastor{
    private $db;

    public function __construct($db){
        $this->db = $db;
    }

    public function getAll(){
        $stmt = $this->db->query("SELECT * FROM palavraPastor");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function post($data){
        $stmt = $this->db->prepare("INSERT INTO palavraPastor (titulo, texto, padre, foto) VALUES (:titulo, :texto, :padre, :foto)");
        $stmt->bindParam(":titulo", $data['titulo']);
        $stmt->bindParam(':texto', $data['texto']);
        $stmt->bindParam(':padre', $data['padre']);
        $stmt->bindParam(':foto', $data['foto']);
        $stmt->execute;
    }

    public function delete($id){
        $stmt = $this->db->prepare('DELETE FROM palavraPastor WHERE id=:id');
        $stmt->bindParam(':id', $id);
        $stmt->execute();
    }

    public function update($id, $data){
        $stmt = $this->db->prepare('UPDATE palavraPastor SET titulo=:titulo, texto=:texto, padre=:padre, foto=:foto WHERE id=:id');
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':titulo', $data['titulo']);
        $stmt->bindParam(':texto', $data['texto']);
        $stmt->bindParam(':padre', $data['padre']);
        $stmt->bindParam(':foto', $data['foto']);
        $stmt->execute();
    }
}