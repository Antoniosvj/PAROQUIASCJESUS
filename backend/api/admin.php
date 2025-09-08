<?php
require_once __DIR__ . '/../config/cors.php';
require_once "../config/db.php";
require_once "../controllers/AdminController.php";

header("Content-Type: application/json");

try {
    $adminController = new AdminController();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        error_log(print_r($input, true)); // Registra a entrada no log para depuração
        
        // Verifique se todos os parâmetros necessários estão presentes
        if (isset($input['nome'], $input['email'], $input['senha'], $input['isAdmin'])) {
            $data = [
                'nome' => $input['nome'],
                'email' => $input['email'],
                'senha' => $input['senha'], // Deixe o hash para o modelo
                'isAdmin' => $input['isAdmin'] // Capture o valor do checkbox
            ];

            // Chame o método correto para criar o administrador
            $message = $adminController->createAdmin($data);
            echo json_encode([
                'status' => 'success',
                'message' => $message
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Parâmetros insuficientes para criar administrador'
            ]);
        }
    } else if($_SERVER['REQUEST_METHOD'] === 'PUT'){
        $input = json_decode(file_get_contents('php://input'), true);
        error_log(print_r($input, true));

        if (isset($input['nome'], $input['email'], $input['isAdmin'])) {
            $data = [
                'nome' => $input['nome'],
                'email' => $input['email'],
                'isAdmin' => $input['isAdmin']
            ];

            // Chame o método correto para criar o administrador
            $message = $adminController->editAdmin($data);
            echo json_encode([
                'status' => 'success',
                'message' => $message
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Parâmetros insuficientes para editar administrador'
            ]);
        }
    }else if($_SERVER['REQUEST_METHOD'] === 'GET'){
        $usuarios = $adminController->getAdmin();
        echo json_encode([
            'status' => 'success',
            'data'=> $usuarios
        ]);
    }else if($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        $input = json_decode(file_get_contents('php://input'), true);
        error_log(print_r($input, true)); // Registra a entrada no log para depuração
        
        if(isset($input['id'])){
            $id = $input['id'];
            $message = $adminController->deleteAdmin($id);
            echo json_encode([
                'status' => 'success',
                'message'=> $message
            ]);
        } else{
            echo json_encode([
                'status'=> 'error',
                'message' => 'Erro ao deletar usuário'
            ]);
        }

    }else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Método não suportado'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro ao cadastrar administrador: ' . $e->getMessage()
    ]);
}
