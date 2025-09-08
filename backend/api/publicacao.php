<?php
require_once __DIR__ . '/../config/cors.php';
require_once "../config/db.php";
require_once "../controllers/publicacaoController.php";

include 'cors.php';

header("Content-Type: application/json");

try {
    // Instancia o controlador
    $publicacaoController = new publicacaoController();

    // GET
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $publicacao = $publicacaoController->getPublicacao();
        echo json_encode([
            'status' => 'success',
            'data' => $publicacao,
        ]);
    } 
    // POST
    else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_FILES['file'])) {
            $file = $_FILES['file'];
            $uploadDirectory = __DIR__ . '/../uploads/publicacao/';
    
            if (!is_dir($uploadDirectory)) {
                mkdir($uploadDirectory, 0777, true);
            }
    
            $fileName = basename($file['name']);
            $targetFile = $uploadDirectory . $fileName;
    
            if (move_uploaded_file($file['tmp_name'], $targetFile)) {
                $data = ['imagem' => $fileName];
                $publicacaoController->postPublicacao($data);
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Publicação adicionada com sucesso',
                    'data' => $data
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Erro ao fazer upload da imagem.'
                ]);
            }
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Arquivo não enviado.'
            ]);
        }
    }
    
    // PUT
    else if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['id'], $input['imagem'])) {
            $id = $input['id'];
            $data = ['imagem' => $input['imagem']];

            // Exclui o arquivo anterior se existir
            $publicacao = $publicacaoController->getPublicacaoById($id);
            if ($publicacao && isset($publicacao['imagem'])) {
                $previousFile = __DIR__ . '/../uploads/publicacao/' . $publicacao['imagem'];
                if (file_exists($previousFile)) {
                    unlink($previousFile);
                }
            }

            $publicacaoController->updatePublicacao($id, $data);
            echo json_encode([
                'status' => 'success',
                'message' => 'Publicacao atualizada com sucesso'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Parametros insuficientes'
            ]);
        }
    } 
    // DELETE
    // DELETE para excluir a última publicação sem adicionar outra
else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $lastPublicacao = $publicacaoController->getLastPublicacao();

    if ($lastPublicacao) {
        if ($publicacaoController->deletePublicacao($lastPublicacao['id'])) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Publicação deletada com sucesso.'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Erro ao deletar publicação.'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Nenhuma publicação encontrada para excluir.'
        ]);
    }
}

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro ao obter publicacao: ' . $e->getMessage()
    ]);
}