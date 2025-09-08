<?php

require_once '../config/db.php';
require_once '../models/PalavraPastor.php';

class PalavraPastorController{
    private $palavra;

    public function __construct(){
        $db = getDBConnection();
        $this->palavra = new PalavraPastor($db);
    }

    public function getPalavra(){
        return $this->palavra->getAll();
    }

    public function deletePalavra($id){
        return $this->palavra->delete($id);
    }

    public function updatePalavra($id, $data){
        return $this->palavra->update($id, $data);
    }

    public function postPalavra($data){
        return $this->palavra->post($data);
    }
}