import { Router } from 'express';
import EmprestimoController from '../controllers/EmprestimoController';

const router = Router();


// Criar novo empréstimo
router.post('/', EmprestimoController.criar);

// Listar todos os empréstimos
router.get('/', EmprestimoController.listar);

// Buscar empréstimo por ID
router.get('/:id', EmprestimoController.buscarPorId);

// Buscar empréstimo por ID do usuário
router.get('/usuario/:usuarioId', EmprestimoController.buscarPorUsuario);

// Atualizar empréstimo existente por ID
router.put('/:id', EmprestimoController.atualizarPorId);

// Remover empréstimo existente por ID
router.delete('/:id', EmprestimoController.removerPorId);

export default router;
