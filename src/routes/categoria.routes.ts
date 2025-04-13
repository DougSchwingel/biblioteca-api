import { Router } from 'express';
import CategoriaController from '../controllers/CategoriaController';

const router = Router();

// Criar nova categoria
router.post('/', CategoriaController.criar);

// Listar todas as categorias
router.get('/', CategoriaController.listar);

// Buscar categoria por ID
router.get('/:id', CategoriaController.buscarPorId);

// Atualizar categoria existente por ID
router.put('/:id', CategoriaController.atualizarPorId);

// Remover categoria existente por ID
router.delete('/:id', CategoriaController.removerPorId);

export default router;
