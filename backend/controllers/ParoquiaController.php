<?php

require_once '../config/db.php';
require_once '../models/paroquia.php';

class ParoquiaController{
    private $paroquia;

    public function __construct(){
        $db = getDBConnection();
        $this->paroquia = new Paroquia($db);
    }

    public function getParoquia(){
        return $this->paroquia->getAll();
    }

    public function updateParoquia($data){
        return $this->paroquia->update($data);
    }



}
