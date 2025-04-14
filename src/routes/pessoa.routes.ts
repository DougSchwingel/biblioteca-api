import { Router } from 'express';
import PessoaController from '../controllers/PessoaController';

const router = Router();

//Criar nova pessoa
router.post('/', PessoaController.criarPessoa);

//Listar todas as pessoas
router.get('/', PessoaController.listarPessoa);

//Buscar pessoa por Id
router.get('/:id', PessoaController.buscarPorId);

//Atualizar pessoa existente por Id
router.put('/:id', PessoaController.atualizarPorId);

//Remover pessoa existente por Id
router.delete('/:id', PessoaController.removerPorId);

export default router;
