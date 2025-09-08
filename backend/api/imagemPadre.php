<?php

require_once __DIR__ . '/../config/cors.php';
require_once "../config/db.php";

include 'cors.php';

header("Content-Type: application/json");

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_FILES['file'])) {
            $file = $_FILES['file'];
            $uploadDirectory = __DIR__ . '/../uploads/palavra/';

            if (!is_dir($uploadDirectory)) {
                mkdir($uploadDirectory, 0777, true);
            }

            $fileName = basename($file['name']);
            $targetFile = $uploadDirectory . $fileName;

            if (move_uploaded_file($file['tmp_name'], $targetFile)) {
                $data = ['fileName' => $fileName];
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Imagem adicionada com sucesso',
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
    } else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['fileName'])) {
            $deleteFile = __DIR__ . '/../uploads/palavra/' . basename($input['fileName']);
            if (file_exists($deleteFile)) {
                unlink($deleteFile);
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Arquivo deletado com sucesso.'
                ]);
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Arquivo não encontrado.'
                ]);
            }
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Nome do arquivo não fornecido.'
            ]);
        }
    }
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro ao processar a requisição: ' . $e->getMessage()
    ]);
}