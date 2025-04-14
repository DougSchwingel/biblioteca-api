import { Router } from 'express';
import CategoriaController from '../controllers/CategoriaController';

const router = Router();

//Criar nova categoria
router.post('/', CategoriaController.criarCategoria);

//Listar todas as categorias
router.get('/', CategoriaController.listarCategoria);

//Buscar categoria por Id
router.get('/:id', CategoriaController.buscarPorId);

//Atualizar categoria existente por Id
router.put('/:id', CategoriaController.atualizarPorId);

//Remover categoria existente por Id
router.delete('/:id', CategoriaController.removerPorId);

export default router;
