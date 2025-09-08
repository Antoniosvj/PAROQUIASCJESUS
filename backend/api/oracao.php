<?php
require_once __DIR__ . '/../config/cors.php';
require_once '../config/db.php';
require_once '../controllers/OracaoController.php';


//define o cabeçalho para retornar json
header('Content-Type: application/json');

try{
    //instancia o controlador
    $oracaoController = new OracaoController();

    //requisição get
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        $oracoes = $oracaoController->getOracoes();
        echo json_encode([
            'status' => 'success',
            'data' => $oracoes
        ]);
    } elseif($_SERVER['REQUEST_METHOD'] === 'PUT'){
        //atualiza uma oração com base no ID
        $input = json_decode(file_get_contents('php://input'), true);

        if(isset($input['id'], $input['titulo'], $input['oracao'])){
            $id = $input['id'];
            $data = [
            'titulo' => $input['titulo'],
            'oracao' => $input['oracao'],
            ];
            
            if($oracaoController->updateOracao($id, $data)){
                echo json_encode([
                    'status'=> 'success',
                    'message' => 'Oracao atualizada com sucesso.'
                ]);
            } else {
                echo json_encode([
                    'status'=> 'error',
                    'message'=> 'Falha ao atualizar a oração'
                ]);
            }
        }else{
            echo json_encode([
                'status'=> 'error',
                'message' => 'Parametros insuficientes: id, titulo e oracao são obrigatorios'
            ]);
        };
    }elseif($_SERVER['REQUEST_METHOD'] === 'POST'){
        $input = json_decode(file_get_contents('php://input'), true);
        if(isset($input['titulo'], $input['oracao'])){
            $data = [
                'titulo' => $input['titulo'],
                'oracao' => $input['oracao'],
                ];
        } else{
            echo json_encode([
                'status'=> 'error',
                'message'=> 'Erro ao adicionar oração'
            ]);
        }

        if($oracaoController->postOracao($data)){
            echo json_encode([
                'status'=> 'success',
                'message' => 'Oracao adicionada com sucesso.'
                ]);
        } else {
            echo json_encode([
                'status'=> 'error',
                'message'=> 'Falha ao adicionar a oração'
            ]);
        }
    }elseif($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        $input = json_decode(file_get_contents('php://input'), true);

        //verifica se o id esta presente
        if(isset($input['id'])){
            $id = $input['id'];
                
            if($oracaoController->deleteOracao($id)){
                echo json_encode([
                    'status'=> 'success',
                    'message'=> 'Oração deletada com sucesso.'
                ]);
            } else {
                echo json_encode([
                    'status'=> 'error',
                    'message'=> 'Falha ao deletar oração'
                ]);
            }
        } else {
            echo json_encode([
                'status'=> 'error',
                'message'=> 'Erro ao deletar oração: ID ausente'
            ]);
        }

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