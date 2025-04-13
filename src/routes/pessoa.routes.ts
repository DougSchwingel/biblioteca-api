import { Router } from 'express';
import PessoaController from '../controllers/PessoaController';

const router = Router();

// Criar nova pessoa
router.post('/', PessoaController.criar);

// Listar todas as pessoas
router.get('/', PessoaController.listar);

// Buscar pessoa por ID
router.get('/:id', PessoaController.buscarPorId);

// Atualizar pessoa existente por ID
router.put('/:id', PessoaController.atualizarPorId);

// Remover pessoa existente por ID
router.delete('/:id', PessoaController.removerPorId);

export default router;
