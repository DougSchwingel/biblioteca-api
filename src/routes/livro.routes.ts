import { Router } from 'express';
import LivroController from '../controllers/LivroController';

const router = Router();

// Criar novo livro
router.post('/', LivroController.criar);

// Listar todos os livros
router.get('/', LivroController.listar);

// Buscar livro por ID
router.get('/:id', LivroController.buscarPorId);

// Atualizar livro existente por ID
router.put('/:id', LivroController.atualizarPorId);

// Remover livro existente por ID
router.delete('/:id', LivroController.removerPorId);

export default router;
