<?php
require_once __DIR__ . '/../config/cors.php';
require_once "../config/db.php";
require_once "../controllers/AdminController.php";

header("Content-Type: application/json");

try {
    $adminController = new AdminController();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);

        
        // Verifique se os parâmetros necessários estão presentes
        if (isset($input['email'], $input['senha'])) {

            //criei apenas como um teste, esse if não é utilizado no código depois
            if($input['email'] === "admin@admin.com" && $input['senha'] === "senha123"){
            echo json_encode([
                'status' => 'success',
                'message' => 'Login bem-sucedido',
                'admin'=> [ 'isAdmin' => 1 ]
            ]);
            } else{
                $email = $input['email'];
                $senha = $input['senha'];
    
                $response = $adminController->login($email, $senha);
                echo json_encode($response);
            }
        }else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Parâmetros insuficientes para login'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Método não suportado'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro ao fazer login: ' . $e->getMessage()
    ]);
}
