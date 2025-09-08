<?php
include(__DIR__ . '/../config/cors.php');

header('Content-Type: application/json');


try {

    switch($_SERVER['REQUEST_METHOD']){
        case 'POST':
            // Código para fazer o upload da imagem
            if (isset($_FILES['file'])) {
                $file = $_FILES['file'];
                // Definindo o diretório para salvar as imagens
                $uploadDirectory = __DIR__ . '/../uploads/paroquia/'; // Caminho absoluto para a pasta de uploads
                
                // Verifica se o diretório existe
                if (!is_dir($uploadDirectory)) {
                    mkdir($uploadDirectory, 0777, true); // Cria o diretório se não existir
                }
        
                $fileName = basename($file['name']);
                $targetFile = $uploadDirectory . $fileName;
        
                // Faz o upload
                if (move_uploaded_file($file['tmp_name'], $targetFile)) {
                    // Sucesso
                    echo json_encode([
                        'status' => 'success',
                        'data' => ['fileName' => $fileName], // Retorna o nome do arquivo carregado
                        'message'=> 'Imagem enviada com sucesso'
                    ]);
                } else {
                    // Falha no upload
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
            break;
        case 'DELETE':
            $input = json_decode(file_get_contents('php://input'), true);

            if(isset($input['fileName'])){
                $deleteFile = __DIR__ . '/../uploads/paroquia/' . basename($input['fileName']);

                if(file_exists($deleteFile)){
                unlink($deleteFile);
                echo json_encode([
                    'status'=> 'success',
                    'message'=> 'Imagem deletada com sucesso.'
                ]);
                } else{
                echo json_encode([
                    'status'=> 'error',
                    'message'=> 'Imagem não encotrada.'
                ]);
            }
            }else{
                echo json_encode([
                    'status'=> 'error',
                    'message'=> 'Nome do arquivo não fornecido.'
                ]);
            }

    }
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro ao processar o upload: ' . $e->getMessage()
    ]);
}