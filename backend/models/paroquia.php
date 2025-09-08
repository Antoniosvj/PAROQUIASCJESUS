
<?php

class Paroquia{

    private $db; 

    public function __construct($db){
        $this->db = $db;
    }

    public function getAll(){
        $stmt = $this->db->query("SELECT * FROM paroquia");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function update($data){
        $stmt = $this->db->prepare("UPDATE paroquia SET texto1=:texto1, foto1=:foto1, historia1=:historia1, foto2=:foto2, historia2=:historia2 WHERE id=1");
        $stmt->bindParam(":texto1", $data["texto1"]);
        $stmt->bindParam(":foto1", $data["foto1"]);
        $stmt->bindParam(":historia1", $data["historia1"]);
        $stmt->bindParam(":foto2", $data["foto2"]);
        $stmt->bindParam(":historia2", $data["historia2"]);

        $stmt->execute();
    }


}