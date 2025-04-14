import { Router } from 'express';
import PessoaController from '../controllers/PessoaController';

const router = Router();

//Criar nova pessoa
router.post('/', PessoaController.criarPessoa);

//Listar todas as pessoas
router.get('/', PessoaController.listarPessoa);

//Buscar pessoa por Id
router.get('/:id', PessoaController.buscarPessoaPorId);

//Atualizar pessoa existente por Id
router.put('/:id', PessoaController.atualizarPessoaPorId);

//Remover pessoa existente por Id
router.delete('/:id', PessoaController.removerPessoaPorId);

export default router;
