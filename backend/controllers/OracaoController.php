<?php
require_once '../config/db.php';
require_once '../models/Oracao.php';

class OracaoController {
    private $oracao;

    public function __construct() {
        $db = getDBConnection();
        $this->oracao = new Oracao($db);
    }

    public function getOracoes() {
        return $this->oracao->getAll();
    }

    public function updateOracao($id, $data) {
        return $this->oracao->update($id, $data);
    }

    public function postOracao($data) {
        return $this->oracao->post( $data);
    }

    public function deleteOracao($id) {
        return $this->oracao->delete($id);
    }
}
