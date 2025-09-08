<?php
include(__DIR__ . '/../config/cors.php');
header("Content-Type: application/json");

try{
    if($_SERVER['REQUEST_METHOD'] === 'POST'){
        if (empty($_FILES['file']) || empty($_POST['id'])) {
            echo json_encode(['status' => 'error', 'message' => 'Arquivo ou ID não informado.']);
            exit;
        }

        $id = $_POST['id'];
        $file = $_FILES['file'];
        
        //diretorio para upload
        $uploadDirectory = __DIR__ . "/../uploads/comunidades/" . $id . "/";
        
        //verificando se o diretorio existe
        if(!is_dir($uploadDirectory)){
            mkdir($uploadDirectory, 0777, true);
        }

        
            $fileName = basename($file['name']);
            $targetFile = $uploadDirectory . $fileName;

            if(move_uploaded_file($file['tmp_name'], $targetFile)){
                echo json_encode([
                    'status' => 'success',
                    'message' => 'Imagem enviada com sucesso.',
                    'fileName' => $fileName,
                ]);
            } else{
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Erro ao fazer upload de imagem',
                ]);
            }
        
        
        } else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $input = json_decode(file_get_contents('php://input'), true);
        
            if (!isset($input['id'])) {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'ID não fornecido.',
                ]);
                exit;
            }
        
            $id = $input['id'];
            $fileName = $input['fileName'] ?? '';
        
            if ($fileName) {
                $filePath = __DIR__ . "/../uploads/comunidades/" . $id . "/" . basename($fileName);
        
                if (file_exists($filePath)) {
                    unlink($filePath);
                    echo json_encode([
                        'status' => 'success',
                        'message' => 'Imagem deletada com sucesso.',
                    ]);
                } else {
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'Imagem não encontrada.',
                    ]);
                }
            } else {
                echo json_encode([
                    'status' => 'warning',
                    'message' => 'Nenhuma imagem foi enviada para esta comunidade.',
                ]);
            }
        }
        
} catch (Exception $e){
    echo json_encode([
        'status' => 'error',
        'message'=> 'erro ao processar a requisição: ' . $e->getMessage(),
    ]);
}