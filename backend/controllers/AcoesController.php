<?php
require_once '../config/db.php';
require_once '../models/acoes.php';

class AcoesController{
    private $acao;

    public function __construct(){
        $db = getDBConnection();
        $this->acao = new Acao($db);
    }

    public function getAcoes(){
        return $this->acao->getAll();
    }
    
    public function postAcao($data){
        return $this->acao->post($data);
    }
    
    public function updateAcao($id, $data){
        return $this->acao->update($id, $data);
    }
    
    public function deleteAcao($id){
        if ($this->acao->exists($id)){
            return $this->acao->delete($id);
        } else{
            return false;
        }
    }

}