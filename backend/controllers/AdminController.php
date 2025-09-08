<?php
require_once '../config/db.php';
require_once '../models/Admin.php';

class AdminController {
    private $admin;

    public function __construct() {
        $db = getDBConnection();
        $this->admin = new Admin($db);
    }

    // Método para criar um novo administrador
    public function createAdmin($data) {
        return $this->admin->create($data);
    }

    // Método para autenticar um administrador
    public function login($email, $senha) {
        return $this->admin->login($email, $senha);
    }

    public function getAdmin(){
        return $this->admin->getAll();
    }

    public function deleteAdmin($id){
        return $this->admin->delete($id);
    }

    public function editAdmin($data){
        return $this->admin->editar($data);
    }
}
