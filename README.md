# 📚 Desafio Agrobook
# 🎯
Deve ser desenvolvido um sistema para uma livraria, neste sistema o usuário deve
conseguir gerenciar livros e autores.
# 🖥️ Tecnologias utilizadas:
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NextJS](https://img.shields.io/badge/NextJS-000000.svg?&style=for-the-badge&logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748.svg?&style=for-the-badge&logo=prisma&logoColor=white)
![AntDesign](https://img.shields.io/badge/AntDesign-0170FE.svg?&style=for-the-badge&logo=antdesign&logoColor=white)
## 📋 Pré-requisitos:
- Node 18.16 ou Superior
- Prisma 4.14 ou Superior
# 🛠️ Como Utilizar:
1. Clone o repositório para sua máquina utilizando o comando:
	`git clone git@github.com:iamlucasgomes/qualifying-test-fullstack-developer-agrobook.git`
2. Após finalizar o download, crie um arquivo **.env** contendo as mesmas variáveis de ambiente presentes no arquivo **.env.example**, ou use os dados do exemplo abaixo:
<pre><code>
  POSTGRES_PRISMA_URL=postgres://root:12345@localhost:3306/bookstore?pgbouncer=true&connect_timeout=15
  POSTGRES_URL_NON_POOLING=postgres://root:12345@localhost:3306/bookstore
</code></pre>
3. Abra um terminal na **pasta raiz do repositório** e execute o comando <code>npm run build && npm start</code>;
4. Aguarde a inicialização ser concluída;
5. Após isso, você poderá acessar o frontend da aplicação localmente através do localhost na porta 3000. Por padrão, a página pode ser acessada nesse link: <link>http://localhost:3000</link>
6.A API pode ser acessada também utilizando o localhost na porta 3000, por padrão <link>http://localhost:3000/api/<link>.
## 📸 Preview:
#### Tela de início
![alt text](./preview/tela1.png)
#### Tela de inicio com menu fechado
![alt text](./preview/tela1-menu-oculto.png)
#### Tela que lista os Autores
![alt text](./preview/tela-autores.png)
#### Forms - Tela que cadastra os autores
![alt text](./preview/tela-autores-form.png)
#### Tela que lista os livros
![alt text](./preview/tela-livros.png)
#### Forms - Tela que cadastra os Livros
![alt text](./preview/tela-livros-form.png)

## 🖥️ Aplicação:
O objetivo desta aplicação é permitir que o usuário gerencie uma livraria.

Ao clicar no botão "Autores", o sistema lê todos os autores registrados no banco de dados e os exibe na tela.

Ao clicar no botão "Adicionar Autor", o sistema redireciona para a página do formulário, onde o usuário deve inserir o "nome", "Data de Nascimento" e "Biografia" do autor. Ao clicar em "Cadastrar", o sistema valida se todos os campos estão preenchidos. Em caso de sucesso, o sistema redireciona para a página de Autores.

Ao clicar no botão "Livros", o sistema lê todos os livros registrados no banco de dados e os exibe na tela.

Ao clicar no botão "Adicionar Livro", o sistema redireciona para a página do formulário, onde o usuário deve inserir o "nome", "Data de Lançamento", "Descrição", "Gênero" e "Autor" do livro. O autor deve ser escolhido em um menu suspenso. Ao clicar em "Cadastrar", o sistema valida se todos os campos estão preenchidos. Em caso de sucesso, o sistema redireciona para a página de Livros.

Em cada livro exibido na tela, são gerados dois botões: um para Atualizar (ícone de lápis) e outro para Remover (ícone de lixeira). Ao clicar no botão "Atualizar", o usuário é redirecionado para um formulário onde ele poderá atualizar os dados do livro. Ao clicar no botão "Remover", o livro é removido do sistema.

Na página de Livros, também é possível filtrar a lista por autores, digitando o nome do autor no campo de busca. Se o usuário não desejar mais filtrar, pode apagar o texto escrito no campo de busca ou clicar no botão "Limpar Filtro".