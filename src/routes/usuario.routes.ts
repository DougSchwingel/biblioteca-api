import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController';

const router = Router();

//Criar novo usuário
router.post('/', UsuarioController.criarUsuario);

//Listar todos os usuários
router.get('/', UsuarioController.listarUsuario);

//Buscar usuário por Id
router.get('/:id', UsuarioController.buscarUsuarioPorId);

//Atualizar usuário existente por Id
router.put('/:id', UsuarioController.atualizarUsuarioPorId);

//Remover usuário existente por Id
router.delete('/:id', UsuarioController.removerUsuarioPorId);

export default router;
