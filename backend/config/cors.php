<?php

// Configurações de CORS
$allowed_origin = 'http://localhost:5173';
$any_origin = '*';

// Se a requisição for de um método GET ou OPTIONS, permite qualquer origem
if ($_SERVER['REQUEST_METHOD'] === 'GET' || $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: ' . $any_origin); // Permite qualquer origem para GET e OPTIONS
} else {
    header('Access-Control-Allow-Origin: ' . $allowed_origin); // Permite apenas o site para outros metodos
}

// Métodos permitidos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Cabeçalhos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Responder automaticamente a requisições OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit();
}
