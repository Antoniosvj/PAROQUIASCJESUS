<?php

class Comunidade{
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    //retornar todas as comunidades
    public function getAll(){
        $stmt = $this->db->query("SELECT * FROM comunidades");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function post($data){
        $stmt = $this->db->prepare("INSERT INTO comunidades (nome, descricao, fachada, inicioComunidade, imagemAltar, mapaUrl) VALUES (:nome, :descricao, :fachada, :inicioComunidade, :imagemAltar, :mapaUrl)");
        $stmt->bindParam(':nome', $data['nome']);
        $stmt->bindParam(':descricao', $data['descricao']);
        $stmt->bindParam(':fachada', $data['fachada']);
        $stmt->bindParam(':inicioComunidade', $data['inicioComunidade']);
        $stmt->bindParam(':imagemAltar', $data['imagemAltar']);
        $stmt->bindParam(':mapaUrl', $data['mapaUrl']);

        $stmt->execute();
    }

    public function update($id, $data) {
        $stmt = $this->db->prepare("UPDATE comunidades SET nome=:nome, descricao=:descricao, fachada=:fachada, inicioComunidade=:inicioComunidade, imagemAltar=:imagemAltar, mapaUrl=:mapaUrl WHERE id=:id");
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":nome", $data["nome"]);
        $stmt->bindParam(":descricao", $data["descricao"]);
        $stmt->bindParam(":fachada", $data["fachada"]);
        $stmt->bindParam(":inicioComunidade", $data["inicioComunidade"]);
        $stmt->bindParam(":imagemAltar", $data["imagemAltar"]);
        $stmt->bindParam(":mapaUrl", $data["mapaUrl"]);
    
        // Log dos dados recebidos
        error_log("ID recebido: " . $id);
        error_log("Dados recebidos: " . print_r($data, true));
    
        if ($stmt->execute()) {
            return [
                'status' => 'success',
                'message' => 'Comunidade editada com sucesso'
            ];
        } else {
            error_log("Erro ao executar a query: " . print_r($stmt->errorInfo(), true));
            return [
                'status' => 'error',
                'message' => 'Falha ao editar comunidade',
                'errorInfo' => $stmt->errorInfo()
            ];
        }
    }

    public function delete($id){
        $stmt = $this->db->prepare("DELETE FROM comunidades WHERE id=:id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
    }
}