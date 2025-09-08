<?php
require_once __DIR__ . '/../config/cors.php';
require_once '../config/db.php';
require_once '../controllers/PalavraPastorController.php';

include 'cors.php'; 

//define o cabeçalho
header("Content-Type: application/json");

try{
    //intancia o controlador
    $palavraControler = new PalavraPastorController();

    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        $palavra = $palavraControler ->getPalavra();
        echo json_encode([
            'status' => 'success',
            'data' => $palavra
        ]);
    }elseif($_SERVER['REQUEST_METHOD'] === 'POST'){
    
    }elseif($_SERVER['REQUEST_METHOD'] === 'PUT'){
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['id'], $input['titulo'], $input['texto'], $input['padre'], $input['foto'])) {
            $id = $input['id'];
            $data = [
                'titulo' => $input['titulo'],
                'texto' => $input['texto'],
                'padre' => $input['padre'],
                'foto' => $input['foto'],
            ];

            $palavraControler->updatePalavra($id, $data);

            echo json_encode([
                'status' => 'success',
                'message' => 'Devoção atualizada com sucesso'
            ]);
        } else{
            echo json_encode([
                'status' => 'error',
                'message' => 'Erro ao atualizar a palavra'
            ]);
        }

    }elseif($_SERVER['REQUEST_METHOD'] === 'DELETE'){
    } else{
        echo json_encode([
            'status'=> 'error',
            'message'=> 'Metodo não suportado'
        ]);
    }
} catch(Exception $e){
    echo json_encode([
        'status'=> 'Error',
        'message'=> 'Erro ao obter a palavra' . $e->getMessage()
    ]);
}