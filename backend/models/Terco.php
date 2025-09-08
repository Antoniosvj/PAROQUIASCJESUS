
<?php

class Terco{

    private $db; 

    public function __construct($db){
        $this->db = $db;
    }

    public function getAll(){
        $json = file_get_contents('../file/santo-terco.json');
        $data = json_decode($json, true);
        return $data;
    }


}