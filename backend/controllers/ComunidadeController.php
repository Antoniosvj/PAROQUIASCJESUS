<?php

require_once '../config/db.php';
require_once '../models/Comunidade.php';

class ComunidadeController{
    private $comunidade;

    public function __construct(){
        $db = getDBConnection();
        $this->comunidade = new Comunidade($db);
    }

    public function getComunidades(){
        try {
            return $this->comunidade->getAll();
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => $e->getMessage()];
        }
    }

    public function postComunidade($data){
        try {
            $this->comunidade->post($data);
            return ['status' => 'success', 'message' => 'Comunidade adicionada com sucesso.'];
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => 'Erro ao adicionar comunidade: ' . $e->getMessage()];
        }
    }

    public function updateComunidade($id, $data){
            $this->comunidade->update($id, $data);
    }

    public function deleteComunidade($id){
        try {
            $this->comunidade->delete($id);
            return ['status' => 'success', 'message' => 'Comunidade removida.'];
        } catch (Exception $e) {
            return ['status' => 'error', 'message' => 'Erro ao deletar: ' . $e->getMessage()];
        }
    }
}
