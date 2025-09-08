<?php
require_once __DIR__ . '/../config/cors.php';
require_once '../config/db.php';
require_once '../controllers/ParoquiaController.php';

// Define o cabeçalho para retornar JSON
header('Content-Type: application/json');

// Instancia o controlador da paróquia
$paroquiaController = new ParoquiaController();

// Obtém o método HTTP da requisição
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Requisição GET: Obter dados da paróquia
        try {
            $paroquia = $paroquiaController->getParoquia();
            if ($paroquia) {
                echo json_encode([
                    'status' => 'success',
                    'data' => $paroquia
                ]);
                http_response_code(200);  // Sucesso
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Nenhum dado encontrado para a paróquia.'
                ]);
                http_response_code(404);  // Não encontrado
            }
        } catch (Exception $e) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Erro ao obter os dados da paróquia: ' . $e->getMessage()
            ]);
            http_response_code(500);  // Erro interno do servidor
        }
        break;

    case 'PUT':
        // Requisição PUT: Atualizar dados da paróquia
        try {
            // Recebe os dados da requisição
            $input = json_decode(file_get_contents('php://input'), true);

            // Verifica se todos os campos necessários estão presentes
            if (
                isset($input['texto1'],
                      $input['foto1'], $input['historia1'], $input['foto2'], $input['historia2'])
            ) {
                // Prepara os dados para atualização
                $data = [
                    'texto1' => $input['texto1'],
                    'foto1' => $input['foto1'],
                    'historia1' => $input['historia1'],
                    'foto2' => $input['foto2'],
                    'historia2' => $input['historia2']
                ];

                // Atualiza os dados no banco de dados
                $paroquiaController->updateParoquia($data);

                echo json_encode([
                    'status' => 'success',
                    'message' => 'Paróquia atualizada com sucesso.'
                ]);
                http_response_code(200);  // Sucesso
            } else {
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Dados incompletos para atualizar a paróquia. Verifique todos os campos.'
                ]);
                http_response_code(400);  // Bad Request
            }
        } catch (Exception $e) {
            echo json_encode([
                'status' => 'error',
                'message' => 'Erro ao atualizar a paróquia: ' . $e->getMessage()
            ]);
            http_response_code(500);  // Erro interno do servidor
        }
        break;

    default:
        // Método não suportado
        echo json_encode([
            'status' => 'error',
            'message' => 'Método não suportado.'
        ]);
        http_response_code(405);  // Método não permitido
        break;
}
