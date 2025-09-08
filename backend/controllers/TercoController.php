<?php

require_once '../models/Terco.php';

class TercoController{
    private $terco;

    public function __construct(){
        $db = getDBConnection();
        $this->terco = new Terco($db);
    }

    public function getTerco(){
        return $this->terco->getAll();
    }

}