<?php
require_once __DIR__ . '/../config/cors.php';
require_once '../config/db.php';
require_once '../controllers/TercoController.php';

include 'cors.php';

//define o cabeçalho para retornar json
header('Content-Type: application/json');

try{
    //instancia o controlador
    $tercoController = new TercoController();

    //requisição get
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        $terco = $tercoController->getTerco();
        echo json_encode([
            'status' => 'success',
            'data' => $terco
        ]);
    } else{
        echo json_encode([
            'status' => 'error',
            'message'=> 'Método não suportado'
        ]);
    }
} catch (Exception $e) {
    echo json_encode([
        'status'=> 'error',
        'message'=> 'Erro ao obter orações: ' . $e -> getMessage()
    ]);
}