<?php
require_once '../config/db.php';
require_once '../models/publicacao.php';

class publicacaoController{
    private $publicacao;

    public function __construct(){
        $db = getDBConnection();
        $this->publicacao = new Publicacao($db);
    }

    public function getpublicacao(){
        return $this->publicacao->getAll();
    }
    
    public function postPublicacao($data){
        // Obtém a publicação atual para excluir
        $publicacaoAtual = $this->publicacao->getLast();
    
        if ($publicacaoAtual) {
            // Remove o arquivo de imagem antigo
            $uploadDirectory = __DIR__ . '/../uploads/publicacao/';
            $oldFile = $uploadDirectory . $publicacaoAtual['imagem'];
    
            if (file_exists($oldFile)) {
                unlink($oldFile);
            }
    
            // Remove a publicação do banco
            $this->publicacao->deleteById($publicacaoAtual['id']);
        }
    
        // Insere a nova publicação
        return $this->publicacao->post($data);
    }
    
    
    public function updatepublicacao($id, $data){
        return $this->publicacao->update($id, $data);
    }
    
    public function deletePublicacao($id){
        if ($this->publicacao->exists($id)){
            if($this->publicacao->deleteById($id)){
                return true;
            } else {
                return false;
            }
        } else{
            return false;
        }
    }

    public function getLastPublicacao(){
        return $this->publicacao->getLast();
    }
    

}

