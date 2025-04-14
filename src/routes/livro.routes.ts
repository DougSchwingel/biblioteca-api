import { Router } from 'express';
import LivroController from '../controllers/LivroController';

const router = Router();

//Criar novo livro
router.post('/', LivroController.criarLivro);

//Listar todos os livros
router.get('/', LivroController.listarLivro);

//Buscar livro por Id
router.get('/:id', LivroController.buscarPorId);

//Atualizar livro existente por Id
router.put('/:id', LivroController.atualizarPorId);

//Remover livro existente por Id
router.delete('/:id', LivroController.removerPorId);

export default router;
