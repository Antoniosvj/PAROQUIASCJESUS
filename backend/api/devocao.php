<?php
require_once __DIR__ . '/../config/cors.php';
require_once "../config/db.php";
require_once "../controllers/DevocaoController.php";

include'cors.php';

// Define o cabeçalho para retornar JSON
header("Content-Type: application/json");

try {
    // Instancia o controlador
    $devocaoController = new DevocaoController();

    // Requisição GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $devocoes = $devocaoController->getDevocoes();
        echo json_encode([
            'status' => 'success',
            'data' => $devocoes
        ]);
    }
    // Requisição POST
    elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['titulo'], $input['subtitulo'], $input['devocao'], $input['font'])) {
            $data = [
                'titulo' => $input['titulo'],
                'subtitulo' => $input['subtitulo'],
                'devocao' => $input['devocao'],
                'font' => $input['font']
            ];
            $devocaoController->postDevocao($data);
            echo json_encode([
                'status' => 'success',
                'message' => 'Devoção adicionada com sucesso'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Erro ao adicionar devoção'
            ]);
        }
    }
    // Requisição PUT
    elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['id'], $input['titulo'], $input['subtitulo'], $input['devocao'], $input['font'])) {
            $id = $input['id'];
            $data = [
                'titulo' => $input['titulo'],
                'subtitulo' => $input['subtitulo'],
                'devocao' => $input['devocao'],
                'font' => $input['font'],
            ];
            
            // Chama o método de atualização
            $devocaoController->updateDevocao($id, $data);

            echo json_encode([
                'status' => 'success',
                'message' => 'Devoção atualizada com sucesso.'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Parâmetros insuficientes'
            ]);
        }
    }
    // Requisição DELETE
    elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $input = json_decode(file_get_contents('php://input'), true);

        // Verifica se o ID está presente
        if (isset($input['id'])) {
            $id = $input['id'];

            // Tenta deletar a devoção
            if ($devocaoController->deleteDevocao($id)) {
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Devoção deletada com sucesso.'
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Falha ao deletar devoção: ID não encontrado ou falha ao remover.'
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
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro ao obter devoções: ' . $e->getMessage()
    ]);
}
