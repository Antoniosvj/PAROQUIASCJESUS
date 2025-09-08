<?php
require_once __DIR__ . '/../config/cors.php';
require_once "../config/db.php";
require_once "../controllers/AcoesController.php";

include 'cors.php';

header("Content-Type: application/json");

try{
    //instancia o controlador
    $acaoController = new AcoesController();

    //get
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        $acoes = $acaoController->getAcoes();
        echo json_encode([
            'status'=> 'success',
            'data'=> $acoes,
        ]);
    } 
    
    else if($_SERVER['REQUEST_METHOD'] === 'POST'){
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['foto'], $input['titulo'], $input['texto'])){
            $data = [
                'foto'=> $input['foto'],
                'titulo'=> $input['titulo'],
                'texto'=> $input['texto']
            ];
            $acaoController->postAcao($data);
            echo json_encode([
                'status'=> 'success',
                'message'=> 'Ação adicionada com sucesso'    
            ]);
        } else {
            echo json_encode([
                'status'=> 'error',
                'message'=> 'Erro ao adicionar Ação'
            ]);
        }
    }
    
    else if($_SERVER['REQUEST_METHOD'] === 'PUT'){
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['id'], $input['foto'], $input['titulo'], $input['texto'])){
            $id = $input['id'];
            $data = [
                'foto'=> $input['foto'],
                'titulo'=> $input['titulo'],
                'texto'=> $input['texto']
            ];
            $acaoController->updateAcao($id, $data);
            echo json_encode([
                'status'=> 'success',
                'message'=> 'Ação atualizada com sucesso'    
            ]);
        } else {
            echo json_encode([
                'status'=> 'error',
                'message'=> 'Parametros insuficientes'
            ]);
        }
        
    }
    
    else if ($_SERVER['REQUEST_METHOD'] ==='DELETE'){
        $input = json_decode(file_get_contents('php://input'), true);

        // Verifica se o ID está presente
        if (isset($input['id'])) {
            $id = $input['id'];

            // Tenta deletar a devoção
            if ($acaoController->deleteAcao($id)) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Ação deletada com sucesso.'
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Falha ao deletar ação: ID não encontrado ou falha ao remover.'
                ]);
            }
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Erro ao deletar devoção: ID ausente.'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Método não suportado'
        ]);
    }
} catch (Exception $e){
    echo json_encode([
        'status' => 'error',
        'message'=> 'Erro ao obter ações: ' . $e->getMessage()
    ]);
}