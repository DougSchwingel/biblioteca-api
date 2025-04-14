import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';

const router = Router();

//Criar novo usuário
router.post('/', UsuarioController.criarUsuario);

//Listar todos os usuários
router.get('/', UsuarioController.listarUsuario);

//Buscar usuário por Id
router.get('/:id', UsuarioController.buscarPorId);

//Atualizar usuário existente por Id
router.put('/:id', UsuarioController.atualizarPorId);

//Remover usuário existente por Id
router.delete('/:id', UsuarioController.removerPorId);

export default router;
