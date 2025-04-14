import { Router } from 'express';
import EmprestimoController from '../controllers/EmprestimoController';

const router = Router();


//Criar novo empréstimo
router.post('/', EmprestimoController.criarEmprestimo);

//Listar todos os empréstimos
router.get('/', EmprestimoController.listarEmprestimo);

//Buscar empréstimo por Id
router.get('/:id', EmprestimoController.buscarPorId);

//Buscar empréstimo por Id do usuário
router.get('/usuario/:usuarioId', EmprestimoController.buscarPorUsuario);

//Atualizar empréstimo existente por Id
router.put('/:id', EmprestimoController.atualizarPorId);

//Remover empréstimo existente por Id
router.delete('/:id', EmprestimoController.removerPorId);

export default router;
