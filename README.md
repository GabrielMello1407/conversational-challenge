# FURIA Chat - Fã Interativo

## Descrição

O **FURIA Chat** é uma aplicação de chat interativo desenvolvida para os fãs do time de CS2 da FURIA. Utilizando a tecnologia de IA do **Google Gemini**, o projeto visa criar uma experiência única para os torcedores interagirem com a equipe, tirarem dúvidas sobre o time, acompanhar o status de jogos, e muito mais.

Este projeto foi desenvolvido como parte do **Challenge #1: Experiência Conversacional [NORMAL]**, com o objetivo de criar um caso de uso conversacional que engaja os fãs da FURIA, proporcionando uma comunicação dinâmica e personalizada com a IA.

## Funcionalidades

- **Interação em tempo real**: O chat permite aos fãs interagir com uma IA que responde perguntas sobre o time de CS da FURIA, seus jogadores, resultados de partidas e curiosidades.
- **Personalização de resposta**: A IA foi treinada para responder com a personalidade da FURIA, utilizando uma linguagem empolgante, enérgica e característica da equipe.
- **Histórico de mensagens**: As conversas são salvas localmente para que os usuários possam revisar o histórico de interações.
- **Responsividade**: A interface foi desenvolvida para ser responsiva, proporcionando uma boa experiência tanto em desktop quanto em dispositivos móveis.

## Objetivo do Projeto

O projeto tem como objetivo proporcionar uma experiência de fã imersiva e interativa com o time da FURIA, permitindo aos torcedores acompanhar o time, fazer perguntas, interagir em tempo real e obter informações de forma dinâmica.

## Tecnologias Utilizadas

- **Next.js**: Framework utilizado para o desenvolvimento da aplicação.
- **Google Gemini**: API de IA usada para gerar respostas interativas e engajantes.
- **Tailwind CSS**: Framework CSS para estilização da aplicação.
- **LocalStorage**: Para salvar o histórico de chat do usuário.

## Como Rodar o Projeto

1. **Clonar o repositório**

   ```bash
   git clone https://github.com/usuario/furia-chat.git
   
## Instalar as dependências

2. **Navegue até o diretório do projeto e execute o comando:**

````bash
cd furia-chat
npm install
````
## Configurar a chave da API do Gemini

Crie um arquivo .env.local na raiz do projeto e adicione sua chave da API do Google Gemini:

`````bash
NEXT_PUBLIC_GEMINI_API_KEY=SuaChaveDeAPI
`````
## Rodar a aplicação

Para rodar a aplicação em desenvolvimento, execute o comando:

`````bash
npm run dev
`````
A aplicação estará disponível em **http://localhost:3000**.

## Desafio
Este projeto foi desenvolvido como parte do Challenge #1: Experiência Conversacional [NORMAL]. O objetivo do desafio era criar um caso de uso conversacional que proporcionasse aos fãs da FURIA uma forma divertida e envolvente de interagir com o time e acompanhar o que está acontecendo no universo do CS2.

Proposta:
Criar um chat interativo para os fãs da FURIA.

Permitir interações dinâmicas com a IA sobre o time e seus jogadores.

Integrar a experiência com a API do Google Gemini para respostas personalizadas.

Ideias Inspiradoras
Simulador de conversa de torcida: Um chat que imita a conversa e as emoções da torcida durante as partidas.

Live status de jogos: Um chat que atualiza os fãs com o status ao vivo das partidas da FURIA.

Licença
Este projeto está licenciado sob a licença MIT - consulte o arquivo LICENSE para mais detalhes.
