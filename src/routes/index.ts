import { Router } from 'express';
const router = Router();

//Rotas Pessoas
import pessoaRoutes from './pessoa.routes';
router.use('/pessoas', pessoaRoutes);


//Rotas Categorias
import categoriaRoutes from './categoria.routes';
router.use('/categorias', categoriaRoutes);


//Rotas Livros
import livroRoutes from './livro.routes';
router.use('/livros', livroRoutes);


//Rotas Usuarios
import usuarioRoutes from './usuario.routes';
router.use('/usuarios', usuarioRoutes);


//Rotas Emprestimos
import emprestimoRoutes from './emprestimo.routes';
router.use('/emprestimos', emprestimoRoutes);


export default router;