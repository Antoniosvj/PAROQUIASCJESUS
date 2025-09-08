<?php

class Devocao {
    private $db;

    public function __construct($db) {
        $this->db = $db;
    }

    // Método para obter todas as devoções
    public function getAll() {
        $stmt = $this->db->query("SELECT * FROM devocoes");
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Método para adicionar uma nova devoção
    public function post($data) {
        $stmt = $this->db->prepare("INSERT INTO devocoes (titulo, subtitulo, devocao, font) VALUES (:titulo, :subtitulo, :devocao, :font)");
        $stmt->bindParam(":titulo", $data['titulo']);
        $stmt->bindParam(':subtitulo', $data['subtitulo']);
        $stmt->bindParam('devocao', $data['devocao']);
        $stmt-> bindParam('font', $data['font']);

        if ($stmt->execute()) {
            return 'Devoção adicionada com sucesso';
        } else {
            return 'Falha ao adicionar devoção';
        }
    }

    // Método para atualizar uma devoção
    public function update($id, $data) {
        $stmt = $this->db->prepare('UPDATE devocoes SET titulo=:titulo, subtitulo=:subtitulo, devocao=:devocao, font=:font WHERE id=:id');
        $stmt->bindParam(':id', $id);
        $stmt->bindParam(':titulo', $data['titulo']);
        $stmt->bindParam(':subtitulo', $data['subtitulo']);
        $stmt->bindParam(':devocao', $data['devocao']);
        $stmt->bindParam(':font', $data['font']);

        if ($stmt->execute()) {
            return 'Devoção atualizada com sucesso';
        } else {
            return 'Falha ao atualizar devoção';
        }
    }

    // Método para verificar se uma devoção existe pelo ID
    public function exists($id) {
        $stmt = $this->db->prepare('SELECT COUNT(*) FROM devocoes WHERE id = :id');
        $stmt->bindParam(':id', $id);
        $stmt->execute();

        return $stmt->fetchColumn() > 0;  // Retorna true se o ID existir
    }

    // Método para deletar uma devoção pelo ID
    public function delete($id) {
        $stmt = $this->db->prepare('DELETE FROM devocoes WHERE id = :id');
        $stmt->bindParam(':id', $id);

        return $stmt->execute();  // Retorna true se a exclusão for bem-sucedida
    }
}
