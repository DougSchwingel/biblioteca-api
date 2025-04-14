import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs/swagger.json';

//Importando todas as rotas definidas nos arquivos de configuração
import pessoaRoutes from './routes/pessoa.routes';
import usuarioRoutes from './routes/usuario.routes';
import livroRoutes from './routes/livro.routes';
import categoriaRoutes from './routes/categoria.routes';
import emprestimoRoutes from './routes/emprestimo.routes';

const app = express();

//Permite o parsing de JSON no body das requisições
app.use(express.json());

//Endpoint do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Definido o prefixo /api para todas as rotas
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/livros', livroRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/emprestimos', emprestimoRoutes);

//Definido a porta de execução do servidor localhost
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
