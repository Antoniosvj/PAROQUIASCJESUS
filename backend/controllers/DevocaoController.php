<?php

require_once '../config/db.php';
require_once '../models/Devocao.php';

class DevocaoController {
    private $devocao;

    public function __construct() {
        $db = getDBConnection();  // Assume que esta função retorna a conexão com o banco
        $this->devocao = new Devocao($db);
    }

    // Método para obter todas as devoções
    public function getDevocoes() {
        return $this->devocao->getAll();
    }

    // Método para adicionar uma nova devoção
    public function postDevocao($data) {
        return $this->devocao->post($data);
    }

    // Método para atualizar uma devoção
    public function updateDevocao($id, $data) {
        return $this->devocao->update($id, $data);
    }

    // Método para deletar uma devoção
    public function deleteDevocao($id) {
        // Verifica se o ID existe antes de tentar deletar
        if ($this->devocao->exists($id)) {
            return $this->devocao->delete($id);  // Retorna true se a exclusão for bem-sucedida
        } else {
            return false;  // Retorna false se o ID não existir
        }
    }
}
