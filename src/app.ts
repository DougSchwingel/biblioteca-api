import express from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

// Carrega o YAML
import path from 'path';
const swaggerDocument = YAML.load(path.resolve(__dirname, 'docs/swagger.yaml'));

// Importando rotas
import pessoaRoutes from './routes/pessoa.routes';
import usuarioRoutes from './routes/usuario.routes';
import livroRoutes from './routes/livro.routes';
import categoriaRoutes from './routes/categoria.routes';
import emprestimoRoutes from './routes/emprestimo.routes';

const app = express();

app.use(express.json());

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas
app.use('/api/pessoas', pessoaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/livros', livroRoutes);
app.use('/api/categorias', categoriaRoutes);
app.use('/api/emprestimos', emprestimoRoutes);

// Start do servidor
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
  console.log('Swagger disponível em http://localhost:3000/api-docs');
});
