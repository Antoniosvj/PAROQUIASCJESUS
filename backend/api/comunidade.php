<?php
require_once __DIR__ . '/../config/cors.php';
require_once '../config/db.php';
require_once '../controllers/ComunidadeController.php';

include'cors.php';

//define o cabeçalho como json
header('Content-Type: application/json');

try{
    //instanciar o controlador
    $comunidadeController = new ComunidadeController();

    //requisição get
    if($_SERVER['REQUEST_METHOD'] === 'GET'){
        $comunidades = $comunidadeController->getComunidades();
        echo json_encode([
            'status'=> 'success',
            'data' => $comunidades
        ]);
    }elseif($_SERVER['REQUEST_METHOD'] ==='POST'){
        $input = json_decode(file_get_contents('php://input'), true);

        if(isset($input['nome'], $input['descricao'], $input['fachada'], $input['inicioComunidade'], $input['imagemAltar'], $input['mapaUrl'])){
            $data = [
                'nome'=> $input['nome'],
                'descricao'=> $input['descricao'],
                'fachada'=> $input['fachada'],
                'inicioComunidade'=> $input['inicioComunidade'],
                'imagemAltar'=> $input['imagemAltar'],
                'mapaUrl'=> $input['mapaUrl']
            ];

            $comunidadeController->postComunidade($data);
            echo json_encode([
                'status'=> 'success',
                'message'=> 'Comunidade adicionada com sucesso'
            ]);
        }else{
            echo json_encode([
                'status'=> 'error',
                'message'=> 'Erro ao adicionar comunidade'
            ]);
        }

    }elseif($_SERVER['REQUEST_METHOD'] === 'PUT'){
        $input = json_decode(file_get_contents('php://input'), true);
        if(isset($input['id'],$input['nome'], $input['descricao'], $input['fachada'], $input['inicioComunidade'], $input['imagemAltar'], $input['mapaUrl'])){
            $id = $input['id'];
            $data = [
                'nome'=> $input['nome'],
                'descricao'=> $input['descricao'],
                'fachada'=> $input['fachada'],
                'inicioComunidade'=> $input['inicioComunidade'],
                'imagemAltar'=> $input['imagemAltar'],
                'mapaUrl'=> $input['mapaUrl']
            ];
            // Atualizar a comunidade
        $comunidadeController->updateComunidade($id, $data);

            echo json_encode([
                'status' => 'success',
                'message' => 'Comunidade atualizada com sucesso.'
            ]);

    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Falha ao atualizar comunidade.',
        ]);
    }
    }elseif($_SERVER['REQUEST_METHOD'] === 'DELETE'){
        $input = json_decode(file_get_contents('php://input') , true);
        if(isset($input['id'])){
            $id = $input['id'];
            $comunidadeController->deleteComunidade($id);
            echo json_encode([
                'status'=> 'success',
                'message'=> 'Comunidade deletada com sucesso.'
            ]);
        } else{
            echo json_encode([
                'status'=> 'error',
                'message'=> 'Erro ao deletar comunidade: Id não encontrado.'
            ]);
        }

    } else{
        echo json_encode([
            'status'=> 'error',
            'message'=> 'Metodo não suportado'
        ]);
    }

} catch (Exception $e) {

    echo json_encode([
        'error'=> 'Error',
        'message'=> 'Erro ao obter Comunidades: ' . $e->getMessage()
    ]);
}