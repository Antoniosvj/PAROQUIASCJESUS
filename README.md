# PARÓQUIAS CJESUS

Este repositório contém o código-fonte de um sistema para gestão da identidade visual paroquial, desenvolvido para facilitar a administração da pastoral de comunicação, o cadastro de administradores e a comunicação com a comunidade.

## Tecnologias Utilizadas

O projeto foi construído com as seguintes tecnologias e bibliotecas:

* **Frontend**:
    * **React**: Biblioteca JavaScript para construção de interfaces de usuário.
    * **Vite**: Ferramenta de build que proporciona um ambiente de desenvolvimento rápido.
    * **React Router DOM**: Para gerenciamento de rotas e navegação na aplicação.
    * **Axios**: Cliente HTTP para fazer requisições à API do backend.
    * **React Device Detect**: Para detecção de tipo de dispositivo (desktop, mobile).
    * **Vite Plugin PWA**: Para transformar a aplicação em uma Progressive Web App (PWA).

* **Backend**: 
    * **PHP**: Linguagem de programação para o lado servidor.
    * **PDO**: PHP Data Objects -> é uma camada de abstração que permite a conecção com o banco de dados.

* **Banco de Dados**:
    * **MySql**: Sistema de gerenciamento de banco de dados relacional (SGBDR).

## Estrutura do Projeto

O repositório está organizado em três pastas principais para separar as responsabilidades do frontend, backend e banco de dados:

* `frontend/`: Contém todo o código da interface de usuário em React.
* `backend/`: Contém o código do servidor e da API.
* `database/`: Contém os scripts e arquivos relacionados ao banco de dados.

## Como Executar e Testar o Projeto

Siga os passos abaixo para rodar a aplicação localmente no seu computador.

### Passo 1: Pré-requisitos

Primeiro, você precisa instalar o ambiente de desenvolvimento. A maneira mais fácil é usar um pacote que já inclui tudo:

1. Instale o PHP:
    * https://www.php.net

    ou

    * XAMPP: [https://www.apachefriends.org/pt_br/index.html]

    * WAMPP: [https://www.wampserver.com/]

    * MAMP: [https://www.mamp.info/]

2. Instale o Node.js e o NPM:
    * Baixe e instale a versão LTS recomendada aqui: https://nodejs.org/pt-br/

    * A instalação do Node.js já inclui o NPM.

### Passo 2: Configuração do Ambiente

1.  Clone este repositório para a sua máquina local usando o terminal:

    ```bash
    git clone [https://github.com/Antoniosvj/PAROQUIASCJESUS.git](https://github.com/Antoniosvj/PAROQUIASCJESUS.git)
    ```

2.  Navegue para a pasta do projeto:

    ```bash
    cd PAROQUIASCJESUS
    ```

### Passo 3: Configuração do Backend (PHP)

    * Opção1:

    1. Entre na pasta backend pelo terminal.

    ```bash
    cd backend
    ```

    2. Execute o seguinte comando.

    ```bash
    php -S localhost:8000
    ```

### Passo 4: Configuração do Bando de Dados
    1. Acesse o phpMyAdmin no seu navegador para gerenciar o banco de dados (geralmente em http://localhost/phpmyadmin).

    2. Crie um novo banco de dados com o nome paroquia.

    3. Importe o arquivo .sql que está na pasta database/ para o banco de dados que você acabou de criar.


### Passo 5: Configuração do Frontend

    1.  Navegue para a pasta do frontend:

    ```bash
    cd frontend
    ```
    Obs.: Como é um ambiente apenas de teste eu optei por deixar o arquivo.env, porém não é uma pratica comum em projetos.

        2.  Execute o comando, para instalar as dependencias.

    ```bash
    npm install
    ```
    3. Execute o comando para acessar 

    ``` bash
    npm run dev
    ```

    obs.: a aplicação irá rodar em: http://localhost:5173

    email de teste: admin@admin.com
    senha: senha123

## Contribuindo

Contribuições são bem-vindas! Se você encontrar um bug ou tiver uma sugestão de melhoria, sinta-se à vontade para abrir uma *issue* ou enviar um *pull request*.