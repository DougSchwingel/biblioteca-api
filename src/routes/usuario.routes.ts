import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';

const router = Router();

// Criar novo usuário
router.post('/', UsuarioController.criar);

// Listar todos os usuários
router.get('/', UsuarioController.listar);

// Buscar usuário por ID
router.get('/:id', UsuarioController.buscarPorId);

// Atualizar usuário existente por ID
router.put('/:id', UsuarioController.atualizarPorId);

// Remover usuário existente por ID
router.delete('/:id', UsuarioController.removerPorId);

export default router;
