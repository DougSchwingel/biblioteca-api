import { Router } from 'express';
import LivroController from '../controllers/LivroController';

const router = Router();

//Criar novo livro
router.post('/', LivroController.criarLivro);

//Listar todos os livros
router.get('/', LivroController.listarLivro);

//Buscar livro por Id
router.get('/:id', LivroController.buscarLivroPorId);

//Atualizar livro existente por Id
router.put('/:id', LivroController.atualizarLivroPorId);

//Remover livro existente por Id
router.delete('/:id', LivroController.removerLivroPorId);

export default router;
